<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	interface Option {
		value: any
		label: string
	}

	export let options: Option[] = []
	export let placeholder: string
	export let selected: Option['value'] = ''

	const dispatch = createEventDispatcher<{ change: Option['value'] }>()
	$: dispatch('change', selected)
</script>

<select
	class="px-4 py-2 max-w-xs mx-auto w-full rounded-md border-r-[16px] border-r-transparent"
	bind:value={selected}
>
	{#if placeholder}
		<option value="" disabled selected>{placeholder}</option>
	{/if}
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
