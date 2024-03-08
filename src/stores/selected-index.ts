import { writable } from 'svelte/store'

export const selectedIndex = writable<number | null>(null)

export const otherIndexes = writable<number[]>([])
