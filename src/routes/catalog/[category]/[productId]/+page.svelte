<script>
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import cartPlus from '$lib/assets/svg/cart-plus.svg';
	import img from '$lib/assets/svg/img.svg';
	import { fade } from 'svelte/transition';
	export let data;
	let product = data.fetchedProduct.products[0];
</script>

<div class="flex justify-center p-4">
	<div class="card grid gap-x-4 md:gap-y-4 p-4">
		<div class="w-[160px] md:w-[200px] place-self-center flex justify-center">
			{#await data.lazy.imgUrl}
				<div class="placeholder animate-pulse w-[200px] h-[160px]"></div>
			{:then data}
				{#if data.imgUrl}
					<div transition:fade={{ duration: 200 }}>
						<img class="rounded" src={product.imgUrl} alt="" />
					</div>
				{:else}
					<div
						transition:fade={{ duration: 200 }}
						class="variant-ghost-primary rounded-container-token w-full h-[100px] md:h-[140px] flex flex-col items-center justify-center"
					>
						<img class="h-2/5" src={img} alt="" />
						<span class="h6">No Image Available</span>
					</div>
				{/if}
			{/await}
		</div>

		<h6 class="h6 font-semibold self-center">{product.title}</h6>

		<span class="h6 font-semibold text-center self-center justify-self-center md:justify-self-end"
			>${product.price}</span
		>

		<img src={cartPlus} class="w-9 self-center justify-self-end md:hidden" alt="" />
		<button
			class="btn variant-filled-secondary hidden md:block w-fit justify-self-center font-semibold"
		>
			Add to cart
		</button>
	</div>
</div>

<style>
	.card {
		grid-template-columns: 200px 180px 80px;
		grid-template-rows: repeat(2, auto);
	}
	@media (max-width: 767px) {
		.card {
			grid-template-columns: 160px 1fr;
			grid-template-rows: 1fr 36px;
		}
	}
</style>
