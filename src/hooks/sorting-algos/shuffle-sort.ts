/*
	Shuffle sort algorithm.
	Time complexity: O(Infinity)
	Space complexity: O(1)
	
	while true:
		shuffle()
		if solved return
*/

import type { SortingAlgoRithm } from '../use-sorting'
import { sortedArray } from '../../stores/sorted-array'
import { get } from 'svelte/store'
import { sleep } from '../../utils/sleep'
import { isPlaying } from '../../stores/playing'

export const shuffleSort: SortingAlgoRithm = async (initialArray, sleepTime = 0) => {
	const isSolved = () => {
		const currentArray = get(sortedArray)
		for (let i = 0; i < initialArray.length - 1; i++)
			if (currentArray[i] > currentArray[i + 1]) return false

		return true
	}

	while (get(isPlaying)) {
		for (let i = initialArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			sortedArray.swapAtIndexes(i, j)
		}

		if (isSolved()) break

		await sleep(sleepTime)
	}

	return get(sortedArray)
}
