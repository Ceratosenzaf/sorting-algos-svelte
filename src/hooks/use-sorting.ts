import { quickSort } from './sorting-algos/quick-sort'
import { mergeSort } from './sorting-algos/merge-sort'
import { bubbleSort } from './sorting-algos/bubble-sort'
import { shuffleSort } from './sorting-algos/shuffle-sort'
import { selectionSort } from './sorting-algos/selection-sort'
import { insertionSort } from './sorting-algos/insertion-sort'

export type SortingAlgoRithm = (array: number[], sleep: number) => Promise<number[]>

// TODO: add more from https://en.wikipedia.org/wiki/Sorting_algorithm
export enum SortingAlgorithms {
	Quick = 'Quick Sort',
	Merge = 'Merge Sort',
	Bubble = 'Bubble Sort',
	Shuffle = 'Shuffle Sort',
	Selection = 'Selection Sort',
	Insertion = 'Insertion Sort',
}

const sortingAlgos = {
	[SortingAlgorithms.Bubble]: bubbleSort,
	[SortingAlgorithms.Merge]: mergeSort,
	[SortingAlgorithms.Quick]: quickSort,
	[SortingAlgorithms.Shuffle]: shuffleSort,
	[SortingAlgorithms.Selection]: selectionSort,
	[SortingAlgorithms.Insertion]: insertionSort,
}

export const getSortingAlgo = (algo: SortingAlgorithms) => sortingAlgos[algo]
