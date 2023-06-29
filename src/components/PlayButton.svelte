<script lang="ts">
	import { tweened } from 'svelte/motion'
	import { cubicInOut } from 'svelte/easing'

	const pathsToCoords = (paths: string[]) =>
		paths.map((d) =>
			d
				.replace(/[LCMZ]/g, ',')
				.split(',')
				.filter(String)
				.map((c) => Number(c))
		)

	const coordsToPath = (coords: number[]) => {
		const joinedInstructions = coords.reduce(
			(acc, cur, i) => (i % 2 !== 0 ? acc + cur + 'L' : acc + cur + ','),
			''
		)
		return `M${joinedInstructions}Z`
	}

	const pausePaths = [
		'M212.13203,347.27573L280.82241,347.27573L280.82241,627.08798L212.13203,627.08798Z',
		'M393.9595,347.27573L462.64988,347.27573L462.64988,627.08798L393.9595,627.08798Z',
	]
	const playPaths = [
		'M246.84631,381.58161L341.39093,434.38173L341.39093,539.98196L246.84631,592.7821Z',
		'M341.39093,434.38173L435.22131,487.18188L435.22131,487.18188L341.39093,539.98195Z',
	]
	// TODO: center in view box
	const resetPaths = [
		'M131.993,138.043C141.901,114.921,165.023,98.406,191.447,98.406C224.477,98.406,250.901,122.629,257.407,153.457L278.427,153.457C272.921,110.518,236.588,76.386,191.447,76.386C158.417,76.386,129.791,94.003,115.478,121.527L103.367,109.417L103.367,153.457L147.407,153.457L131.993,138.043Z',
		'M279.528,175.477L234.386,175.477L250.901,190.891C240.992,214.011,217.871,230.527,190.346,230.527C158.417,230.527,130.892,206.304,125.387,175.477L103.367,175.477C108.872,218.416,146.306,252.547,190.346,252.547C223.376,252.547,252.002,233.83,267.416,207.405L279.528,219.517L279.528,175.477Z',
	]

	const icons = {
		play: playPaths,
		pause: pausePaths,
		reset: resetPaths,
	}

	export let icon: keyof typeof icons = 'play'
	let hasFinished = true

	const progress = tweened(pathsToCoords(icons[icon]), {
		duration: 300,
		easing: cubicInOut,
	})

	$: progress.set(pathsToCoords(icons[icon]))
	$: icon, (hasFinished = false), setTimeout(() => (hasFinished = true), 300)
</script>

<div
	class="w-20 h-20 rounded-full bg-light-gray flex justify-center items-center shadow-lg fill-txt stroke-txt"
>
	<svg
		class="m-auto"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 250 250"
		width="33"
		style={icon === 'reset' ? 'scale: 1.2' : undefined}
	>
		<g
			transform={icon === 'reset' ? 'translate(-100,-75)' : 'translate(-212.13203,-347.27573)'}
			style={icon === 'reset' ? 'scale: 1.4' : undefined}
		>
			{#each [0, 1] as i}
				<path d={hasFinished || icon === 'reset' ? icons[icon][i] : coordsToPath($progress[i])} />
			{/each}
		</g>
	</svg>
</div>
