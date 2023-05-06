import { get } from 'svelte/store'
import type { SortingAlgoRithm } from '../use-sorting'
import { sortedArray } from '../../stores/sorted-array'
import { isPlaying } from '../../stores/playing'
import { sleep } from '../../utils/sleep'

export const bubbleSort: SortingAlgoRithm = async (initialArray, sleepTime = 0) => {
	for (let i = 0; i < initialArray.length; i++) {
		for (let j = 0; j < initialArray.length - 1; j++) {
			const currentArray = get(sortedArray)
			if (!get(isPlaying)) return currentArray
			if (currentArray[j] > currentArray[j + 1]) sortedArray.swapAtIndexes(j, j + 1)
			await sleep(sleepTime)
		}
	}

	return get(sortedArray)
}
