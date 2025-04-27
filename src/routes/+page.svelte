<script>
	let incomingPackages = 7500;
	let incomingPieces = 2000;
	let incomingHd = 300;
	let incomingSp = 500;
	let hoursWorked = 4;

	// Fel per produkt från igår
	let errorsYesterday = [
		{ product: 'Stycke', errors: 5, percentage: 15 },
		{ product: 'SP', errors: 3, percentage: 10 },
		{ product: 'HD', errors: 1, percentage: 5 },
		{ product: 'Paket', errors: 4, percentage: 20 },
		{ product: 'Total', errors: 4, percentage: 3 }
	];

	$: totalPieces = incomingPieces + incomingHd;
	$: totalPackages = incomingPackages + incomingSp;
	$: total = incomingPackages + incomingPieces;
	$: processedPerHour = hoursWorked > 0 ? (incomingPackages + incomingSp) / hoursWorked : 0;
</script>

<div class="space-y-6 p-6">
	<!-- ÖVERSTA: Totalstycke och Totalpackages -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="rounded-2xl bg-blue-600 p-6 text-white shadow">
			<h2 class="text-2xl font-bold">🧩 Total Stycke</h2>
			<p class="mt-2 text-4xl">{totalPieces}</p>
		</div>
		<div class="rounded-2xl bg-green-600 p-6 text-white shadow">
			<h2 class="text-2xl font-bold">📦 Total Packages</h2>
			<p class="mt-2 text-4xl">{totalPackages}</p>
		</div>
	</div>

	<!-- MELLAN: Stycke- och Packages-info -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="space-y-4 rounded-2xl bg-white p-6 shadow">
			<h2 class="mb-4 text-2xl font-bold">🧩 Stycke Info</h2>
			<div class="text-lg">Stycke: {incomingPieces}</div>
			<div class="text-lg">HD: {incomingHd}</div>
			<div class="text-lg">Total Stycke: {totalPieces}</div>
		</div>

		<div class="space-y-4 rounded-2xl bg-white p-6 shadow">
			<h2 class="mb-4 text-2xl font-bold">📦 Packages Info</h2>
			<div class="text-lg">Packages: {incomingPackages}</div>
			<div class="text-lg">SP: {incomingSp}</div>
			<div class="text-lg">Total Packages: {totalPackages}</div>
			<div class="text-lg">Processed / timme: {processedPerHour.toFixed(2)}</div>
		</div>
	</div>

	<!-- NYTT: Antal fel per produkt från gårdagen -->
	<div class="rounded-2xl bg-white p-6 shadow">
		<h2 class="mb-4 text-2xl font-bold">Antal Fel</h2>

		{#each errorsYesterday as error}
			<div class="grid grid-cols-3 border-b py-2">
				<span>{error.product}</span>
				<span class="text-center font-bold">{error.errors} st</span>
				<span
					class={`text-right font-bold ${error.percentage > 11 ? 'text-red-600' : 'text-green-600'}`}
				>
					{error.percentage} %
				</span>
			</div>
		{/each}
	</div>
</div>
