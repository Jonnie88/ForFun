<script>
	import { Icon } from 'svelte-icons-pack';
	export let title;
	export let rows = []; // [{ label: '', value: '' }]
	export let icon;
	export let bgColor = 'bg-white'; // default background

	// Bestäm textfärg baserat på bakgrund
	$: textColor =
		bgColor.includes('bg-primary') ||
		bgColor.includes('bg-secondary') ||
		bgColor.includes('bg-warning')
			? 'text-white'
			: 'text-gray-800';
</script>

<div class={`space-y-4 rounded-2xl p-6 shadow-md ${bgColor} ${textColor}`}>
	<h2 class="mb-4 flex items-center gap-2 text-2xl font-bold">
		<Icon src={icon} class="h-6 w-6" />
		{title}
	</h2>

	<div class="space-y-2">
		{#each rows as row}
			<div class="flex justify-between border-b pb-1">
				<span>{row.label}</span>
				<span class="font-bold">{row.value}</span>
			</div>
		{/each}
	</div>
</div>
