import { Plugin, TFile } from 'obsidian';
import {
	DEFAULT_SETTINGS,
	PreviewTypographySettings,
	PreviewTypographySettingTab,
} from './settings';
import { processElementTypography, createLivePreviewPlugin } from './typography';

export default class PreviewTypography extends Plugin {
	settings!: PreviewTypographySettings;

	async onload() {
		await this.loadSettings();

		// 1. Регистрируем расширение для Live Preview (режим редактирования)
		// Передаем фабрику плагина CodeMirror, которую мы импортировали из папки typography
		this.registerEditorExtension([createLivePreviewPlugin(this.app, this.settings)]);

		// 2. Регистрируем пост-процессор для Reading View (режим чтения)
		this.registerMarkdownPostProcessor((element, context) => {
			const file = this.app.vault.getAbstractFileByPath(context.sourcePath);

			if (file instanceof TFile) {
				processElementTypography(this.app, file, element, this.settings);
			}
		});

		this.addSettingTab(new PreviewTypographySettingTab(this.app, this));
	}

	onunload() {
		// Расширения редактора и пост-процессоры выгружаются Obsidian автоматически
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
