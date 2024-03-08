/*
	Bubble sort algorithm.
	Time complexity: O(n^2)
	Space complexity: O(1)
	
	for i in [0, n-2]:
    min := i
		for j in [i+1, n-1]:
			if array[j] < array[min]:
				min = j
    swap(array[i], array[min])
	return array
*/

import { get } from 'svelte/store'
import type { SortingAlgoRithm } from '../use-sorting'
import { sortedArray } from '../../stores/sorted-array'
import { selectedIndex, otherIndexes } from '../../stores/selected-index'
import { isPlaying } from '../../stores/playing'
import { sleep } from '../../utils/sleep'

export const selectionSort: SortingAlgoRithm = async (initialArray, sleepTime = 0) => {
	for (let i = 0; i < initialArray.length - 1; i++) {
		const currentArray = get(sortedArray)
		if (!get(isPlaying)) return currentArray

		let min = i
		selectedIndex.set(min)
		for (let j = i + 1; j < initialArray.length; j++) {
			if (currentArray[j] < currentArray[min]) {
				min = j
			}
		}

		otherIndexes.set([min])
		await sleep(sleepTime)

		sortedArray.swapAtIndexes(i, min)
		selectedIndex.set(i)
		await sleep(sleepTime)
	}

	return get(sortedArray)
}
