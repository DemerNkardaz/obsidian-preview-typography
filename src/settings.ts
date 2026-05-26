import { App, PluginSettingTab, Setting, MarkdownView } from 'obsidian';
import PreviewTypography from './main';
import { t } from './i18n';

export interface PreviewTypographySettings {
	globalScript: string;
	dynamicDetection: boolean;
	customRulesRu: string;
	customRulesEn: string;
}

export const DEFAULT_SETTINGS: PreviewTypographySettings = {
	globalScript: '',
	dynamicDetection: true,
	customRulesRu: '',
	customRulesEn: '',
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

		containerEl.createEl('p', {
			text: t('settingsNote'),
		});

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
	}
}
