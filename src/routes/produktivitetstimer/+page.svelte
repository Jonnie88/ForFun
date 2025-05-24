<script>
	import { onMount } from 'svelte';
	import { writable, derived } from 'svelte/store';

	const now = new Date();
	const startTime = new Date(now);
	const endTime = new Date(now.getTime() + 4.5 * 60 * 60 * 1000);
	const breakStart = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
	const breakEnd = new Date(startTime.getTime() + 2.5 * 60 * 60 * 1000);

	const pkg = 5700;
	const duration = endTime - startTime;
	const breakDuration = breakEnd - breakStart;
	const activeDuration = (duration - breakDuration) / 1000;
	const pkgPerSecond = pkg / activeDuration;

	const elapsed = writable(0);

	const adjustedElapsed = derived(elapsed, ($elapsed) => {
		const nowTime = new Date(startTime.getTime() + $elapsed);
		if (nowTime < breakStart) return $elapsed;
		if (nowTime > breakEnd) return $elapsed - breakDuration;
		return breakStart - startTime;
	});

	const pkgProgress = derived(adjustedElapsed, ($adjustedElapsed) => {
		const pkgSoFar = ($adjustedElapsed / 1000) * pkgPerSecond;
		return Math.min(pkgSoFar / pkg, 1); // max 100%
	});

	function updateElapsed() {
		const now = new Date();
		const msElapsed = now - startTime;
		elapsed.set(msElapsed);
	}

	onMount(() => {
		updateElapsed();
		const interval = setInterval(updateElapsed, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="circle">
	<svg class="svg-circle" width="200" height="200">
		<circle cx="100" cy="100" r="90" stroke="#ddd" stroke-width="15" fill="none" />
		<circle
			cx="100"
			cy="100"
			r="90"
			stroke="#007bff"
			stroke-width="15"
			fill="none"
			stroke-dasharray="565.48"
			stroke-dashoffset={565.48 * (1 - $pkgProgress)}
		/>
	</svg>
	<div class="text">
		{($pkgProgress * pkg).toFixed(0)}<br />
		<span style="font-size: 0.9rem; font-weight: normal;">of {pkg} pkg</span>
	</div>
</div>

<style>
	.circle {
		position: relative;
		width: 200px;
		height: 200px;
	}
	.svg-circle {
		transform: rotate(-90deg);
	}
	.text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		font-size: 1.5rem;
		font-weight: bold;
	}
</style>
