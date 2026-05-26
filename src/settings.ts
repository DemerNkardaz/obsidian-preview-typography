import { App, PluginSettingTab, Setting, MarkdownView } from 'obsidian';
import PreviewTypography from './main';
import { t } from './i18n';

export interface PreviewTypographySettings {
	globalScript: string;
	dynamicDetection: boolean;
	customRulesRu: string;
	customRulesEn: string;
	srylesEnabled: boolean;
	textAlignment: 'left' | 'right' | 'justify' | 'center';
	letterSpacing: string;
	wordSpacing: string;
	wordBreak: 'normal' | 'break-all' | 'keep-all';
	overflowWrap: 'normal' | 'break-word' | 'anywhere';
	textWrap: 'wrap' | 'nowrap' | 'balance' | 'pretty';
	textJustify: 'auto' | 'none' | 'inter-word' | 'inter-character';
	textIndent: string;
	hyphens: 'none' | 'manual' | 'auto';
	hyphenateLimitChars: string;
	hangingPunctuation: 'none' | 'first' | 'last' | 'first last' | 'allow-end' | 'force-end';
	widows: string;
	orphans: string;
	lineHeight: string;
}

export const DEFAULT_SETTINGS: PreviewTypographySettings = {
	globalScript: '',
	dynamicDetection: true,
	customRulesRu: '',
	customRulesEn: '',
	srylesEnabled: true,
	textAlignment: 'justify',
	letterSpacing: '-0.007em',
	wordSpacing: '0.05em',
	wordBreak: 'normal',
	overflowWrap: 'break-word',
	textWrap: 'pretty',
	textJustify: 'inter-word',
	textIndent: '5mm',
	hyphens: 'auto',
	hyphenateLimitChars: '5 5 3',
	hangingPunctuation: 'first last',
	widows: '3',
	orphans: '3',
	lineHeight: '1.45',
};

export class PreviewTypographySettingTab extends PluginSettingTab {
	plugin: PreviewTypography;

	constructor(app: App, plugin: PreviewTypography) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private refreshActiveView(): void {
		this.app.workspace.updateOptions();

		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (activeView && activeView.previewMode) {
			activeView.previewMode.rerender(true);
		}
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl).setName(t('baseSettingsTitle')).setHeading();

		new Setting(containerEl)
			.setName(t('globalScriptTitle'))
			.setDesc(t('globalScriptDesc'))
			.addDropdown((dropdown) =>
				dropdown
					.addOption('', t('placeholderScript'))
					.addOption('cyrillic', 'Cyrillic / Кириллица')
					.addOption('latin', 'Latin / Латиница')
					.setValue(this.plugin.settings.globalScript)
					.onChange(async (value) => {
						this.plugin.settings.globalScript = value;
						await this.plugin.saveSettings();
						this.refreshActiveView();
					})
			);

		new Setting(containerEl)
			.setName(t('dynamicDetectionTitle'))
			.setDesc(t('dynamicDetectionDesc'))
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.dynamicDetection).onChange(async (value) => {
					this.plugin.settings.dynamicDetection = value;
					await this.plugin.saveSettings();
					this.refreshActiveView();
				})
			);

		new Setting(containerEl)
			.setName(t('customRulesCyrillicTitle'))
			.setDesc(t('customRulesDesc'))
			.addTextArea((text) =>
				text.setValue(this.plugin.settings.customRulesRu).onChange(async (val) => {
					this.plugin.settings.customRulesRu = val;
					await this.plugin.saveSettings();
					this.refreshActiveView();
				})
			);

		new Setting(containerEl)
			.setName(t('customRulesLatinTitle'))
			.setDesc(t('customRulesDesc'))
			.addTextArea((text) =>
				text.setValue(this.plugin.settings.customRulesEn).onChange(async (val) => {
					this.plugin.settings.customRulesEn = val;
					await this.plugin.saveSettings();
					this.refreshActiveView();
				})
			);

		new Setting(containerEl).setName(t('styleSettingsTitle')).setHeading();

		new Setting(containerEl)
			.setName(t('styleEnabledTitle'))
			.setDesc(t('styleEnabledDesc'))
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.srylesEnabled).onChange(async (value) => {
					this.plugin.settings.srylesEnabled = value;
					await this.plugin.saveSettings();
					this.plugin.updateStyleVariables(!value);
				})
			);

		new Setting(containerEl)
			.setName(t('styleTextAlignmentTitle'))
			.setDesc(t('styleTextAlignmentDesc'))
			.addDropdown((dropdown) =>
				dropdown
					.addOption('left', t('styleTextAlignmentLeft'))
					.addOption('right', t('styleTextAlignmentRight'))
					.addOption('justify', t('styleTextAlignmentJustify'))
					.addOption('center', t('styleTextAlignmentCenter'))
					.setValue(this.plugin.settings.textAlignment)
					.onChange(async (value: string) => {
						this.plugin.settings.textAlignment =
							value as PreviewTypographySettings['textAlignment'];
						await this.plugin.saveSettings();
						this.plugin.updateStyleVariables();
					})
			);

		new Setting(containerEl)
			.setName(t('styleLineHeightTitle'))
			.setDesc(t('styleLineHeightDesc'))
			.addText((text) =>
				text.setValue(this.plugin.settings.lineHeight).onChange(async (val) => {
					this.plugin.settings.lineHeight = val;
					await this.plugin.saveSettings();
					this.plugin.updateStyleVariables();
				})
			)
			.addButton((btn) =>
				btn.setButtonText(t('restoreDefault')).onClick(async () => {
					this.plugin.settings.lineHeight = DEFAULT_SETTINGS.lineHeight;
					await this.plugin.saveSettings();
					this.display();
					this.plugin.updateStyleVariables();
				})
			);

		new Setting(containerEl)
			.setName(t('styleLetterSpacingTitle'))
			.setDesc(t('styleLetterSpacingDesc'))
			.addText((text) =>
				text.setValue(this.plugin.settings.letterSpacing).onChange(async (val) => {
					this.plugin.settings.letterSpacing = val;
					await this.plugin.saveSettings();
					this.plugin.updateStyleVariables();
				})
			)
			.addButton((button) =>
				button.setButtonText(t('restoreDefault')).onClick(async () => {
					this.plugin.settings.letterSpacing = DEFAULT_SETTINGS.letterSpacing;
					await this.plugin.saveSettings();
					this.display();
					this.plugin.updateStyleVariables();
				})
			);

		new Setting(containerEl)
			.setName(t('styleWordSpacingTitle'))
			.setDesc(t('styleWordSpacingDesc'))
			.addText((text) =>
				text.setValue(this.plugin.settings.wordSpacing).onChange(async (val) => {
					this.plugin.settings.wordSpacing = val;
					await this.plugin.saveSettings();
					this.plugin.updateStyleVariables();
				})
			)
			.addButton((button) =>
				button.setButtonText(t('restoreDefault')).onClick(async () => {
					this.plugin.settings.wordSpacing = DEFAULT_SETTINGS.wordSpacing;
					await this.plugin.saveSettings();
					this.display();
					this.plugin.updateStyleVariables();
				})
			);

		new Setting(containerEl)
			.setName(t('styleWordBreakTitle'))
			.setDesc(t('styleWordBreakDesc'))
			.addDropdown((d) =>
				d
					.addOption('normal', t('wordBreakNormal'))
					.addOption('break-all', t('wordBreakAll'))
					.addOption('keep-all', t('wordBreakKeep'))
					.setValue(this.plugin.settings.wordBreak)
					.onChange(async (val: string) => {
						this.plugin.settings.wordBreak = val as PreviewTypographySettings['wordBreak'];
						await this.plugin.saveSettings();
						this.plugin.updateStyleVariables();
					})
			);

		new Setting(containerEl)
			.setName(t('styleOverflowWrapTitle'))
			.setDesc(t('styleOverflowWrapDesc'))
			.addDropdown((d) =>
				d
					.addOption('normal', t('overflowWrapNormal'))
					.addOption('break-word', t('overflowWrapBreakWord'))
					.addOption('anywhere', t('overflowWrapAnywhere'))
					.setValue(this.plugin.settings.overflowWrap)
					.onChange(async (val: string) => {
						this.plugin.settings.overflowWrap = val as PreviewTypographySettings['overflowWrap'];
						await this.plugin.saveSettings();
						this.plugin.updateStyleVariables();
					})
			);

		new Setting(containerEl)
			.setName(t('styleTextWrapTitle'))
			.setDesc(t('styleTextWrapDesc'))
			.addDropdown((d) =>
				d
					.addOption('wrap', t('textWrapWrap'))
					.addOption('nowrap', t('textWrapNowrap'))
					.addOption('balance', t('textWrapBalance'))
					.addOption('pretty', t('textWrapPretty'))
					.setValue(this.plugin.settings.textWrap)
					.onChange(async (val: string) => {
						this.plugin.settings.textWrap = val as PreviewTypographySettings['textWrap'];
						await this.plugin.saveSettings();
						this.plugin.updateStyleVariables();
					})
			);

		new Setting(containerEl)
			.setName(t('styleTextJustifyTitle'))
			.setDesc(t('styleTextJustifyDesc'))
			.addDropdown((d) =>
				d
					.addOption('auto', t('textJustifyAuto'))
					.addOption('none', t('textJustifyNone'))
					.addOption('inter-word', t('textJustifyInterWord'))
					.addOption('inter-character', t('textJustifyInterChar'))
					.setValue(this.plugin.settings.textJustify)
					.onChange(async (val: string) => {
						this.plugin.settings.textJustify = val as PreviewTypographySettings['textJustify'];
						await this.plugin.saveSettings();
						this.plugin.updateStyleVariables();
					})
			);

		new Setting(containerEl)
			.setName(t('styleTextIndentTitle'))
			.setDesc(t('styleTextIndentDesc'))
			.addText((text) =>
				text.setValue(this.plugin.settings.textIndent).onChange(async (val) => {
					this.plugin.settings.textIndent = val;
					await this.plugin.saveSettings();
					this.plugin.updateStyleVariables();
				})
			)
			.addButton((btn) =>
				btn.setButtonText(t('restoreDefault')).onClick(async () => {
					this.plugin.settings.textIndent = DEFAULT_SETTINGS.textIndent;
					await this.plugin.saveSettings();
					this.display();
					this.plugin.updateStyleVariables();
				})
			);

		new Setting(containerEl)
			.setName(t('styleHyphensTitle'))
			.setDesc(t('styleHyphensDesc'))
			.addDropdown((d) =>
				d
					.addOption('none', t('hyphensNone'))
					.addOption('manual', t('hyphensManual'))
					.addOption('auto', t('hyphensAuto'))
					.setValue(this.plugin.settings.hyphens)
					.onChange(async (val: string) => {
						this.plugin.settings.hyphens = val as PreviewTypographySettings['hyphens'];
						await this.plugin.saveSettings();
						this.plugin.updateStyleVariables();
					})
			);

		new Setting(containerEl)
			.setName(t('styleHyphenateLimitCharsTitle'))
			.setDesc(t('styleHyphenateLimitCharsDesc'))
			.addText((text) =>
				text.setValue(this.plugin.settings.hyphenateLimitChars).onChange(async (val) => {
					this.plugin.settings.hyphenateLimitChars = val;
					await this.plugin.saveSettings();
					this.plugin.updateStyleVariables();
				})
			)
			.addButton((btn) =>
				btn.setButtonText(t('restoreDefault')).onClick(async () => {
					this.plugin.settings.hyphenateLimitChars = DEFAULT_SETTINGS.hyphenateLimitChars;
					await this.plugin.saveSettings();
					this.display();
					this.plugin.updateStyleVariables();
				})
			);

		new Setting(containerEl)
			.setName(t('styleHangingPunctuationTitle'))
			.setDesc(t('styleHangingPunctuationDesc'))
			.addDropdown((d) =>
				d
					.addOption('none', t('hangingNone'))
					.addOption('first', t('hangingFirst'))
					.addOption('last', t('hangingLast'))
					.addOption('first last', t('hangingFirstLast'))
					.addOption('allow-end', t('hangingAllowEnd'))
					.addOption('force-end', t('hangingForceEnd'))
					.setValue(this.plugin.settings.hangingPunctuation)
					.onChange(async (val: string) => {
						this.plugin.settings.hangingPunctuation =
							val as PreviewTypographySettings['hangingPunctuation'];
						await this.plugin.saveSettings();
						this.plugin.updateStyleVariables();
					})
			);

		new Setting(containerEl)
			.setName(t('styleWidowsTitle'))
			.setDesc(t('styleWidowsDesc'))
			.addText((text) =>
				text.setValue(this.plugin.settings.widows).onChange(async (val) => {
					this.plugin.settings.widows = val;
					await this.plugin.saveSettings();
					this.plugin.updateStyleVariables();
				})
			)
			.addButton((btn) =>
				btn.setButtonText(t('restoreDefault')).onClick(async () => {
					this.plugin.settings.widows = DEFAULT_SETTINGS.widows;
					await this.plugin.saveSettings();
					this.display();
					this.plugin.updateStyleVariables();
				})
			);

		new Setting(containerEl)
			.setName(t('styleOrphansTitle'))
			.setDesc(t('styleOrphansDesc'))
			.addText((text) =>
				text.setValue(this.plugin.settings.orphans).onChange(async (val) => {
					this.plugin.settings.orphans = val;
					await this.plugin.saveSettings();
					this.plugin.updateStyleVariables();
				})
			)
			.addButton((btn) =>
				btn.setButtonText(t('restoreDefault')).onClick(async () => {
					this.plugin.settings.orphans = DEFAULT_SETTINGS.orphans;
					await this.plugin.saveSettings();
					this.display();
					this.plugin.updateStyleVariables();
				})
			);
	}
}
