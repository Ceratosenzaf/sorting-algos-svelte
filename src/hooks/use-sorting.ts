import { quickSort } from './sorting-algos/quick-sort'
import { mergeSort } from './sorting-algos/merge-sort'
import { bubbleSort } from './sorting-algos/bubble-sort'
import { shuffleSort } from './sorting-algos/shuffle-sort'
import { selectionSort } from './sorting-algos/selection-sort'

export type SortingAlgoRithm = (array: number[], sleep: number) => Promise<number[]>

// TODO: add more from https://en.wikipedia.org/wiki/Sorting_algorithm
export enum SortingAlgorithms {
	Quick = 'Quick Sort',
	Merge = 'Merge Sort',
	Bubble = 'Bubble Sort',
	Shuffle = 'Shuffle Sort',
	Selection = 'Selection Sort',
}

const sortingAlgos = {
	[SortingAlgorithms.Bubble]: bubbleSort,
	[SortingAlgorithms.Merge]: mergeSort,
	[SortingAlgorithms.Quick]: quickSort,
	[SortingAlgorithms.Shuffle]: shuffleSort,
	[SortingAlgorithms.Selection]: selectionSort,
}

export const getSortingAlgo = (algo: SortingAlgorithms) => sortingAlgos[algo]
