import { writable } from 'svelte/store'

export const isPlaying = writable<boolean>(false)
