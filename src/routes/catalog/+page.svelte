<script>
	import Link from '$lib/components/Link.svelte';
	export let data;
</script>

<div class="p-4 flex flex-col items-center">
	{#if data.categories.length > 0}
		<h5 class="h5 mb-10 font-semibold">CATEGORIES</h5>
		<ul class="list-nav">
			{#each data.categories as category}
				<li>
					<a class="h6 transition text-tertiary-400 font-semibold" href={`/catalog/${category.name}`}>
						{category.name.toLocaleUpperCase()}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="flex flex-col mt-40">
			<h4 class="h4 text-center font-semibold mb-10">Seems like there are no categories</h4>
			<Link href="/">Back to main page</Link>
		</div>
	{/if}
</div>