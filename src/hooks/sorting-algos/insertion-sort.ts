/*
	Bubble sort algorithm.
	Time complexity: O(n^2)
	Space complexity: O(1)
	
	for i in [1, n-1]:
		for j in [i, 1]:
			if array[j] < array[j-1]:
        swap(array[j], array[j-1])
	return array
*/

import { get } from 'svelte/store'
import type { SortingAlgoRithm } from '../use-sorting'
import { sortedArray } from '../../stores/sorted-array'
import { selectedIndex, otherIndexes } from '../../stores/selected-index'
import { isPlaying } from '../../stores/playing'
import { sleep } from '../../utils/sleep'

export const insertionSort: SortingAlgoRithm = async (initialArray, sleepTime = 0) => {
	for (let i = 1; i < initialArray.length; i++) {
		if (!get(isPlaying)) return get(sortedArray)

		let finalIndex = i
		for (let j = i; j > 0; j--) {
			const currentArray = get(sortedArray)
			if (currentArray[j] < currentArray[j - 1]) {
				sortedArray.swapAtIndexes(j, j - 1)
				finalIndex = j - 1
			}
		}

		selectedIndex.set(i)
		otherIndexes.set([finalIndex])
		await sleep(sleepTime)
	}

	return get(sortedArray)
}
