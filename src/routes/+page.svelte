<script lang="ts">
	import Canvas from '../components/Canvas.svelte'
	import { SortingAlgorithms, useSorting } from '../hooks/use-sorting'
	import Slider from '../components/Slider.svelte'
	import Select from '../components/Select.svelte'
	import PlayButton from '../components/PlayButton.svelte'
	import classNames from 'classnames'

	const { getRandomArray } = useSorting()

	const placeholder = 'Choose an algorithm'
	const options = Object.values(SortingAlgorithms).map((v) => ({
		value: v,
		label: v,
	}))

	const handlePlay = () => {
		if (currentAlgo) isPlaying = !isPlaying
		else showError = true
	}

	let currentSize = 55
	let deviation = 50 // as a percentage from the mean (50)
	let currentAlgo: SortingAlgorithms | undefined = undefined
	let isPlaying = false
	let showWhenPlaying = false
	let showError = false
	let movingTimer = 0
	let showButton = true

	$: array = getRandomArray(currentSize, deviation)
	$: if (isPlaying) showWhenPlaying = false
	$: if (!isPlaying || showWhenPlaying) showButton = true
	else setTimeout(() => (showButton = false), 300)
</script>

<div class="flex flex-col max-w-5xl mx-auto p-4 gap-4 overflow-hidden text-txt">
	<h1 class="text-center text-4xl font-bold">{currentAlgo ?? placeholder}</h1>

	<div class="flex flex-col lg:flex-row gap-2">
		<Slider
			class="order-2 lg:order-1"
			on:change={(v) => (currentSize = v.detail)}
			value={currentSize}
			min={10}
		/>
		<div class="relative order-1 lg:order-2 max-w-[904px] group">
			<div
				class={classNames('absolute inset-0 bg-txt bg-opacity-30', {
					'opacity-0 bg-transparent transition duration-300': isPlaying,
					'group-hover:opacity-100 group-hover:bg-txt group-hover:bg-opacity-30':
						isPlaying && showWhenPlaying,
				})}
				on:pointerleave={() => (showWhenPlaying = false)}
				on:pointermove={() => {
					showWhenPlaying = true
					clearTimeout(movingTimer)
					movingTimer = setTimeout(() => (showWhenPlaying = false), 1000)
				}}
			>
				{#if showButton}
					<button on:click={handlePlay} class="w-full h-full flex justify-center items-center">
						<PlayButton {isPlaying} />
					</button>
				{/if}
			</div>
			<Canvas {array} />
		</div>
		<Slider class="order-3" on:change={(v) => (deviation = v.detail)} value={deviation} />
	</div>

	<Select
		on:change={(v) => (currentAlgo = v.detail)}
		{options}
		selected={currentAlgo}
		{placeholder}
		error={showError && !currentAlgo}
	/>
</div>
