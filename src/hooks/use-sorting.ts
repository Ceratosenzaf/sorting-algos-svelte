import { mergeSort } from './sorting-algos/merge-sort'
import { bubbleSort } from './sorting-algos/bubble-sort'
import { shuffleSort } from './sorting-algos/shuffle-sort'
import { selectionSort } from './sorting-algos/selection-sort'
import { insertionSort } from './sorting-algos/insertion-sort'
import { quickSort } from './sorting-algos/quick-sort'

export type SortingAlgoRithm = (array: number[], sleep: number) => Promise<number[]>

// TODO: add more from https://en.wikipedia.org/wiki/Sorting_algorithm
export enum SortingAlgorithms {
	Selection = 'Selection Sort',
	Insertion = 'Insertion Sort',
	Bubble = 'Bubble Sort',
	Merge = 'Merge Sort',
	Shuffle = 'Shuffle Sort',
	Quick = 'Quick Sort',
}

const sortingAlgos = {
	[SortingAlgorithms.Bubble]: bubbleSort,
	[SortingAlgorithms.Merge]: mergeSort,
	[SortingAlgorithms.Shuffle]: shuffleSort,
	[SortingAlgorithms.Selection]: selectionSort,
	[SortingAlgorithms.Insertion]: insertionSort,
	[SortingAlgorithms.Quick]: quickSort,
}

export type ImplementedSortingAlgo = keyof typeof sortingAlgos

export const isSortingAlgoImplemented = (algo: SortingAlgorithms) =>
	Object.keys(sortingAlgos).includes(algo)

export const getSortingAlgo = (algo: ImplementedSortingAlgo) => sortingAlgos[algo]
