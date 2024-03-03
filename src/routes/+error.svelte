<script>
	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';
	import Link from '../lib/components/Link.svelte';
	console.log($page);
	const { fallbackUrl } = $page.error;
	let { message } = $page.error;
	if (message == 'Not Found') message = "There's nothing here";
	else if ($page.status === 500) message = "Something went wrong..."
	let fallbackPath = fallbackUrl?.substring(1) || 'home page'
</script>

<div class="flex flex-col m-auto gap-y-9 h-3/4 justify-center text-center">
	<h2 class="font-bold h2 ">{$page.status || 404}</h2>
	<h3 class="font-semibold h3 ">{message}</h3>
	<Link href={fallbackUrl || '/'}>{`Back to ${fallbackPath}`}</Link>
</div>
