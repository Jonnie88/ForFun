<script>
	import TotalCard from '$lib/components/TotalCard.svelte';
	import InfoCard from '$lib/components/InfoCard.svelte';
	import { LuPackage } from 'svelte-icons-pack/lu';
	import { TrOutlinePackages } from 'svelte-icons-pack/tr';
	import { dailyData } from '../stores/dataStore';
	import { Icon } from 'svelte-icons-pack';

	let yesterday = { sp: 0, hd: 0, stycke: 0, paket: 0 };
	let todayForecast = { sp: 0, hd: 0, stycke: 0, paket: 0, hoursActive: 0 };
	let errors = { sp: 0, hd: 0, stycke: 0, paket: 0 };

	let errorsYesterday = [
		{ product: 'Stycke', errors: 5 },
		{ product: 'SP', errors: 3 },
		{ product: 'HD', errors: 1 },
		{ product: 'Paket', errors: 4 }
	];

	$: if ($dailyData) {
		yesterday = $dailyData.yesterday;
		todayForecast = $dailyData.todayForecast;
		errors = $dailyData.errors;
	}

	$: totalPieces = todayForecast.stycke + todayForecast.hd;
	$: totalPackages = todayForecast.sp + todayForecast.paket;
	$: total = totalPieces + totalPackages;
	$: processedPerHour =
		todayForecast.hoursActive > 0
			? (todayForecast.sp + todayForecast.paket) / todayForecast.hoursActive
			: 0;

	// Dynamisk totalfel och farg
	$: totalErrors = errorsYesterday.reduce((sum, item) => sum + item.errors, 0);
	$: totalErrorColor = totalErrors > 0 ? 'bg-warning' : 'bg-success';

	// Beräkna felprocent
	$: errorsYesterday = errorsYesterday.map((item) => ({
		...item,
		percentage: ((item.errors / 4000) * 100).toFixed(2)
	}));
</script>

<div class="bg-background min-h-screen space-y-4 overflow-hidden p-6">
	<!-- ÖVERSTA: Totalstycke och Totalpackages -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-4">
		<TotalCard title="Total" value={total} icon={LuPackage} bgColor="bg-primary" />

		<TotalCard title="Total Stycke" value={totalPieces} icon={LuPackage} bgColor="bg-secondary" />

		<TotalCard
			title="Total Packages"
			value={totalPackages}
			icon={TrOutlinePackages}
			bgColor="bg-accent"
		/>
		<TotalCard title="Antal fel" value={totalErrors} icon={LuPackage} bgColor={totalErrorColor} />
	</div>

	<!-- MELLAN: Stycke- och Packages-info -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<InfoCard
			title="Stycke Info"
			bgColor="bg-primary"
			icon={LuPackage}
			rows={[
				{ label: 'Stycke', value: todayForecast.stycke },
				{ label: 'HD', value: todayForecast.hd },
				{ label: 'Total Stycke', value: totalPieces }
			]}
		/>

		<InfoCard
			title="Packages Info"
			icon={TrOutlinePackages}
			rows={[
				{ label: 'Packages', value: todayForecast.paket },
				{ label: 'SP', value: todayForecast.sp },
				{ label: 'Total Packages', value: totalPackages },
				{ label: '', value: `${processedPerHour.toFixed(0)} Pkg/h` }
			]}
		/>
	</div>

	<!-- Antal fel per produkt från gårdagen -->
	<div class="max-h-96 overflow-y-auto rounded-2xl bg-white p-6 shadow-md">
		<h2 class="text-primary mb-4 text-2xl font-bold">
			Antal Fel: {!errorsYesterday.findLast.percentage > 0.02 ? '❌' : '✅'}
		</h2>

		<div class="mb-2 grid grid-cols-3 border-b-2 pb-2 font-bold">
			<span>Produkt</span>
			<span class="text-center">Fel (st)</span>
			<span class="text-right">Fel (%)</span>
		</div>

		{#each errors as error}
			<div class="grid grid-cols-3 border-b py-2">
				<span>{error.product}</span>
				<span class="text-center font-bold">{error.errors} st</span>
				<span
					class={`text-right font-bold ${error.percentage > 0.02 ? 'text-warning' : 'text-success'}`}
					>{error.percentage} %</span
				>
			</div>
		{/each}
	</div>
</div>
