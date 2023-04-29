import { writable, get } from 'svelte/store'
import type { SortingAlgorithms } from '../hooks/use-sorting'
import { getSortingAlgo } from '../hooks/use-sorting'
import { array } from './array'

const createSortedArray = () => {
	const { subscribe, set, update } = writable<number[]>([])

	const reset = (...v: Parameters<typeof array.reset>) => set(array.reset(...v))

	const sort = async (algo: SortingAlgorithms) => await getSortingAlgo(algo)(get(array))

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
