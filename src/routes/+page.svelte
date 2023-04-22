<script lang="ts">
	import ButtonGroup from '../components/ButtonGroup.svelte'
	import Canvas from '../components/Canvas.svelte'
	import { SortingAlgorithms, useSorting } from '../hooks/use-sorting'
	import Slider from '../components/Slider.svelte'

	const { getRandomArray } = useSorting()

	let currentSize = 50
	let deviation = 50
	let currentAlgo = SortingAlgorithms.Bubble

	$: array = getRandomArray(currentSize, deviation)
</script>

<div class="flex flex-col max-w-5xl mx-auto p-4 gap-4 overflow-hidden">
	<h1 class="text-center text-4xl font-bold text-gray-700">{currentAlgo}</h1>

	<div class="flex flex-col lg:flex-row gap-2">
		<Slider
			class="order-2 lg:order-1"
			on:change={(v) => (currentSize = v.detail)}
			value={currentSize}
			min={10}
		/>
		<Canvas class="order-1 lg:order-2 max-w-[904px]" {array} />
		<Slider class="order-3" on:change={(v) => (deviation = v.detail)} value={deviation} />
	</div>

	<ButtonGroup />
</div>
