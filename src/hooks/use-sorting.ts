import { quickSort } from './sorting-algos/quick-sort'
import { mergeSort } from './sorting-algos/merge-sort'
import { bubbleSort } from './sorting-algos/bubble-sort'
import { shuffleSort } from './sorting-algos/shuffle-sort'

export type SortingAlgoRithm = (array: number[]) => number[]

// TODO: add more from https://en.wikipedia.org/wiki/Sorting_algorithm
export enum SortingAlgorithms {
	Quick = 'Quick Sort',
	Merge = 'Merge Sort',
	Bubble = 'Bubble Sort',
	Shuffle = 'Shuffle Sort',
}

const sortingAlgos = {
	[SortingAlgorithms.Bubble]: bubbleSort,
	[SortingAlgorithms.Merge]: mergeSort,
	[SortingAlgorithms.Quick]: quickSort,
	[SortingAlgorithms.Shuffle]: shuffleSort,
}

const getSortingAlgo = (algo: SortingAlgorithms) => sortingAlgos[algo]

const getRandomArray = (length: number, difference: number) => {
	const array = new Array(length).fill(0).map(() => Math.random() * 100)
	const mean = array.reduce((a, b) => a + b, 0) / array.length
	const sd = Math.sqrt(array.reduce((a, b) => a + (b - mean) * (b - mean), 0) / (array.length - 1))

	return array.map((n) => ((difference / 2) * (n - mean)) / sd + 50)
}

export const useSorting = () => ({
	getSortingAlgo,
	getRandomArray,
})
