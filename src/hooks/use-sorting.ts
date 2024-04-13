import { mergeSort } from './sorting-algos/merge-sort'
import { bubbleSort } from './sorting-algos/bubble-sort'
import { shuffleSort } from './sorting-algos/shuffle-sort'
import { selectionSort } from './sorting-algos/selection-sort'
import { insertionSort } from './sorting-algos/insertion-sort'
import { quickSort } from './sorting-algos/quick-sort'
import { heapSort } from './sorting-algos/heap-sort'
import { countingSort } from './sorting-algos/counting-sort'
import { radixSort } from './sorting-algos/radix-sort'

export type SortingAlgoRithm = (array: number[], sleep: number) => Promise<number[]>

// TODO: add more from https://en.wikipedia.org/wiki/Sorting_algorithm
export enum SortingAlgorithms {
	Shuffle = 'Shuffle Sort',
	Selection = 'Selection Sort',
	Insertion = 'Insertion Sort',
	Bubble = 'Bubble Sort',
	Merge = 'Merge Sort',
	Quick = 'Quick Sort',
	Heap = 'Heap Sort',
	Counting = 'Counting Sort',
	Radix = 'Radix Sort',
}

const IntOnlySortingAlgos: SortingAlgorithms[] = [
	SortingAlgorithms.Counting,
	SortingAlgorithms.Radix,
]

const sortingAlgos = {
	[SortingAlgorithms.Bubble]: bubbleSort,
	[SortingAlgorithms.Merge]: mergeSort,
	[SortingAlgorithms.Shuffle]: shuffleSort,
	[SortingAlgorithms.Selection]: selectionSort,
	[SortingAlgorithms.Insertion]: insertionSort,
	[SortingAlgorithms.Quick]: quickSort,
	[SortingAlgorithms.Heap]: heapSort,
	[SortingAlgorithms.Counting]: countingSort,
	[SortingAlgorithms.Radix]: radixSort,
}

export type ImplementedSortingAlgo = keyof typeof sortingAlgos

export const isSortingAlgoImplemented = (algo: SortingAlgorithms) =>
	Object.keys(sortingAlgos).includes(algo)

export const isSortingAlgoIntOnly = (algo: SortingAlgorithms) => IntOnlySortingAlgos.includes(algo)

export const getSortingAlgo = (algo: ImplementedSortingAlgo) => sortingAlgos[algo]

export const MAX_ARRAY_VALUE = 1000000
