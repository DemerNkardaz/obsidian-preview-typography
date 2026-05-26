import { moment } from 'obsidian';

export type LocaleKey =
	| 'globalScriptTitle'
	| 'globalScriptDesc'
	| 'dynamicDetectionTitle'
	| 'dynamicDetectionDesc'
	| 'commandName'
	| 'placeholderScript';

const locales: Record<'ru' | 'en', Record<LocaleKey, string>> = {
	ru: {
		globalScriptTitle: 'Глобальное письмо',
		globalScriptDesc:
			'Выберите используемую письменность по умолчанию (latin, cyrillic или латиница, кириллица) или оставьте пустым для отключения правила.',
		dynamicDetectionTitle: 'Динамическое обнаружение',
		dynamicDetectionDesc:
			'Автоматически определяет письменность (кириллица/латиница) по тексту, если не заданы глобальные или локальные свойства заметки.',
		commandName: 'Применить типографику к текущей заметке',
		placeholderScript: 'По умолчанию (выключено)',
	},
	en: {
		globalScriptTitle: 'Global Script',
		globalScriptDesc:
			'Select the default writing system (latin, cyrillic) or leave empty to disable the rule.',
		dynamicDetectionTitle: 'Dynamic Detection',
		dynamicDetectionDesc:
			'Automatically detects script (Cyrillic/Latin) from text if neither global nor local note properties are set.',
		commandName: 'Apply typography to current note',
		placeholderScript: 'Default (disabled)',
	},
};

export function t(key: LocaleKey): string {
	const lang = moment.locale() === 'ru' ? 'ru' : 'en';
	return locales[lang][key];
}
