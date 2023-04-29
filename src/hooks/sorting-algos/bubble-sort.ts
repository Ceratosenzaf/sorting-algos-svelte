import { get } from 'svelte/store'
import type { SortingAlgoRithm } from '../use-sorting'
import { sortedArray } from '../../stores/sorted-array'

export const bubbleSort: SortingAlgoRithm = async (initialArray) => {
	for (let i = 0; i < initialArray.length; i++) {
		for (let j = 0; j < initialArray.length - 1; j++) {
			const currentArray = get(sortedArray)
			if (currentArray[j] > currentArray[j + 1]) sortedArray.swapAtIndexes(j, j + 1)
		}
	}

	return get(sortedArray)
}
