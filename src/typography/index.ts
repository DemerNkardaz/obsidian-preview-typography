import { App, TFile } from 'obsidian';
import { PreviewTypographySettings } from '../settings';
import { typographyRules } from './typographyRules';

export type ScriptType = 'ru' | 'en' | null;

export function parseCustomRules(raw: string): [RegExp, string][] {
	if (!raw) return [];
	return raw
		.split('\n')
		.filter((line) => line.includes('|'))
		.map((line) => {
			const parts = line.split('|');
			const regexStr = parts[0];
			const replacement = parts[1];

			if (typeof regexStr !== 'string' || replacement === undefined) {
				return null;
			}

			try {
				return [new RegExp(regexStr, 'gu'), replacement];
			} catch {
				console.error('Invalid regex in custom rules:', regexStr);
				return null;
			}
		})
		.filter((r): r is [RegExp, string] => r !== null);
}

export function normalizeScript(value: unknown): ScriptType {
	if (!value) return null;
	if (typeof value !== 'string' && typeof value !== 'number') return null;

	const str = String(value).trim().toLowerCase();
	if (str === 'cyrillic' || str === 'кириллица' || str === 'ru') return 'ru';
	if (str === 'latin' || str === 'латиница' || str === 'en') return 'en';
	return null;
}

export function detectScriptDynamic(text: string): ScriptType {
	const cyrillicRegex = /\p{Script=Cyrillic}/u;
	const latinRegex = /\p{Script=Latin}/u;

	for (let i = 0; i < text.length; i++) {
		const char = text.charAt(i);
		if (!char) continue;

		if (cyrillicRegex.test(char)) return 'ru';
		if (latinRegex.test(char)) return 'en';
	}
	return null;
}

export function applyTypographyToString(
	text: string,
	strategy: ScriptType | 'dynamic',
	settings: PreviewTypographySettings
): string {
	if (!strategy || !text) return text;

	const activeScript = strategy === 'dynamic' ? detectScriptDynamic(text) : strategy;
	if (!activeScript || (activeScript !== 'ru' && activeScript !== 'en')) return text;

	const scriptCustomRaw = activeScript === 'ru' ? settings.customRulesRu : settings.customRulesEn;
	const scriptCustomRules = parseCustomRules(scriptCustomRaw);
	const scriptBuiltinRules = typographyRules[activeScript] || [];
	const commonCustomRules = parseCustomRules(settings.customRulesCommon);
	const commonBuiltinRules = typographyRules['common'] || [];

	const allRules = [
		...scriptCustomRules,
		...commonCustomRules,
		...scriptBuiltinRules,
		...commonBuiltinRules,
	];

	let result = text;
	for (const rule of allRules) {
		const [first, second] = rule;

		if (typeof first === 'function') {
			result = first(result);
		} else {
			result = result.replace(first, second);
		}
	}
	return result;
}

function processElementWithSmartContext(
	element: HTMLElement,
	strategy: ScriptType | 'dynamic',
	settings: PreviewTypographySettings
) {
	const nodes: Node[] = [];
	const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
		acceptNode: (node) => {
			const parent = node.parentElement;
			if (parent) {
				const tagName = parent.tagName.toLowerCase();
				if (
					tagName === 'code' ||
					tagName === 'pre' ||
					parent.closest('.math') ||
					parent.closest('.cm-embed-block')
				) {
					return NodeFilter.FILTER_REJECT;
				}
			}
			return NodeFilter.FILTER_ACCEPT;
		},
	});

	let currentNode = walker.nextNode();
	while (currentNode) {
		nodes.push(currentNode);
		currentNode = walker.nextNode();
	}

	if (nodes.length === 0) return;

	const NODE_MARKER = '\uE000';
	const combinedText = nodes.map((n) => (n ? n.nodeValue || '' : '')).join(NODE_MARKER);

	const transformedCombinedText = applyTypographyToString(combinedText, strategy, settings);

	const segments = transformedCombinedText.split(NODE_MARKER);

	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		const segment = segments[i];

		if (node && segment !== undefined && node.nodeValue !== segment) {
			node.nodeValue = segment;
		}
	}
}

export function processElementTypography(
	app: App,
	file: TFile,
	element: HTMLElement,
	settings: PreviewTypographySettings
): void {
	const cache = app.metadataCache.getFileCache(file);
	let localScript: ScriptType = null;

	if (cache && cache.frontmatter) {
		const frontmatter = cache.frontmatter as Record<string, unknown>;
		const scriptVal =
			frontmatter['script'] !== undefined ? frontmatter['script'] : frontmatter['письмо'];
		localScript = normalizeScript(scriptVal);
	}

	let strategy: ScriptType | 'dynamic' = null;

	if (localScript !== null) {
		strategy = localScript;
	} else if (normalizeScript(settings.globalScript) !== null) {
		strategy = normalizeScript(settings.globalScript);
	} else if (settings.dynamicDetection) {
		strategy = 'dynamic';
	}

	if (strategy) {
		processElementWithSmartContext(element, strategy, settings);
	}
}
