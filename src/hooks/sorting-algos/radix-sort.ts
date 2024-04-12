/*
	Radix sort algorithm.
	Time complexity: O(n+k)
	Space complexity: O(k)
	
  k = max(array)
  d = log_k(radix)+1

  for i in [0, d-1]:
    array = countingSort(array, base, i)

	return array
*/

import { get } from 'svelte/store'
import type { SortingAlgoRithm } from '../use-sorting'
import { sortedArray } from '../../stores/sorted-array'
import { isPlaying } from '../../stores/playing'
import { sleep } from '../../utils/sleep'
import { otherIndexes } from '../../stores/selected-index'

const BASE = 10

export const radixSort: SortingAlgoRithm = async (initialArray, sleepTime = 0) => {
	const countingSort = (exp: number) => {
		const count = new Array(BASE).fill(0)
		const output = new Array(initialArray.length).fill(0)

		for (let i = 0; i < initialArray.length; i++) {
			const j = Math.floor(get(sortedArray)[i] / exp) % BASE
			count[j]++
		}

		for (let i = 1; i < initialArray.length; i++) {
			count[i] += count[i - 1]
		}

		for (let i = initialArray.length - 1; i >= 0; i--) {
			const j = Math.floor(get(sortedArray)[i] / exp) % BASE
			output[count[j] - 1] = get(sortedArray)[i]
			count[j]--
		}

		for (let i = 0; i < initialArray.length; i++) {
			sortedArray.setAtIndex(i, output[i])
		}
	}

	let max = 0
	for (let i = 0; i < initialArray.length; i++) {
		max = Math.max(max, initialArray[i])
	}

	const maxDigits = Math.floor(Math.log(max) / Math.log(BASE)) + 1
	for (let i = 0; i < maxDigits; i++) {
		if (!get(isPlaying)) return get(sortedArray)

		const exp = Math.pow(BASE, i)
		countingSort(exp)

		otherIndexes.set(
			get(sortedArray)
				.filter((v) => (Math.floor(v / exp) % BASE) % 2 === 0)
				.map((v) => get(sortedArray).indexOf(v))
		)
		await sleep(sleepTime * 10)
	}

	return get(sortedArray)
}
