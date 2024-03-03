<script>
	import { redirect } from '@sveltejs/kit';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import transition from '$lib/transition'
	const toastStore = getToastStore();

	let firstname = '';
	let lastname = '';
	let username = '';
	let email = '';
	let password = '';
	let passwordConfirmation = '';
	let isSigningUp = false;
	let state = 'idle';
	let passwordsMatchError = false;
	let customClass;
	$: customClass = passwordsMatchError ? 'variant-ghost-error' : '';

	const invalidCredentialsToast = {
		message: 'Invalid credentials. Try again',
		timeout: 3000,
		background: 'bg-error-500'
	};
	const conflictToast = {
		...invalidCredentialsToast,
		message: 'Username or email already taken'
	};
	const errorToast = {
		...invalidCredentialsToast,
		message: 'Something went wrong. Try again later'
	};

	const toggle = () => {
		transition(() => (isSigningUp = !isSigningUp));
	};

	const signIn = async () => {
		transition(() => (state = 'loading'));
		try {
			const response = await fetch('http://localhost:8080/api/auth/login', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username,
					password
				})
			});
			if (response.status == 401) {
				toastStore.trigger(invalidCredentialsToast);
			} else if (response.ok) {
				const params = new URLSearchParams(location.search);
				const redirectTo = params.get('redirect') || '/';
				goto(redirectTo);
			} else {
				toastStore.trigger(errorToast);
			}
		} catch (error) {
			console.error(error);
		}
		transition(() => (state = 'idle'));
	};

	const signUp = async () => {
		if (password !== passwordConfirmation) {
			transition(() => (passwordsMatchError = true));
			setTimeout(() => {
				transition(() => (passwordsMatchError = false));
			}, 3000);
			return;
		}
		transition(() => (state = 'loading'));
		try {
			let userDTO = {
				firstname,
				lastname,
				username,
				email,
				password
			};
			let formData = new FormData();
			formData.append('userDTO', new Blob([JSON.stringify(userDTO)], { type: 'application/json' }));

			const response = await fetch('http://localhost:8080/api/auth/register', {
				method: 'POST',
				credentials: 'include',
				body: formData
			});

			if (response.status == 409) {
				toastStore.trigger(conflictToast);
				transition(() => (state = 'idle'));
			} else if (response.ok) {
				location.reload()
			} else toastStore.trigger(errorToast);
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div class="max-w-[450px] mx-auto mt-[2rem]">
	<form on:submit|preventDefault={isSigningUp ? signUp : signIn} class="flex flex-col gap-4 p-4">
		<span class="h2 font-semibold">
			{#if isSigningUp}
				Sign Up
			{:else}
				Sign In
			{/if}
		</span>

		{#if isSigningUp}
			<input required class="input" bind:value={firstname} placeholder="Firstname" />
			<input required class="input" bind:value={lastname} placeholder="Lastname" />
		{/if}

		<input
			required
			class="input"
			bind:value={username}
			placeholder={isSigningUp ? 'Username' : 'Username or email'}
		/>

		{#if isSigningUp}
			<input required type="email" class="input" bind:value={email} placeholder="Email" />
		{/if}

		<input required type="password" class="input" bind:value={password} placeholder="Password" />

		{#if isSigningUp}
			<input
				required
				type="password"
				class="input {customClass}"
				bind:value={passwordConfirmation}
				placeholder="Password confirmation"
			/>

			<div class="h-6">
				{#if passwordsMatchError}
					<span class="text-error-600">Passwords do not match</span>
				{/if}
			</div>
		{/if}

		<button type="button" class="font-semibold cursor-pointer w-fit" on:click={toggle}>
			{isSigningUp ? 'Already have an account?' : "Don't have an account yet?"}
		</button>
		<button data-state={state} type="submit" class="btn variant-filled">
			{#if state === 'idle'}
				{isSigningUp ? 'Sign Up' : 'Sign In'}
			{:else if state === 'loading'}
				Loading...
			{/if}
		</button>
	</form>
</div>
