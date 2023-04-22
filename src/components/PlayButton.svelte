<script lang="ts">
	import { tweened } from 'svelte/motion'
	import { cubicInOut } from 'svelte/easing'

	const pathsToCoords = (paths: string[]) =>
		paths.map((d) =>
			d
				.replace(/[LMZ]/g, ',')
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

	const pauseCoords = pathsToCoords(pausePaths)
	const playCoords = pathsToCoords(playPaths)

	const progress = tweened(playCoords, {
		duration: 300,
		easing: cubicInOut,
	})

	export let isPlaying = false
	$: isPlaying ? progress.set(pauseCoords) : progress.set(playCoords)
</script>

<div
	class="w-20 h-20 rounded-full bg-light-gray flex justify-center items-center shadow-lg fill-txt stroke-txt"
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250.51786 279.81226" width="33">
		<g transform="translate(-212.13203,-347.27573)">
			<path d={coordsToPath($progress[0])} />
			<path d={coordsToPath($progress[1])} />
		</g>
	</svg>
</div>
