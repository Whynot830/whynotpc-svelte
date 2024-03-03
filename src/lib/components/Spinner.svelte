<script>
	import cogwheel from '$lib/assets/svg/cogwheel-svgrepo-com.svg';
</script>

<div class="w-[60px]">
	<img src={cogwheel} alt="Loading..." class="spinner" />
</div>

<style>
	.spinner {
		animation: spinner ease-in-out infinite 3s;
	}
	@keyframes spinner {
		0% {
			transform: rotateZ(0deg);
		}
		100% {
			transform: rotateZ(360deg);
		}
	}
</style>
