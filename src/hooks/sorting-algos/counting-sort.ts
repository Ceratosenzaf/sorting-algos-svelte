/*
	Counting sort algorithm.
	Time complexity: O(n+k)
	Space complexity: O(k)
	
  M = max(array)
  m = min(array)
  k = M - m

  count = new array(k+1)
  for i in [0, n-1]:
    j = array[i] - m
    count[j]++
  
  j = 0
  for i in [0, k-1]:
    while count[i] > 0:
      array[j] = i + m
      count[i]--
      j++

	return array
*/

import { get } from 'svelte/store'
import type { SortingAlgoRithm } from '../use-sorting'
import { sortedArray } from '../../stores/sorted-array'
import { selectedIndex } from '../../stores/selected-index'
import { isPlaying } from '../../stores/playing'
import { sleep } from '../../utils/sleep'

export const countingSort: SortingAlgoRithm = async (initialArray, sleepTime = 0) => {
	let min = Infinity
	let max = 0

	for (let i = 0; i < initialArray.length; i++) {
		min = Math.min(min, initialArray[i])
		max = Math.max(max, initialArray[i])
	}

	const k = max - min + 1
	const count = new Array(k).fill(0)

	for (let i = 0; i < initialArray.length; i++) {
		count[initialArray[i] - min]++
	}

	let j = 0
	for (let i = 0; i < k; i++) {
		while (count[i] > 0) {
			if (!get(isPlaying)) return get(sortedArray)

			sortedArray.setAtIndex(j, i + min)
			count[i]--
			j++

			selectedIndex.set(j - 1)
			await sleep(sleepTime)
		}
	}

	return get(sortedArray)
}
