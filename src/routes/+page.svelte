<script>
  import { useSorting } from '../hooks/use-sorting'  
  const { getRandomArray } = useSorting()
  const array = getRandomArray(100)
</script>

<h1>Welcome to SvelteKit</h1>
<p>{array}</p>
