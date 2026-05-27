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

	updateStyleVariables() {
		const s = this.settings;

		if (!s.stylesEnabled) {
			document.body.classList.remove('pt__body-initialtor');
			return;
		}

		if (s.stylesEnabled && !document.body.classList.contains('pt__body-initialtor')) {
			document.body.classList.add('pt__body-initialtor');
		}

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
