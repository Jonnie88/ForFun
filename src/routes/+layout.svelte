<script>
	import '../app.css';

	let { children } = $props();

	let menuItems = [
		{ name: 'Dashboard', href: '/' },
		{ name: 'Prognos', href: '/ForFun/prognos' },
		{ name: 'Produktivitets timer', href: '/ForFun/produktivitetstimer' },
		{ name: 'Rapporter', href: '#' },
		{ name: 'Inställningar', href: '#' }
	];

	let sidebarOpen = false;
</script>

<!-- Mobile menu toggle button -->
<div class="bg-primary flex items-center justify-between p-4 text-white md:hidden">
	<h1 class="text-xl font-bold">📦 Min Dashboard</h1>
	<button on:click={() => (sidebarOpen = !sidebarOpen)}>
		{#if sidebarOpen}
			<span class="text-3xl">✖️</span> <!-- Close button -->
		{:else}
			<span class="text-3xl">☰</span> <!-- Hamburger -->
		{/if}
	</button>
</div>

<div class="bg-background flex min-h-screen">
	<!-- Sidebar -->
	<div
		class={`bg-primary fixed inset-y-0 left-0 z-30 w-64 transform p-6 text-white ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:static md:translate-x-0`}
	>
		<h1 class="mb-8 hidden text-2xl font-bold md:block">📦 Min Dashboard</h1>
		<!-- Hide title on mobile inside sidebar -->
		{#each menuItems as item}
			<a href={item.href} class="hover:bg-secondary block rounded-lg px-4 py-2">{item.name}</a>
		{/each}
	</div>

	<!-- Main content -->
	<div class="mt-16 flex-1 p-8 md:mt-0">
		{@render children()}
	</div>
</div>
