<script lang="ts">
	import { onMount } from 'svelte'

	export let array: number[] = []
	export let selectedIndex: number | null = null
	export let aspectRatio = 2

	let canvas: HTMLCanvasElement | null = null
	let ctx: CanvasRenderingContext2D | null = null

	onMount(() => {
		if (canvas) {
			const actualSizes = canvas.getBoundingClientRect()
			canvas.width = actualSizes.width * aspectRatio
			canvas.height = actualSizes.height * aspectRatio
			ctx = canvas?.getContext('2d')
		}

		drawAllRect(array)
	})

	$: selectedIndex, drawAllRect(array)

	const getFill = (i: number) => {
		if (i === selectedIndex) return 'green'
		return 'red'
	}

	const drawAllRect = (arr: number[]) => {
		if (!ctx || !canvas) return

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		const w = canvas.width / array.length
		arr.forEach((n, i) => {
			ctx!.fillStyle = getFill(i)
			const h = (canvas!.height / 100) * n
			ctx?.fillRect(i * w + 0.5, canvas!.height, w - 1, -h)
		})
	}
</script>

<canvas bind:this={canvas} class="w-full h-[60vh] bg-white lg:h-[40vh] border-4 border-gray-700" />
