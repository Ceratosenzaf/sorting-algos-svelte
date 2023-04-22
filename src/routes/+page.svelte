<script lang="ts">
	import Canvas from '../components/Canvas.svelte'
	import { SortingAlgorithms, useSorting } from '../hooks/use-sorting'
	import Slider from '../components/Slider.svelte'
	import Select from '../components/Select.svelte'

	const { getRandomArray } = useSorting()

	const options = Object.values(SortingAlgorithms).map((v) => ({
		value: v,
		label: v,
	}))

	let currentSize = 55
	let deviation = 50 // as a percentage from the mean (50)
	let currentAlgo: SortingAlgorithms | undefined = undefined
	const placeholder = 'Choose an algorithm'

	$: array = getRandomArray(currentSize, deviation)
</script>

<div class="flex flex-col max-w-5xl mx-auto p-4 gap-4 overflow-hidden">
	<h1 class="text-center text-4xl font-bold text-gray-700">{currentAlgo ?? placeholder}</h1>

	<div class="flex flex-col lg:flex-row gap-2">
		<Slider
			class="order-2 lg:order-1"
			on:change={(v) => (currentSize = v.detail)}
			value={currentSize}
			min={10}
		/>
		<div class="relative order-1 lg:order-2 max-w-[904px]">
			<div class="absolute inset-0" />
			<Canvas {array} />
		</div>
		<Slider class="order-3" on:change={(v) => (deviation = v.detail)} value={deviation} />
	</div>

	<Select
		on:change={(v) => (currentAlgo = v.detail)}
		{options}
		selected={currentAlgo}
		{placeholder}
	/>
</div>
