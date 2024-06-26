<script lang="ts">
	import Canvas from '../components/Canvas.svelte'
	import {
		SortingAlgorithms,
		isSortingAlgoImplemented,
		type ImplementedSortingAlgo,
	} from '../hooks/use-sorting'
	import Slider from '../components/Slider.svelte'
	import Select from '../components/Select.svelte'
	import PlayButton from '../components/PlayButton.svelte'
	import classNames from 'classnames'
	import { sortedArray } from '../stores/sorted-array'
	import { isPlaying } from '../stores/playing'
	import { selectedIndex, otherIndexes } from '../stores/selected-index'

	const placeholder = 'Choose an algorithm'
	const options = Object.values(SortingAlgorithms).map((v) => ({
		value: v,
		label: v,
		disabled: !isSortingAlgoImplemented(v),
	}))

	const handlePlay = () => {
		if (hasFinished) {
			hasFinished = false
			return sortedArray.reset(currentSize)
		}
		if (currentAlgo) $isPlaying = !$isPlaying
		else showError = true

		if ($isPlaying && currentAlgo) {
			selectedIndex.set(null)
			otherIndexes.set([])
			sortedArray.sort(currentAlgo, sleep).then(() => {
				// set only if we returned because we hasFinished sorting and not if we have returned because we stopped
				if ($isPlaying) {
					selectedIndex.set(null)
					otherIndexes.set([])
					hasFinished = true
				}
				$isPlaying = false
			})
		}
	}

	let currentSize = 105
	let sleep = 15
	let currentAlgo: ImplementedSortingAlgo | undefined = undefined
	let showWhenPlaying = false
	let showError = false
	let movingTimer = 0
	let showButton = true
	let hasFinished = false

	$: sortedArray.reset(currentSize)
	$: if ($isPlaying) showWhenPlaying = false
	$: if (!$isPlaying || showWhenPlaying) showButton = true
	else setTimeout(() => (showButton = false), 300)
</script>

<div class="flex flex-col max-w-5xl mx-auto p-4 gap-4 overflow-hidden text-txt">
	<h1 class="text-center text-4xl font-bold">{currentAlgo ?? placeholder}</h1>

	<div class="flex flex-col lg:flex-row gap-2 mx-auto">
		<Slider
			class="order-2 lg:order-1"
			on:change={(v) => {
				currentSize = v.detail
				$isPlaying = false
			}}
			value={currentSize}
			min={10}
			max={200}
			title="size"
		/>
		<div class="relative order-1 lg:order-2 max-w-[904px] group">
			<div
				class={classNames('absolute inset-0 bg-txt bg-opacity-30', {
					'opacity-0 bg-transparent transition duration-300': $isPlaying,
					'group-hover:opacity-100 group-hover:bg-txt group-hover:bg-opacity-30':
						$isPlaying && showWhenPlaying,
				})}
				on:pointerleave={() => (showWhenPlaying = false)}
				on:pointermove={() => {
					showWhenPlaying = true
					clearTimeout(movingTimer)
					movingTimer = setTimeout(() => (showWhenPlaying = false), 1000)
				}}
			>
				<button
					on:click={handlePlay}
					class={classNames(
						'w-full h-full flex justify-center items-center',
						showButton ? 'flex' : 'lg:hidden'
					)}
				>
					<PlayButton icon={hasFinished ? 'reset' : $isPlaying ? 'pause' : 'play'} />
				</button>
			</div>
			<Canvas array={$sortedArray} selectedIndex={$selectedIndex} otherIndexes={$otherIndexes} />
		</div>
		<Slider
			class="order-3"
			on:change={(v) => {
				sleep = 100 - v.detail
				$isPlaying = false
			}}
			value={100 - sleep}
			max={100}
			title="speed"
		/>
	</div>

	<Select
		on:change={(v) => (currentAlgo = v.detail)}
		{options}
		selected={currentAlgo}
		{placeholder}
		error={showError && !currentAlgo}
	/>
</div>
