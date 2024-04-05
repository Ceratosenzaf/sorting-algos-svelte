/*
	Heap sort algorithm.
	Time complexity: O(nlogn)
	Space complexity: O(1)
	
	func heapSort(array):
    start = parent(n)
    end = n
    while end > 1:
      if start > 0:
        start--
      else:
        end--
        swap(array[end], array[0])
      root = start
      while hasChildren(root):
        child = maxChild(root)
        if array[root] < array[child]:
          swap(array[root], array[child])
          root = child
        else:
          break
    return array
*/

import { get } from 'svelte/store'
import type { SortingAlgoRithm } from '../use-sorting'
import { sortedArray } from '../../stores/sorted-array'
import { selectedIndex, otherIndexes } from '../../stores/selected-index'
import { isPlaying } from '../../stores/playing'
import { sleep } from '../../utils/sleep'

export const heapSort: SortingAlgoRithm = async (array, sleepTime = 0) => {
	const heapSortAlgo = async () => {
		let start = parent(array.length)
		let end = array.length

		while (end > 1) {
			if (start > 0) start--
			else {
				end--
				sortedArray.swapAtIndexes(end, 0)
			}

			let root = start
			otherIndexes.set([root])
			await sleep(sleepTime)
			while (leftChild(root) < end) {
				if (!get(isPlaying)) return
				const currentArray = get(sortedArray)

				const l = leftChild(root)
				const r = rightChild(root)
				const child = r < end && currentArray[l] < currentArray[r] ? r : l

				if (currentArray[root] >= currentArray[child]) break

				sortedArray.swapAtIndexes(root, child)
				root = child

				selectedIndex.set(end)
				otherIndexes.set([root, child])
				await sleep(sleepTime)
			}
		}
	}

	const parent = (i: number) => Math.floor((i - 1) / 2)
	const leftChild = (i: number) => i * 2 + 1
	const rightChild = (i: number) => i * 2 + 2

	await heapSortAlgo()

	return get(sortedArray)
}
