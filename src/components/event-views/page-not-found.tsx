import React from 'react';
import MessageOverlay from '../building-blocks/message-overlay';
import {useTranslation} from 'react-i18next';
import Button from '../building-blocks/button';
import {useHistory} from 'react-router-dom';
import {routes} from '../../routes';

const PageNotFound = () => {
	const {t} = useTranslation();
	const history = useHistory();
	return (
		<MessageOverlay
			emoji="🤷‍"
			message={t('notFound.message')}
			action={
				<Button onClick={() => history.push(routes.root())}>
					{t('action.goHome')}
				</Button>
			}
		/>
	);
};

export default PageNotFound;
