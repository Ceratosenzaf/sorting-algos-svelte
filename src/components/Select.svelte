<script lang="ts">
	import classNames from 'classnames'
	import { createEventDispatcher } from 'svelte'

	interface Option {
		value: any
		label: string
	}

	export let options: Option[] = []
	export let placeholder: string
	export let selected: Option['value'] = ''
	export let error = false

	const dispatch = createEventDispatcher<{ change: Option['value'] }>()
	$: dispatch('change', selected)
</script>

<select
	class={classNames(
		'px-4 py-2 max-w-xs mx-auto w-full rounded-md border-r-[16px] bg-gray-100 border-r-transparent',
		{ 'outline outline-rose-700 text-rose-700': error }
	)}
	bind:value={selected}
>
	{#if placeholder}
		<option class="text-slate-700" value="" disabled selected>{placeholder}</option>
	{/if}
	{#each options as option}
		<option class="text-slate-700" value={option.value}>{option.label}</option>
	{/each}
</select>
