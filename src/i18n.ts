import { moment } from 'obsidian';

export type LocaleKey =
	| 'baseSettingsTitle'
	| 'styleSettingsTitle'
	| 'restoreDefault'
	| 'globalScriptTitle'
	| 'globalScriptDesc'
	| 'dynamicDetectionTitle'
	| 'dynamicDetectionDesc'
	| 'commandName'
	| 'placeholderScript'
	| 'settingsNote'
	| 'customRulesCyrillicTitle'
	| 'customRulesLatinTitle'
	| 'customRulesDesc'
	| 'styleTextAlignmentTitle'
	| 'styleTextAlignmentDesc'
	| 'styleTextAlignmentLeft'
	| 'styleTextAlignmentRight'
	| 'styleTextAlignmentJustify'
	| 'styleTextAlignmentCenter'
	| 'styleLetterSpacingTitle'
	| 'styleLetterSpacingDesc';

const locales: Record<'ru' | 'en', Record<LocaleKey, string>> = {
	ru: {
		baseSettingsTitle: 'Основные настройки',
		styleSettingsTitle: 'Настройки стилей',
		restoreDefault: 'По умолчанию',
		globalScriptTitle: 'Глобальное письмо',
		globalScriptDesc:
			'Выберите используемую письменность по умолчанию (латиница, кириллица) или оставьте пустым для отключения правила.',
		dynamicDetectionTitle: 'Динамическое обнаружение',
		dynamicDetectionDesc:
			'Автоматически определяет письменность (кириллица/латиница) по тексту, если не заданы глобальные или локальные свойства заметки.',
		commandName: 'Применить типографику к текущей заметке',
		placeholderScript: 'По умолчанию (выключено)',
		settingsNote: 'Примечание: данный момент пресет правил для латиницы не был создан.',
		customRulesCyrillicTitle: 'Пользовательские правила для кириллицы',
		customRulesLatinTitle: 'Пользовательские правила для латиницы',
		customRulesDesc: 'Формат: «регулярное выражение|замена», с новой строки.',
		styleTextAlignmentTitle: 'Выравнивание текста',
		styleTextAlignmentDesc:
			'Выберите выравнивание текста: выключка влево, вправо, по ширине, по центру.',
		styleTextAlignmentLeft: 'Выключка влево',
		styleTextAlignmentRight: 'Выключка вправо',
		styleTextAlignmentJustify: 'Выключка по ширине',
		styleTextAlignmentCenter: 'Выключка по центру',
		styleLetterSpacingTitle: 'Расстояние между буквами',
		styleLetterSpacingDesc:
			'Выберите расстояние между буквами (normal или пользовательское значение в em, rem, px, pt).',
	},
	en: {
		baseSettingsTitle: 'Base Settings',
		styleSettingsTitle: 'Style Settings',
		restoreDefault: 'Default Value',
		globalScriptTitle: 'Global Script',
		globalScriptDesc:
			'Select the default writing system (latin, cyrillic) or leave empty to disable the rule.',
		dynamicDetectionTitle: 'Dynamic Detection',
		dynamicDetectionDesc:
			'Automatically detects script (Cyrillic/Latin) from text if neither global nor local note properties are set.',
		commandName: 'Apply typography to current note',
		placeholderScript: 'Default (disabled)',
		settingsNote: 'Note: this preset for Latin script has not been created yet.',
		customRulesCyrillicTitle: 'Custom rules for Cyrillic',
		customRulesLatinTitle: 'Custom rules for Latin',
		customRulesDesc: 'Format: “regular expression|replacement”, one per line.',
		styleTextAlignmentTitle: 'Text Alignment',
		styleTextAlignmentDesc: 'Select text alignment: left, right, width, center.',
		styleTextAlignmentLeft: 'Left',
		styleTextAlignmentRight: 'Right',
		styleTextAlignmentJustify: 'Width',
		styleTextAlignmentCenter: 'Center',
		styleLetterSpacingTitle: 'Letter Spacing',
		styleLetterSpacingDesc: 'Select letter spacing (normal or custom value in em, rem, px, pt).',
	},
};

export function t(key: LocaleKey): string {
	const lang = moment.locale() === 'ru' ? 'ru' : 'en';
	return locales[lang][key];
}
