<script lang="ts">
	import ButtonGroup from '../components/ButtonGroup.svelte';
  import Canvas from '../components/Canvas.svelte';
  import { SortingAlgorithms, useSorting } from '../hooks/use-sorting'  
	import Slider from '../components/Slider.svelte';
  
  const { getRandomArray } = useSorting()
  const array = getRandomArray(100)

  const currentAlgo = SortingAlgorithms.Bubble
</script>

<div class="flex flex-col max-w-5xl mx-auto p-4 gap-4 overflow-hidden">
  <h1 class="text-center text-4xl font-bold text-gray-700">{currentAlgo}</h1>

  <div class="flex flex-col lg:flex-row gap-2">
    <Slider class="order-2 lg:order-1" />
    <Canvas {array} class="order-1 lg:order-2 max-w-[904px]" />
    <Slider class="order-3" />
  </div>

  <ButtonGroup />
</div>

