import { writable } from 'svelte/store'

const createArray = () => {
	const { subscribe, set } = writable<number[]>([])

	const reset = (length: number, difference: number) => {
		const array = new Array(length).fill(0).map(() => Math.random() * 100)
		const mean = array.reduce((a, b) => a + b, 0) / array.length
		const sd = Math.sqrt(
			array.reduce((a, b) => a + (b - mean) * (b - mean), 0) / (array.length - 1)
		)
		const res = array.map((n) => ((difference / 2) * (n - mean)) / sd + 50)

		set(res)
		return res
	}

	return { reset, subscribe }
}

export const array = createArray()
