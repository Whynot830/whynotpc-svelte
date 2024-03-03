<script>
	import Link from './../../../lib/components/Link.svelte';
	import { fade } from 'svelte/transition';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { invalidateAll } from '$app/navigation';
	import cross from '$lib/assets/svg/cross.svg';
	import trashcan from '$lib/assets/svg/trashcan.svg';
	import transition from '$lib/transition';

	export let data;

	let state = 'idle';

	const toastStore = getToastStore();
	const errorToast = {
		message: 'Something went wrong. Try later',
		timeout: 3000,
		background: 'variant-filled-error'
	};
	const invalidAmountToast = {
		...errorToast,
		message: 'Quantity must be number between 1 and 10'
	};
	const itemDeletedToast = {
		...errorToast,
		message: 'Item deleted',
		background: 'variant-filled-tertiary'
	};
	const cartClearedToast = {
		...itemDeletedToast,
		message: 'Cart cleared'
	};

	const modalStore = getModalStore();
	const clearConfirmationModal = {
		type: 'confirm',
		title: 'Please confirm',
		body: 'Do you want to clear the cart?',
		response: (r) => {
			if (r) clearCart();
		}
	};
	const checkoutConfirmationModal = {
		...clearConfirmationModal,
		body: 'Do you want to submit your order?',
		response: (r) => {
			if (r) checkout();
		}
	};
	const checkoutSuccessModal = {
		type: 'alert',
		title: 'Successful checkout',
		body: 'See more details in e-mail',
		buttonTextCancel: 'Ok'
	};

	const updateItemQuantity = async (id, quantity) => {
		if (quantity <= 0 || quantity > 10) toastStore.trigger(invalidAmountToast);
		try {
			const response = await fetch(
				`http://localhost:8080/api/cart/items/${id}?quantity=${quantity}`,
				{
					method: 'PATCH',
					credentials: 'include'
				}
			);
			if (!response.ok) {
				if (response.status === 400) toastStore.trigger(invalidAmountToast);
				else toastStore.trigger(errorToast);
			}
		} catch (error) {
			console.error(error);
		}
		await invalidateAll();
	};

	const deleteFromCart = async (id) => {
		try {
			const response = await fetch(`http://localhost:8080/api/cart/items/${id}`, {
				method: 'DELETE',
				credentials: 'include'
			});
			if (response.ok) toastStore.trigger(itemDeletedToast);
			else toastStore.trigger(errorToast);
		} catch (error) {
			console.error(error);
		}
		await invalidateAll();
	};
	const clearCart = async () => {
		try {
			const response = await fetch('http://localhost:8080/api/cart/items', {
				method: 'DELETE',
				credentials: 'include'
			});
			if (response.ok) toastStore.trigger(cartClearedToast);
			else toastStore.trigger(errorToast);
		} catch (error) {
			console.error(error);
		}
		await invalidateAll();
	};

	const checkout = async () => {
		transition(() => (state = 'loading'));
		try {
			const response = await fetch('http://localhost:8080/api/cart/checkout', {
				method: 'POST',
				credentials: 'include'
			});
			transition(() => (state = 'idle'));
			if (response.ok) {
				modalStore.trigger(checkoutSuccessModal);
			}
		} catch (error) {
			console.error(error);
		}
		await invalidateAll();
	};
</script>

<div class="p-4 flex flex-col gap-y-4 items-center justify-center">
	{#if data.fetchedCart.items.length > 0}
		<table out:fade={{ duration: 200 }} class="table table-compact max-w-[750px] text-center">
			<thead>
				<th> <h6 class="h6">Title</h6></th>
				<th> <h6 class="h6">Quantity</h6></th>
				<th> <h6 class="h6">Price, USD $</h6></th>
				<th>
					<form
						class="flex justify-center w-9"
						on:submit|preventDefault={() => modalStore.trigger(clearConfirmationModal)}
					>
						<button class="w-9">
							<img src={trashcan} alt="X" />
						</button>
					</form>
				</th>
			</thead>
			<tbody>
				{#each data.fetchedCart.items as item, i (i)}
					<tr>
						<td class="!align-middle !whitespace-normal">
							<span class="h6">{item.product.title}</span>
						</td>
						<td class="!align-middle table-cell-fit">
							<input
								on:change={(event) => updateItemQuantity(item.id, event.target.value)}
								class="input"
								type="number"
								value={item.quantity}
								max="10"
								min="1"
								on:keydown|preventDefault
							/>
						</td>
						<td class="!align-middle">
							<span class="h6">{item.product.price}</span>
						</td>
						<td class="!align-middle">
							<form
								class="flex justify-center w-9"
								on:submit|preventDefault={() => deleteFromCart(item.id)}
							>
								<button>
									<img src={cross} alt="X" />
								</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>

			<tfoot>
				<tr class="text-tertiary-400 font-semibold">
					<td></td>
					<td class="text-center">
						<span class="h6">Total</span>
					</td>
					<td class="text-center w-[150px]">
						<span class="h6">USD ${data.fetchedCart.total}</span>
					</td>
					<td></td>
				</tr>
			</tfoot>
		</table>
		<form
			class="col-start-2 justify-self-end"
			on:submit|preventDefault={() => modalStore.trigger(checkoutConfirmationModal)}
		>
			<button data-state={state} class="btn variant-filled-secondary w-fit self-end">
				{state === 'loading' ? 'Loading...' : 'Checkout'}
			</button>
		</form>
	{:else}
		<div in:fade={{ duration: 200, delay: 200 }} class="flex flex-col mt-40">
			<h4 class="h4 text-center font-semibold mb-10">Seems like your cart is empty</h4>
			<Link href="catalog">Back to catalog</Link>
		</div>
	{/if}
</div>

<style>
	table th,
	td {
		padding: 12px;
	}
</style>
