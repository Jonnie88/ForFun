<script>
	import TotalCard from '$lib/components/TotalCard.svelte';
	import { LuPackage } from 'svelte-icons-pack/lu';
	import { TrOutlinePackages } from 'svelte-icons-pack/tr';

	import { Icon } from 'svelte-icons-pack';

	let yesterdaysPackages = 7400;
	let incomingPackages = 7500;
	let incomingPieces = 2000;
	let incomingHd = 300;
	let incomingSp = 500;
	let hoursWorked = 4;

	let errorsYesterday = [
		{ product: 'Stycke', errors: 5 },
		{ product: 'SP', errors: 3 },
		{ product: 'HD', errors: 1 },
		{ product: 'Paket', errors: 4 }
	];

	$: totalPieces = incomingPieces + incomingHd;
	$: totalPackages = incomingPackages + incomingSp;
	$: total = incomingPackages + incomingPieces;
	$: processedPerHour = hoursWorked > 0 ? (incomingPackages + incomingSp) / hoursWorked : 0;

	// Dynamisk totalfel och färg
	$: totalErrors = errorsYesterday.reduce((sum, item) => sum + item.errors, 0);
	$: totalErrorColor = totalErrors > 0.02 ? 'bg-warning' : 'bg-success';

	// Beräkna felprocent för varje produkt baserat på gårdagens paket
	$: errorsYesterday = errorsYesterday.map((item) => ({
		...item,
		percentage: ((item.errors / yesterdaysPackages) * 100).toFixed(2)
	}));
</script>

<div class="bg-background min-h-screen space-y-4 overflow-hidden p-6">
	<!-- ÖVERSTA: Totalstycke och Totalpackages -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-4">
		<TotalCard title="Total" value={total} icon={LuPackage} bgColor="bg-primary" />

		<TotalCard title="Total Stycke" value={totalPieces} icon={LuPackage} bgColor="bg-secondary" />

		<TotalCard
			title="Total Packages"
			value={totalPieces}
			icon={TrOutlinePackages}
			bgColor="bg-accent"
		/>
		<TotalCard title="Antal fel" value={totalErrors} icon={LuPackage} bgColor={totalErrorColor} />
	</div>

	<!-- MELLAN: Stycke- och Packages-info -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="space-y-4 rounded-2xl bg-white p-6 shadow-md">
			<h2 class="text-primary mb-4 flex gap-2 text-2xl font-bold">
				<Icon src={LuPackage} /> Stycke Info
			</h2>
			<div class="text-lg">Stycke: {incomingPieces}</div>
			<div class="text-lg">HD: {incomingHd}</div>
			<div class="text-success text-lg font-semibold">Total Stycke: {totalPieces}</div>
		</div>
		<div class="space-y-4 rounded-2xl bg-white p-6 shadow-md">
			<h2 class="text-primary mb-4 flex gap-2 text-2xl font-bold">
				<Icon src={TrOutlinePackages} /> Packages Info
			</h2>
			<div class="text-lg">Packages: {incomingPackages}</div>
			<div class="text-lg">SP: {incomingSp}</div>
			<div class="text-success text-lg font-semibold">
				Total Packages: {totalPackages} <br />
				<span class="text-sm font-light text-black">{processedPerHour.toFixed(0)} Pkg/h</span>
			</div>
		</div>
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

		{#each errorsYesterday as error}
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
