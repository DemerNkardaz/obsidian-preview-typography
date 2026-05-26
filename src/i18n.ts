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
	| 'customRulesCommonTitle'
	| 'customRulesCyrillicTitle'
	| 'customRulesLatinTitle'
	| 'customRulesDesc'
	| 'styleEnabledTitle'
	| 'styleEnabledDesc'
	| 'styleTextAlignmentTitle'
	| 'styleTextAlignmentDesc'
	| 'styleTextAlignmentLeft'
	| 'styleTextAlignmentRight'
	| 'styleTextAlignmentJustify'
	| 'styleTextAlignmentCenter'
	| 'styleLetterSpacingTitle'
	| 'styleLetterSpacingDesc'
	| 'styleWordSpacingTitle'
	| 'styleWordSpacingDesc'
	| 'styleWordBreakTitle'
	| 'styleWordBreakDesc'
	| 'wordBreakNormal'
	| 'wordBreakAll'
	| 'wordBreakKeep'
	| 'styleOverflowWrapTitle'
	| 'styleOverflowWrapDesc'
	| 'overflowWrapNormal'
	| 'overflowWrapBreakWord'
	| 'overflowWrapAnywhere'
	| 'styleTextWrapTitle'
	| 'styleTextWrapDesc'
	| 'textWrapWrap'
	| 'textWrapNowrap'
	| 'textWrapBalance'
	| 'textWrapPretty'
	| 'styleTextJustifyTitle'
	| 'styleTextJustifyDesc'
	| 'textJustifyAuto'
	| 'textJustifyNone'
	| 'textJustifyInterWord'
	| 'textJustifyInterChar'
	| 'styleTextIndentTitle'
	| 'styleTextIndentDesc'
	| 'styleTextIndentListItemTitle'
	| 'styleTextIndentListItemDesc'
	| 'styleTextPaddingLeftListItemTitle'
	| 'styleTextPaddingLeftListItemDesc'
	| 'styleHyphensTitle'
	| 'styleHyphensDesc'
	| 'hyphensNone'
	| 'hyphensManual'
	| 'hyphensAuto'
	| 'styleHyphenateLimitCharsTitle'
	| 'styleHyphenateLimitCharsDesc'
	| 'styleHangingPunctuationTitle'
	| 'styleHangingPunctuationDesc'
	| 'hangingNone'
	| 'hangingFirst'
	| 'hangingLast'
	| 'hangingFirstLast'
	| 'hangingAllowEnd'
	| 'hangingForceEnd'
	| 'styleWidowsTitle'
	| 'styleWidowsDesc'
	| 'styleOrphansTitle'
	| 'styleOrphansDesc'
	| 'styleLineHeightTitle'
	| 'styleLineHeightDesc';

const locales: Record<'ru' | 'en', Record<LocaleKey, string>> = {
	ru: {
		baseSettingsTitle: 'Основные настройки',
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
		customRulesCommonTitle: 'Пользовательские общие правила',
		customRulesCyrillicTitle: 'Пользовательские правила для кириллицы',
		customRulesLatinTitle: 'Пользовательские правила для латиницы',
		customRulesDesc: 'Формат: «регулярное выражение|замена», с новой строки.',
		styleEnabledTitle: 'Включить стили',
		styleEnabledDesc:
			'Влияет на отображение контента заметки. Некоторые свойства могут не работать на старших версиях Chromium.',
		styleTextAlignmentTitle: 'Выравнивание текста',
		styleTextAlignmentDesc:
			'Выберите выравнивание текста: выключка влево, вправо, по ширине, по центру.',
		styleTextAlignmentLeft: 'Выключка влево',
		styleTextAlignmentRight: 'Выключка вправо',
		styleTextAlignmentJustify: 'Выключка по ширине',
		styleTextAlignmentCenter: 'Выключка по центру',
		styleLetterSpacingTitle: 'Расстояние между буквами',
		styleLetterSpacingDesc:
			'Выберите расстояние между буквами (normal или пользовательское значение в em, rem, px, pt, mm, ch, %).',
		styleWordSpacingTitle: 'Расстояние между словами',
		styleWordSpacingDesc:
			'Выберите расстояние между словами (normal или пользовательское значение в em, rem, px, pt, mm, ch, %).',
		styleWordBreakTitle: 'Перенос слов',
		styleWordBreakDesc: 'Управляет переносом строк внутри слов при переполнении контейнера.',
		wordBreakNormal: 'Обычный',
		wordBreakAll: 'Разрыв в любом месте',
		wordBreakKeep: 'Без разрыва (CJK)',
		styleOverflowWrapTitle: 'Перенос длинных слов',
		styleOverflowWrapDesc: 'Управляет переносом слов, выходящих за границу блока.',
		overflowWrapNormal: 'Обычный',
		overflowWrapBreakWord: 'Перенос длинных слов',
		overflowWrapAnywhere: 'Перенос в любом месте',
		styleTextWrapTitle: 'Алгоритм переноса строк',
		styleTextWrapDesc: 'Определяет алгоритм расстановки переносов строк внутри абзаца.',
		textWrapWrap: 'Обычный',
		textWrapNowrap: 'Без переноса',
		textWrapBalance: 'Равные строки',
		textWrapPretty: 'Улучшенный',
		styleTextJustifyTitle: 'Алгоритм выравнивания',
		styleTextJustifyDesc: 'Способ распределения пробелов при выключке по ширине.',
		textJustifyAuto: 'Авто',
		textJustifyNone: 'Без выравнивания',
		textJustifyInterWord: 'По словам',
		textJustifyInterChar: 'По символам',
		styleTextIndentTitle: 'Отступ первой строки',
		styleTextIndentDesc: 'Укажите значение в мм, em, rem, px и т.д. или 0 для отключения.',
		styleTextIndentListItemTitle: 'Отступ первой строки списка',
		styleTextIndentListItemDesc: 'Укажите значение в мм, em, rem, px и т.д. или 0 для отключения.',
		styleTextPaddingLeftListItemTitle: 'Внутренний левый отступ списка',
		styleTextPaddingLeftListItemDesc:
			'Укажите значение в мм, em, rem, px и т.д. или 0 для отключения. Может быть использован для создания «висячего отступа».',
		styleHyphensTitle: 'Расстановка переносов',
		styleHyphensDesc: 'Управляет автоматической расстановкой переносов в словах.',
		hyphensNone: 'Без переносов',
		hyphensManual: 'Только мягкие переносы',
		hyphensAuto: 'Автоматически',
		styleHyphenateLimitCharsTitle: 'Лимит символов для переноса',
		styleHyphenateLimitCharsDesc:
			'Три значения через пробел: минимум символов в слове, до и после переноса (например: 5 5 3).',
		styleHangingPunctuationTitle: 'Висячая пунктуация',
		styleHangingPunctuationDesc: 'Вынос знаков препинания за границу текстового блока.',
		hangingNone: 'Выключено',
		hangingFirst: 'Первый символ',
		hangingLast: 'Последний символ',
		hangingFirstLast: 'Первый и последний',
		hangingAllowEnd: 'По возможности в конце строки',
		hangingForceEnd: 'Принудительно в конце строки',
		styleWidowsTitle: 'Висячие строки в конце абзаца',
		styleWidowsDesc: 'Минимальное число строк абзаца, переносимых на следующую страницу.',
		styleOrphansTitle: 'Висячие строки в начале абзаца',
		styleOrphansDesc: 'Минимальное число строк абзаца, остающихся на предыдущей странице.',
		styleLineHeightTitle: 'Высота строки',
		styleLineHeightDesc: 'Расстояние между строками. Может быть число или normal.',
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
		customRulesCommonTitle: 'Custom common rules',
		customRulesCyrillicTitle: 'Custom rules for Cyrillic',
		customRulesLatinTitle: 'Custom rules for Latin',
		customRulesDesc: 'Format: "regular expression|replacement", one per line.',
		styleEnabledTitle: 'Enable styles',
		styleEnabledDesc:
			'Affects the display of note content. Several features may not work on older Chromium versions.',
		styleTextAlignmentTitle: 'Text Alignment',
		styleTextAlignmentDesc: 'Select text alignment: left, right, justify, center.',
		styleTextAlignmentLeft: 'Left',
		styleTextAlignmentRight: 'Right',
		styleTextAlignmentJustify: 'Justify',
		styleTextAlignmentCenter: 'Center',
		styleLetterSpacingTitle: 'Letter Spacing',
		styleLetterSpacingDesc:
			'Select letter spacing (normal or custom value in em, rem, px, pt, mm, ch, %).',
		styleWordSpacingTitle: 'Word Spacing',
		styleWordSpacingDesc:
			'Select word spacing (normal or custom value in em, rem, px, pt, mm, ch, %).',
		styleWordBreakTitle: 'Word Break',
		styleWordBreakDesc:
			'Controls line-breaking behaviour inside words when they overflow the container.',
		wordBreakNormal: 'Normal',
		wordBreakAll: 'Break at any character',
		wordBreakKeep: 'No break (CJK)',
		styleOverflowWrapTitle: 'Overflow Wrap',
		styleOverflowWrapDesc: 'Controls line-breaking of words that overflow their container.',
		overflowWrapNormal: 'Normal',
		overflowWrapBreakWord: 'Break long words',
		overflowWrapAnywhere: 'Break anywhere',
		styleTextWrapTitle: 'Text Wrap Algorithm',
		styleTextWrapDesc: 'Determines the algorithm used for line-breaking within paragraphs.',
		textWrapWrap: 'Normal',
		textWrapNowrap: 'No wrapping',
		textWrapBalance: 'Balanced lines',
		textWrapPretty: 'Improved',
		styleTextJustifyTitle: 'Text Justify',
		styleTextJustifyDesc: 'Justification algorithm used when text alignment is set to justify.',
		textJustifyAuto: 'Auto',
		textJustifyNone: 'None',
		textJustifyInterWord: 'Inter-word',
		textJustifyInterChar: 'Inter-character',
		styleTextIndentTitle: 'Text Indent',
		styleTextIndentDesc: 'First-line indent. Accepts mm, em, rem, px, etc. Use 0 to disable.',
		styleTextIndentListItemTitle: 'Text Indent for List Items',
		styleTextIndentListItemDesc:
			'Indent for list items. Accepts mm, em, rem, px, etc. Use 0 to disable.',
		styleTextPaddingLeftListItemTitle: 'Text Left Padding for List Items',
		styleTextPaddingLeftListItemDesc:
			'Left padding for list items. Accepts mm, em, rem, px, etc. Use 0 to disable. May be used for make “hanging indent”.',
		styleHyphensTitle: 'Hyphens',
		styleHyphensDesc: 'Controls automatic hyphenation of words.',
		hyphensNone: 'No hyphens',
		hyphensManual: 'Soft hyphens only',
		hyphensAuto: 'Automatic',
		styleHyphenateLimitCharsTitle: 'Hyphenate Limit Chars',
		styleHyphenateLimitCharsDesc:
			'Three space-separated values: min word length, min chars before and after the hyphen (e.g. 5 5 3).',
		styleHangingPunctuationTitle: 'Hanging Punctuation',
		styleHangingPunctuationDesc: 'Allows punctuation marks to hang outside the text block edge.',
		hangingNone: 'Disabled',
		hangingFirst: 'First character',
		hangingLast: 'Last character',
		hangingFirstLast: 'First and last',
		hangingAllowEnd: 'Allow at line end',
		hangingForceEnd: 'Force at line end',
		styleWidowsTitle: 'Widows',
		styleWidowsDesc:
			'Minimum number of lines carried over to the next page from the end of a paragraph.',
		styleOrphansTitle: 'Orphans',
		styleOrphansDesc:
			'Minimum number of lines left on the previous page from the start of a paragraph.',
		styleLineHeightTitle: 'Line Height',
		styleLineHeightDesc: 'Space between lines. Accepts numbers or normal as value.',
	},
};

export function t(key: LocaleKey): string {
	const lang = moment.locale() === 'ru' ? 'ru' : 'en';
	return locales[lang][key];
}
