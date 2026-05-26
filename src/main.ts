import { Plugin, TFile } from 'obsidian';

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

		this.registerMarkdownPostProcessor((element, context) => {
			const file = this.app.vault.getAbstractFileByPath(context.sourcePath);

			if (file instanceof TFile) {
				processElementTypography(this.app, file, element, this.settings);
			}
		});

		this.addSettingTab(new PreviewTypographySettingTab(this.app, this));
	}

	onunload() {}

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
