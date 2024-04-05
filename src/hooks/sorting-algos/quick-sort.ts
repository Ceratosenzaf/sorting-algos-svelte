/*
	Quick sort algorithm.
	Avg time complexity: O(nlogn)
  Max time complexity: O(n^2)
	Space complexity: O(1)
	
	func quickSort(array, l=0, r=len(array)-1):
    if l < r:
      p = partition(array, l, r)
      quickSort(array, l, p-1)
      quickSort(array, p+1, r)
    return array

	func partition(array, l, r):
    p = random(l, r) | l | r | midpoint(l, r)
    i = l-1 

    for j in [l, r]:
      if array[j] > array[p]:
        i++
        swap(array[i], array[j])

    swap(array[i+1], array[p])
    return i+1
*/

import { get } from 'svelte/store'
import type { SortingAlgoRithm } from '../use-sorting'
import { sortedArray } from '../../stores/sorted-array'
import { selectedIndex, otherIndexes } from '../../stores/selected-index'
import { isPlaying } from '../../stores/playing'
import { sleep } from '../../utils/sleep'

export const quickSort: SortingAlgoRithm = async (array, sleepTime = 0) => {
	const quickSortAlgo = async (l: number, r: number) => {
		if (!get(isPlaying)) return
		if (l < r) {
			const p = await partition(l, r)
			await quickSortAlgo(l, p - 1)
			await quickSortAlgo(p + 1, r)
		}
	}

	const partition = async (l: number, r: number) => {
		const pivot = r
		let i = l - 1

		selectedIndex.set(pivot)
		await sleep(sleepTime)

		for (let j = l; j <= r; j++) {
			const currentArray = get(sortedArray)
			if (!get(isPlaying)) return -1

			if (currentArray[j] < currentArray[pivot]) {
				i++
				sortedArray.swapAtIndexes(i, j)
			}

			otherIndexes.set([i, j])
			await sleep(sleepTime)
		}

		sortedArray.swapAtIndexes(i + 1, r)
		return i + 1
	}

	await quickSortAlgo(0, array.length - 1)

	return get(sortedArray)
}
