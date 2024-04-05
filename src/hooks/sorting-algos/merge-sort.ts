/*
	Merge sort algorithm.
	Time complexity: O(nlogn)
	Space complexity: O(1)
	
	func mergeSort(array, l=0, r=len(array)-1):
		if l < r:
			m = (l + r) / 2
			mergeSort(array, l, m)
			mergeSort(array, m + 1, r)
			return merge(array, l, m, r)
		return array

	func merge(a, l, m, r):
		i = l
		j = m + 1
		k = 0
		b = new array[r - l + 1]

		while i <= m && j <= r:
			if a[i] < a[j]:
				b[k] = a[i]
				i++
			else:
				b[k] = a[j]
				j++
			k++
		
		while i <= m:
			b[k] = a[i]
			i++
			k++
		
		while j <= r:
			b[k] = a[j]
			j++
			k++
		
		for k in [l, r]:
			a[k] = b[k - l]
		
		return a
*/

import type { SortingAlgoRithm } from '../use-sorting'
import { sortedArray } from '../../stores/sorted-array'
import { selectedIndex } from '../../stores/selected-index'
import { isPlaying } from '../../stores/playing'
import { sleep } from '../../utils/sleep'
import { get } from 'svelte/store'

export const mergeSort: SortingAlgoRithm = async (array, sleepTime = 0) => {
	const mergeSortAlgo = async (l: number, r: number) => {
		if (!get(isPlaying)) return
		if (l < r) {
			const m = Math.floor((l + r) / 2)
			await mergeSortAlgo(l, m)
			await mergeSortAlgo(m + 1, r)
			await merge(l, m, r)
		}
	}

	const merge = async (l: number, m: number, r: number) => {
		let i = l
		let j = m + 1
		let k = 0
		const b = new Array(r - l + 1)

		while (i <= m && j <= r) {
			const currL = get(sortedArray)[i]
			const currR = get(sortedArray)[j]
			if (currL < currR) {
				b[k] = currL
				i++
			} else {
				b[k] = currR
				j++
			}
			k++
		}

		while (i <= m) {
			b[k] = get(sortedArray)[i]
			i++
			k++
		}

		while (j <= r) {
			b[k] = get(sortedArray)[j]
			j++
			k++
		}

		for (let k = l; k <= r; k++) {
			if (!get(isPlaying)) return
			sortedArray.setAtIndex(k, b[k - l])
			selectedIndex.set(k)
			await sleep(sleepTime)
		}
	}

	await mergeSortAlgo(0, array.length - 1)

	return get(sortedArray)
}
