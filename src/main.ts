import { App, Plugin, TFile } from 'obsidian';

import {
	DEFAULT_SETTINGS,
	PreviewTypographySettings,
	PreviewTypographySettingTab,
} from './settings';

import { processElementTypography } from './typography';

export default class PreviewTypography extends Plugin {
	settings!: PreviewTypographySettings;

	async onload() {
		await this.loadSettings();
		this.updateStyleVariables();

		this.registerMarkdownPostProcessor((element, context) => {
			const file = this.app.vault.getAbstractFileByPath(context.sourcePath);

			if (file instanceof TFile) {
				processElementTypography(this.app, file, element, this.settings);
				this.updateNoteProperties(this.app, file, element);
			}
		});

		this.addSettingTab(new PreviewTypographySettingTab(this.app, this));
	}

	onunload() {}

	updateNoteProperties(app: App, file: TFile, element: HTMLElement) {
		const cache = app.metadataCache.getFileCache(file);

		if (cache && cache.frontmatter) {
			const frontmatter = cache.frontmatter as Record<string, unknown>;
			let detectedLang: string | null = null;

			const langVal = frontmatter['lang'] !== undefined ? frontmatter['lang'] : frontmatter['язык'];
			if (typeof langVal === 'string') {
				detectedLang = langVal;
			}

			if (detectedLang) {
				element.setAttribute('lang', detectedLang);
			} else if (!detectedLang && element.hasAttribute('lang')) {
				element.removeAttribute('lang');
			}
		}
	}

	updateStyleVariables(remove?: boolean) {
		if (remove) {
			this.removeStyleVariables();
			return;
		}
		const s = this.settings;
		const root = document.documentElement.style;

		const set = (prop: string, val: string) => root.setProperty(prop, val);

		set('--pt-text-alignment', s.textAlignment);
		set('--pt-text-letter-spacing', s.letterSpacing);
		set('--pt-text-word-spacing', s.wordSpacing);
		set('--pt-word-break', s.wordBreak);
		set('--pt-overflow-wrap', s.overflowWrap);
		set('--pt-text-wrap', s.textWrap);
		set('--pt-text-justify', s.textJustify);
		set('--pt-text-indent', s.textIndent);
		set('--pt-hyphens', s.hyphens);
		set('--pt-hyphenate-limit-chars', s.hyphenateLimitChars);
		set('--pt-hanging-punctuation', s.hangingPunctuation);
		set('--pt-widows', s.widows);
		set('--pt-orphans', s.orphans);
		set('--pt-line-height', s.lineHeight);
		set('--pt-list-item-text-indent', s.textIndentListItem);
		set('--pt-list-item-padding-left', s.textPaddingLeftListItem);
	}

	removeStyleVariables() {
		const root = document.documentElement.style;
		root.removeProperty('--pt-text-alignment');
		root.removeProperty('--pt-text-letter-spacing');
		root.removeProperty('--pt-text-word-spacing');
		root.removeProperty('--pt-word-break');
		root.removeProperty('--pt-overflow-wrap');
		root.removeProperty('--pt-text-wrap');
		root.removeProperty('--pt-text-justify');
		root.removeProperty('--pt-text-indent');
		root.removeProperty('--pt-hyphens');
		root.removeProperty('--pt-hyphenate-limit-chars');
		root.removeProperty('--pt-hanging-punctuation');
		root.removeProperty('--pt-widows');
		root.removeProperty('--pt-orphans');
		root.removeProperty('--pt-line-height');
		root.removeProperty('--pt-list-item-text-indent');
		root.removeProperty('--pt-list-item-padding-left');
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<PreviewTypographySettings>
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
