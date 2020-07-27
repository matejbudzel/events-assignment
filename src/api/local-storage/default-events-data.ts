import {EventCreate} from '../typings/api-request-types';
import {DAY_IN_MS, HOUR_IN_MS} from '../../utils/time-constants';

const getDefaultEvents: () => EventCreate[] = () => {
	const now = new Date();
	return [
		{
			summary: 'React hackathon',
			duration: 180,
			// A week ago at 18:00
			date: new Date(
				new Date(now.getTime() - 7 * DAY_IN_MS).setHours(18, 0, 0, 0)
			).toUTCString(),
			description:
				'# React Hackathon\n\nWe will be messing around with [hooks API](https://reactjs.org/docs/hooks-intro.html).\n'
		},
		{
			summary: 'Crytocurrencies 101',
			duration: 120,
			// An hour ago
			date: new Date(
				new Date(now.getTime() - HOUR_IN_MS).setMinutes(0, 0, 0)
			).toUTCString(),
			description:
				'# Crytocurrencies 101\n\nIntroduction to Cryptocurrencies. We will be discussing following topics:\n\n* What is a cryptocurrency?\n* How can I use it?\n* ...\n'
		},
		{
			summary: 'How to survive Zombie Apocalypse! 🧟',
			duration: 120,
			// In 3 days at 9:00
			date: new Date(
				new Date(now.getTime() + 3 * DAY_IN_MS).setMinutes(0, 0, 0)
			).toUTCString(),
			description:
				'# How to survive Zombie Apocalypse! 🧟\n\nBrace yourselves! They are coming for us!\n\nOR MAYBE YOU COUND STAND AND FIGHT! 🥊\n'
		}
	];
};

export default getDefaultEvents;
