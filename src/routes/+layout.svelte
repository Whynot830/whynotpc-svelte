<script>
	import ViewTransition from '@components/ViewTransition.svelte';
	import '../app.postcss';
	import { page } from '$app/stores';
	import {
		AppShell,
		AppBar,
		Avatar,
		storePopup,
		Toast,
		Modal,
		initializeStores
	} from '@skeletonlabs/skeleton';
	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';
	// Floating UI for Popups
	import '../global.css';
	import { computePosition, autoUpdate, shift, offset, arrow } from '@floating-ui/dom';
	import cart from '$lib/assets/svg/cart.svg';
	import chevron from '$lib/assets/svg/chevron-left.svg';
	import { afterNavigate } from '$app/navigation';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	let innerWidth;
	let pageTitle;
	export let data;
	$: {
		pageTitle = $page?.route?.id?.substring(1) || '';
		if (pageTitle == 'auth') pageTitle = '';
		else {
			let index = pageTitle.indexOf('/');
			if (index !== -1) pageTitle = pageTitle.substring(index + 1);
			if (pageTitle == '[category]') pageTitle = data.category;
			if (pageTitle == '[category]/[productId]') pageTitle = '';
		}
	}

	const modalTransitionParams = {
		x: 0,
		y: -50,
		duration: 200
	};

	afterNavigate((params) => {
		const isNewPage = params.from?.url.pathname !== params.to?.url.pathname;
		const elemPage = document.querySelector('#page');
		if (isNewPage && elemPage !== null) {
			elemPage.scrollTop = 0;
		}
	});
</script>

<svelte:head>
	<title>whynotPC</title>
</svelte:head>
<svelte:window bind:innerWidth />
<ViewTransition />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			class="sm:px-20 xl:px-56 h-[80px] justify-center border-b border-tertiary-600"
			gridColumns="grid-cols-3"
			slotTrail="place-self-end"
			slotDefault="place-self-center"
		>
			<svelte:fragment slot="lead">
				<a href="/" class="flex h5 font-bold">
					<span>WHYNOT</span>
					<span class="text-secondary-500">PC</span>
				</a>
			</svelte:fragment>
			{#if innerWidth > 480}
				<h6 class="uppercase font-semibold h6">{pageTitle}</h6>
			{/if}

			<svelte:fragment slot="trail">
				<div class="flex gap-x-5 md:gap-x-10 justify-center place-items-center">
					{#if $page.route.id != '/auth'}
						{#if pageTitle != '' && pageTitle != 'profile'}
							<button class="w-9" on:click={() => history.back()}>
								<img src={chevron} alt="<" />
							</button>
						{/if}
						{#if pageTitle !== 'cart'}
							<a href="/cart" class="w-9">
								<img src={cart} alt="" />
							</a>
						{/if}
						<a href="/profile">
							<Avatar initials="WN" width="w-11" fill="fill-secondary-500" cursor="cursor-pointer"
							></Avatar>
						</a>
					{/if}
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<!-- <svelte:fragment slot="pageFooter">Footer</svelte:fragment> -->
</AppShell>
<Modal transitionInParams={modalTransitionParams} transitionOutParams={modalTransitionParams} />
<Toast width="max-w-[350px]" position="t" max="3" />
