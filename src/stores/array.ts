import { writable } from 'svelte/store'

const createArray = () => {
	const { subscribe, set } = writable<number[]>([])

	const reset = (length: number) => {
		const array = new Array(length).fill(0).map(() => Math.random() * 100)
		set(array)
		return array
	}

	return { reset, subscribe }
}

export const array = createArray()
