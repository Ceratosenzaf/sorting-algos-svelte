import { get } from 'svelte/store'
import type { SortingAlgoRithm } from '../use-sorting'
import { sortedArray } from '../../stores/sorted-array'
import { sleep } from '../../utils/sleep'

export const bubbleSort: SortingAlgoRithm = async (initialArray, sleepTime = 0) => {
	for (let i = 0; i < initialArray.length; i++) {
		for (let j = 0; j < initialArray.length - 1; j++) {
			const currentArray = get(sortedArray)
			if (currentArray[j] > currentArray[j + 1]) sortedArray.swapAtIndexes(j, j + 1)
			await sleep(sleepTime)
		}
	}

	return get(sortedArray)
}
