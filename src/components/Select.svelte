<script lang="ts">
	import classNames from 'classnames'
	import { createEventDispatcher } from 'svelte'

	interface Option {
		value: any
		label: string
		disabled?: boolean
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
		'px-4 py-2 max-w-xs mx-auto w-full rounded-md border-r-[16px] hover:outline focus:outline outline-txt bg-light-gray border-r-transparent',
		{ 'outline !outline-error text-error': error }
	)}
	bind:value={selected}
>
	{#if placeholder}
		<option class="text-txt" value="" disabled selected>{placeholder}</option>
	{/if}
	{#each options as option}
		<option
			class="text-txt"
			value={option.value}
			disabled={option.disabled}
			title={option.disabled ? 'not implemented yet' : undefined}>{option.label}</option
		>
	{/each}
</select>
