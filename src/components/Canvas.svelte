<script lang="ts">
	import classNames from 'classnames'
	import { onMount } from 'svelte'

	export let array: number[] = []

	let canvas: HTMLCanvasElement | null = null
	let ctx: CanvasRenderingContext2D | null = null

	onMount(() => {
		ctx = canvas?.getContext('2d') ?? null
		if (ctx) ctx.fillStyle = 'red'
		drawAllRect(array)
	})

	$: drawAllRect(array)

	const drawAllRect = (arr: number[]) => {
		if (!ctx || !canvas) return

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		const w = canvas.width / array.length
		arr.forEach((n, i) => {
			const h = (canvas!.height / 100) * n
			ctx?.fillRect(i * w + 0.5, canvas!.height, w - 1, -h)
		})
	}
</script>

<canvas bind:this={canvas} class="w-full h-[60vh] bg-white lg:h-[40vh] border-4 border-gray-700" />
