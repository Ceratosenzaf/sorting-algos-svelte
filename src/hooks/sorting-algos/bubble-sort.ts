/*
	Bubble sort algorithm.
	Time complexity: O(n^2)
	Space complexity: O(1)
	
	for i in [0, n-1]:
		for j in [0, n-1]:
			if array[j] > array[j+1]:
				swap(array[j], array[j+1])
	return array
*/

import { get } from 'svelte/store'
import type { SortingAlgoRithm } from '../use-sorting'
import { sortedArray } from '../../stores/sorted-array'
import { selectedIndex } from '../../stores/selected-index'
import { isPlaying } from '../../stores/playing'
import { sleep } from '../../utils/sleep'

export const bubbleSort: SortingAlgoRithm = async (initialArray, sleepTime = 0) => {
	for (let i = 0; i < initialArray.length; i++) {
		let swapped = false
		for (let j = 0; j < initialArray.length - 1; j++) {
			const currentArray = get(sortedArray)
			if (!get(isPlaying)) return currentArray

			selectedIndex.set(j)

			if (currentArray[j] > currentArray[j + 1]) {
				sortedArray.swapAtIndexes(j, j + 1)
				selectedIndex.set(j + 1)
				swapped = true
			}

			await sleep(sleepTime)
		}

		if (!swapped) break
	}

	return get(sortedArray)
}
