import { App, PluginSettingTab, Setting } from 'obsidian';
import PreviewTypography from './main';
import { t } from './i18n';

export interface PreviewTypographySettings {
	globalScript: string;
	dynamicDetection: boolean;
}

export const DEFAULT_SETTINGS: PreviewTypographySettings = {
	globalScript: '',
	dynamicDetection: false,
};

export class PreviewTypographySettingTab extends PluginSettingTab {
	plugin: PreviewTypography;

	constructor(app: App, plugin: PreviewTypography) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		// Настройка №1: Глобальное письмо
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
					})
			);

		new Setting(containerEl)
			.setName(t('dynamicDetectionTitle'))
			.setDesc(t('dynamicDetectionDesc'))
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.dynamicDetection).onChange(async (value) => {
					this.plugin.settings.dynamicDetection = value;
					await this.plugin.saveSettings();
				})
			);
	}
}
