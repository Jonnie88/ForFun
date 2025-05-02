<script>
	import { dailyData } from '../../stores/dataStore'; // eller vart du lagt store-filen

	// Separata egna variabler
	let yesterday = {
		sp: 0,
		hd: 0,
		stycke: 0,
		paket: 0
	};

	let todayForecast = {
		sp: 0,
		hd: 0,
		stycke: 0,
		paket: 0
	};

	let errors = {
		sp: 0,
		hd: 0,
		stycke: 0,
		paket: 0
	};

	let today = new Date().toISOString().split('T')[0];

	// När dailyData ändras ➔ kopiera in till våra lokala variabler
	$: if ($dailyData) {
		yesterday = $dailyData.yesterday;
		todayForecast = $dailyData.todayForecast;
		errors = $dailyData.errors;
	}

	function handleSave() {
		dailyData.set({
			yesterday,
			todayForecast,
			errors,
			date: today
		});
		console.log('Data sparad:', $dailyData);
	}

	$: packagesPerHour =
		todayForecast.hoursActive > 0 ? todayForecast.paket + todayForecast.sp / trackHours : 0;
</script>

<div class="grid w-full grid-cols-12 grid-rows-1 gap-4 p-6">
	<!-- Vänster sida: Formulär -->
	<div class="col-span-10 space-y-6 rounded-xl bg-white p-6 shadow-md">
		<!-- Daglig Prognos -->
		<div>
			<h2 class="text-primary text-2xl font-bold">🗓️ Daglig Prognos</h2>
			<span class="text-gray-500">{today}</span>

			<div class="mt-4 grid grid-cols-2 gap-4">
				<div>
					<label>SP idag:</label><input type="number" bind:value={todayForecast.sp} class="input" />
				</div>
				<div>
					<label>HD idag:</label><input type="number" bind:value={todayForecast.hd} class="input" />
				</div>
				<div>
					<label>Stycke idag:</label><input
						type="number"
						bind:value={todayForecast.stycke}
						class="input"
					/>
				</div>
				<div>
					<label>Paket idag:</label><input
						type="number"
						bind:value={todayForecast.paket}
						class="input"
					/>
				</div>
				<div>
					<label>Antal timmar banan är aktiv:</label><input
						type="number"
						bind:value={todayForecast.hoursActive}
						class="input"
					/>
				</div>
			</div>
		</div>

		<!-- Gårdagens Utfall -->
		<div>
			<h2 class="text-primary text-2xl font-bold">📅 Gårdagens Utfall</h2>
			<span class="text-gray-500">{today}</span>

			<div class="mt-4 grid grid-cols-2 gap-4">
				<div>
					<label>SP igår:</label><input type="number" bind:value={yesterday.sp} class="input" />
				</div>
				<div>
					<label>HD igår:</label><input type="number" bind:value={yesterday.hd} class="input" />
				</div>
				<div>
					<label>Stycke igår:</label><input
						type="number"
						bind:value={yesterday.stycke}
						class="input"
					/>
				</div>
				<div>
					<label>Paket igår:</label><input
						type="number"
						bind:value={yesterday.paket}
						class="input"
					/>
				</div>
			</div>
		</div>

		<!-- Antal Fel -->
		<div>
			<h2 class="text-primary text-2xl font-bold">❌ Antal Fel</h2>

			<div class="mt-4 grid grid-cols-2 gap-4">
				<div>
					<label>Fel SP:</label><input type="number" bind:value={errors.sp} class="input" />
				</div>
				<div>
					<label>Fel HD:</label><input type="number" bind:value={errors.hd} class="input" />
				</div>
				<div>
					<label>Fel Stycke:</label><input type="number" bind:value={errors.stycke} class="input" />
				</div>
				<div>
					<label>Fel Paket:</label><input type="number" bind:value={errors.paket} class="input" />
				</div>
			</div>
		</div>
	</div>

	<!-- Höger sida: Summering -->
	<div class="col-span-2 col-start-11 space-y-4 rounded-xl bg-gray-100 p-6 shadow-md">
		<div>
			<h2 class="text-primary text-xl font-bold">📋 Summering</h2>
			<span class="text-gray-500">{today}</span>
		</div>

		<div class="flex flex-col gap-3">
			<div class="flex items-center justify-between">
				<span class="text-gray-600">SP</span>
				<span class="font-bold">{todayForecast.sp}</span>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-gray-600">HD</span>
				<span class="font-bold">{todayForecast.hd}</span>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-gray-600">Stycke</span>
				<span class="font-bold">{todayForecast.stycke}</span>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-gray-600">Paket</span>
				<span class="font-bold">{todayForecast.paket}</span>
			</div>

			<div class="flex items-center justify-between">
				<span class="text-gray-600">Hastighet</span>
				<span class="font-bold">{packagesPerHour}</span>
			</div>
		</div>
	</div>
</div>

<style>
</style>
