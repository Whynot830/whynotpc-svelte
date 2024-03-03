<script>
	import { page } from '$app/stores';
	import transition from '$lib/transition';
	import { onMount } from 'svelte';
	import cartPlus from '$lib/assets/svg/cart-plus.svg';
	import img from '$lib/assets/svg/img.svg';
	import { products } from '../../../stores/products';
	import { fade } from 'svelte/transition';
	import { getToastStore, getModalStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import Spinner from '$lib/components/Spinner.svelte';
	import Link from '../../../lib/components/Link.svelte';
	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const unauthorizedAccessModal = {
		type: 'confirm',
		title: 'Authentication required',
		body: 'You must be logged in to add items to your cart',
		buttonTextConfirm: 'Sign in',
		buttonTextCancel: 'Later',
		response: (r) => {
			if (r) goto('/auth?redirect=/catalog/storage');
		}
	};

	const addedProductToast = {
		message: 'Product added to cart',
		timeout: 3000,
		background: 'variant-filled-tertiary'
	};

	export let data;
	const { category } = data;
	let isLoading = true;

	let currPage = 0;
	let sort = 'price';
	let order = 'asc';
	let fetchedProducts;
	// $: transition(() => (fetchedProducts = $products));
	$: fetchedProducts = $products;

	const getImage = async (product) => {
		try {
			const response = await fetch(`http://localhost:8080/api/images/${product.imgName}`);

			if (!response.ok)
				return {
					...product,
					isLoaded: true,
					imgUrl: null
				};
			const imgData = await response.blob();
			const imgUrl = URL.createObjectURL(imgData);
			return {
				...product,
				isLoaded: true,
				imgUrl
			};
		} catch (error) {
			console.error(error);
		}
	};
	const getImages = async () => {
		const fetchedProductsCopy = [...fetchedProducts];
		for (let i = 0; i < fetchedProductsCopy.length; i++) {
			fetchedProductsCopy[i] = await getImage(fetchedProductsCopy[i]);
			products.set(fetchedProductsCopy);
		}
	};
	const getProducts = async () => {
		console.log('Fetching products');
		try {
			const response = await fetch(
				`http://localhost:8080/api/products?category=${category.name}&page=${currPage}&sort=${sort}&order=${order}`
			);

			const data = await response.json();
			fetchedProducts = data.products.map((p) => ({
				...p,
				isLoaded: false
			}));
			products.set(fetchedProducts);
			transition(() => (isLoading = false));
			getImages();
		} catch (error) {
			console.error(error);
		}
	};
	const addToCart = async (id) => {
		try {
			const response = await fetch(`http://localhost:8080/api/cart/items?productId=${id}`, {
				method: 'POST',
				credentials: 'include'
			});
			if (response.ok) toastStore.trigger(addedProductToast);
			else if (response.status === 401) modalStore.trigger(unauthorizedAccessModal);
		} catch (error) {
			console.log(error);
		}
	};
	onMount(async () => {
		if ($products.length == 0) await getProducts();
		else isLoading = false;
	});
</script>

<div class="p-4 h-full flex justify-center">
	{#if isLoading}
		<div class="self-center mb-[160px]">
			<Spinner />
		</div>
	{:else if !isLoading && fetchedProducts.length > 0}
		<div class="card p-2 top-[80px] flex flex-col hidden md:block fixed left-0">
			<ul>
				<li>
					<span class="h6">Sort by</span>
					<select on:change={getProducts} bind:value={sort} class="select">
						<option value="price">Price</option>
						<option value="title">Title</option>
					</select>
				</li>
				<li>
					<span class="h6">Order</span>
					<select on:change={getProducts} bind:value={order} class="select">
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>
				</li>
				<li>
					<span class="h6"></span>
				</li>
			</ul>
		</div>
		<div class="max-w-lg flex flex-col min-w-[320px] md:max-w-[800px] gap-4">
			{#each fetchedProducts as product (product.id)}
				<div class="card grid gap-x-4 md:gap-y-4 p-4">
					<div class="w-[160px] md:w-[200px] place-self-center flex justify-center">
						{#if !product.isLoaded}
							<div class="placeholder animate-pulse w-full h-[100px] md:h-[140px]"></div>
						{:else if product.imgUrl != null}
							<div out:fade={{ duration: 200 }}>
								<img class="rounded" src={product.imgUrl} alt="" />
							</div>
						{:else}
							<div
								in:fade={{ duration: 200 }}
								class="variant-ghost-primary rounded-container-token w-full h-[100px] md:h-[140px] flex flex-col items-center justify-center"
							>
								<img class="h-2/5" src={img} alt="" />
								<h6 class="h6">No Image Available</h6>
							</div>
						{/if}
					</div>

					<a href={`/catalog/${category.name}/${product.id}`} class="h6 font-semibold self-center"
						>{product.title}</a
					>
					<h6
						class="h6 font-semibold text-center self-center justify-self-center md:justify-self-end"
					>
						${product.price}
					</h6>
					<form
						class="col-start-2 justify-self-end"
						on:submit|preventDefault={() => addToCart(product.id)}
					>
						<button class="w-9 self-center justify-self-end md:hidden">
							<img src={cartPlus} class="" alt="" />
						</button>
						<button
							class="btn variant-filled-secondary hidden md:block w-fit justify-self-center font-semibold"
						>
							Add to cart
						</button>
					</form>
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex flex-col mt-40">
			<h4 class="h4 text-center font-semibold mb-2">Seems like there are no items</h4>
			<h4 class="h4 text-center font-semibold mb-10">
				in category '{category.name.toLocaleUpperCase()}'
			</h4>
			<Link href="/catalog">Back to categories</Link>
		</div>
	{/if}
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
