<script>
	import { Icon } from 'svelte-icons-pack';

	export let title;
	export let value;
	export let icon;
	export let bgColor = 'bg-primary';
</script>

<div class={`rounded-2xl p-6 text-white shadow-md ${bgColor}`}>
	<h2 class="flex items-center gap-2 text-2xl font-bold">
		<Icon src={icon} class="h-6 w-6" />
		{title}
	</h2>
	<p class="mt-2 text-4xl">{value}</p>
</div>
