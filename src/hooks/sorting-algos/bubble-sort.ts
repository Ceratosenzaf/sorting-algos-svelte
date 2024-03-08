/*
	Bubble sort algorithm.
	Time complexity: O(n^2)
	Space complexity: O(1)
	
	for i in [0, n-2]:
		for j in [i, n-1]:
			if array[i] > array[j]:
				swap(array[i], array[j])
	return array
*/

import { get } from 'svelte/store'
import type { SortingAlgoRithm } from '../use-sorting'
import { sortedArray } from '../../stores/sorted-array'
import { otherIndexes, selectedIndex } from '../../stores/selected-index'
import { isPlaying } from '../../stores/playing'
import { sleep } from '../../utils/sleep'

export const bubbleSort: SortingAlgoRithm = async (initialArray, sleepTime = 0) => {
	for (let i = 0; i < initialArray.length - 1; i++) {
		let swapped = false
		selectedIndex.set(i)

		for (let j = i + 1; j < initialArray.length; j++) {
			const currentArray = get(sortedArray)
			if (!get(isPlaying)) return currentArray

			otherIndexes.set([j])

			if (currentArray[i] > currentArray[j]) {
				sortedArray.swapAtIndexes(i, j)
				swapped = true
			}

			await sleep(sleepTime)
		}

		if (!swapped) break
	}

	return get(sortedArray)
}
