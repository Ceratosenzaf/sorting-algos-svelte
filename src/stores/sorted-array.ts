import { writable, get } from 'svelte/store'
import type { ImplementedSortingAlgo } from '../hooks/use-sorting'
import { getSortingAlgo, isSortingAlgoIntOnly } from '../hooks/use-sorting'
import { array } from './array'

const createSortedArray = () => {
	const { subscribe, set, update } = writable<number[]>([])

	const reset = (...v: Parameters<typeof array.reset>) => set(array.reset(...v))

	const sort = async (algo: ImplementedSortingAlgo, sleep: number) => {
		const arr = isSortingAlgoIntOnly(algo) ? get(array).map(Math.round) : get(array)
		set(arr)
		await getSortingAlgo(algo)(arr, sleep)
	}

	const setAtIndex = (index: number, value: number) => {
		update((array) => {
			array[index] = value
			return array
		})
	}

	const swapAtIndexes = (index1: number, index2: number) => {
		update((array) => {
			const temp = array[index1]
			array[index1] = array[index2]
			array[index2] = temp
			return array
		})
	}

	return { reset, subscribe, sort, setAtIndex, swapAtIndexes }
}

export const sortedArray = createSortedArray()
