<script>
	import { invalidateAll } from '$app/navigation';

	export let data;

	const properties = ['Firstname', 'Lastname', 'Username', 'Email', 'Created At', 'Role'];

	const logout = async () => {
		await fetch('http://localhost:8080/api/auth/logout', {
			method: 'POST',
			credentials: 'include'
		});
		await invalidateAll();
	};
</script>

<div class="flex-center">
	<div class="info grid grid-cols-2 gap-4 p-4 w-1/2 m-auto items-center">
		{#each properties as property}
			<div class="font-semibold">
				<span>{property}</span>
			</div>
			<div class="rounded-container-token variant-ghost-tertiary h-[40px] min-w-[40px] w-fit p-2">
				<span>
					{data.user[
						`${property.charAt(0).toLocaleLowerCase() + property.substring(1).split(' ').join('')}`
					]}
				</span>
			</div>
		{/each}
		<form method="POST" class="col-start-2 justify-self-end" on:submit|preventDefault={logout}>
			<button type="submit" class="btn variant-ghost-tertiary">Log out</button>
		</form>
	</div>
</div>
