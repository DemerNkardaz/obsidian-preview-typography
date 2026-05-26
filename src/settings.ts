import { App, PluginSettingTab, Setting, MarkdownView } from 'obsidian';
import PreviewTypography from './main';
import { t } from './i18n';

export interface PreviewTypographySettings {
	globalScript: string;
	dynamicDetection: boolean;
	customRulesRu: string;
	customRulesEn: string;
	textAlignment: 'left' | 'right' | 'justify' | 'center';
	letterSpacing: string;
}

export const DEFAULT_SETTINGS: PreviewTypographySettings = {
	globalScript: '',
	dynamicDetection: true,
	customRulesRu: '',
	customRulesEn: '',
	textAlignment: 'left',
	letterSpacing: '-0.007em',
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

		containerEl.createEl('p', { text: t('settingsNote') });

		containerEl.createEl('hr');

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
					const defaultValue = DEFAULT_SETTINGS.letterSpacing;

					this.plugin.settings.letterSpacing = defaultValue;
					await this.plugin.saveSettings();

					this.display();
					this.plugin.updateStyleVariables();
				})
			);
	}
}
