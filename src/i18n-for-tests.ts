import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

void i18n.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	debug: true,

	// Have a common namespace used around the full app
	ns: ['translations'],
	defaultNS: 'translations',

	interpolation: {
		escapeValue: false // Not needed for react as it escapes by default
	},

	resources: {
		en: {translations: {}}
	}
});

export default i18n;
