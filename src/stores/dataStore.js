import { writable } from 'svelte/store';

// Ladda från localStorage om det finns
const stored = typeof localStorage !== 'undefined' && localStorage.getItem('dailyData');
const initial = stored
	? JSON.parse(stored)
	: {
			yesterday: { sp: 0, hd: 0, stycke: 0, paket: 0 },
			todayForecast: { sp: 0, hd: 0, stycke: 0, paket: 0 },
			errors: { sp: 0, hd: 0, stycke: 0, paket: 0 },
			hours: 4.0,
			date: new Date().toISOString().split('T')[0]
		};

export const dailyData = writable(initial);

// När dailyData ändras ➔ spara till localStorage
dailyData.subscribe((value) => {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('dailyData', JSON.stringify(value));
	}
});
