<script lang="ts">
	import { user } from '$lib/firebase';
</script>

{#if $user}
	<slot />
{:else}
	<p class="text-error flex flex-col items-center justify-center gap-5">
		You must be signed in to view this page.
		<a class="btn btn-primary w-fit" href="/login">Sign in</a>
	</p>
{/if}
