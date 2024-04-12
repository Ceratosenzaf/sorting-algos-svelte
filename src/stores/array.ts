import { writable } from 'svelte/store'
import { MAX_ARRAY_VALUE } from '../hooks/use-sorting'

const createArray = () => {
	const { subscribe, set } = writable<number[]>([])

	const reset = (length: number) => {
		const array = new Array(length).fill(0).map(() => Math.random() * MAX_ARRAY_VALUE)
		set(array)
		return array
	}

	return { reset, subscribe }
}

export const array = createArray()
