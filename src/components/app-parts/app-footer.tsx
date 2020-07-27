import React from 'react';

import './app-footer.scss';
import AppContent from '../building-blocks/app-content';
import {useTranslation} from 'react-i18next';

const AppFooter = () => {
	const {t} = useTranslation();

	return (
		<div className="app-footer">
			<AppContent childrenWrapperClassName="app-footer-content">
				<span>{t('app.footer.mainNote')}</span>
				<span>{t('app.footer.timestamp')}</span>
			</AppContent>
		</div>
	);
};

export default AppFooter;
