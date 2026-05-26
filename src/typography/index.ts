import { App, TFile } from 'obsidian';
import { PreviewTypographySettings } from '../settings';
import { typographyRules } from './typographyRules';

export type ScriptType = 'ru' | 'en' | null;

export function normalizeScript(value: unknown): ScriptType {
	if (!value) return null;

	if (typeof value !== 'string' && typeof value !== 'number') {
		return null;
	}

	const str = String(value).trim().toLowerCase();
	if (str === 'cyrillic' || str === 'кириллица' || str === 'ru') return 'ru';
	if (str === 'latin' || str === 'латиница' || str === 'en') return 'en';
	return null;
}

export function detectScriptDynamic(text: string): ScriptType {
	const cyrillicRegex = /[\u0400-\u04FF]/;
	const latinRegex = /[a-zA-Z]/;

	for (let i = 0; i < text.length; i++) {
		const char = text.charAt(i);
		if (!char) continue;

		if (cyrillicRegex.test(char)) return 'ru';
		if (latinRegex.test(char)) return 'en';
	}
	return null;
}

export function applyTypographyToString(text: string, strategy: ScriptType | 'dynamic'): string {
	if (!strategy || !text) return text;

	if (strategy === 'ru' || strategy === 'en') {
		const rules = typographyRules[strategy];
		if (!rules) return text;
		let result = text;
		for (const [regex, replaceValue] of rules) {
			if (typeof replaceValue === 'string') {
				result = result.replace(regex, replaceValue);
			} else {
				result = result.replace(regex, replaceValue);
			}
		}
		return result;
	}

	if (strategy === 'dynamic') {
		const detected = detectScriptDynamic(text);
		if (detected && typographyRules[detected]) {
			let result = text;
			for (const [regex, replaceValue] of typographyRules[detected]) {
				if (typeof replaceValue === 'string') {
					result = result.replace(regex, replaceValue);
				} else {
					result = result.replace(regex, replaceValue);
				}
			}
			return result;
		}
	}

	return text;
}

function processElementWithSmartContext(element: HTMLElement, strategy: ScriptType | 'dynamic') {
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

	if (nodes.length === 1) {
		const node = nodes[0];
		if (node) {
			const original = node.nodeValue;
			if (original) {
				const transformed = applyTypographyToString(original, strategy);
				if (original !== transformed) {
					node.nodeValue = transformed;
				}
			}
		}
		return;
	}

	const NODE_MARKER = '\uE000';

	const combinedText = nodes.map((n) => (n ? n.nodeValue || '' : '')).join(NODE_MARKER);

	const transformedCombinedText = applyTypographyToString(combinedText, strategy);

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
		processElementWithSmartContext(element, strategy);
	}
}
