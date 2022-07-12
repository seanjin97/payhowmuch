<script lang="ts">
	export let styleProps = '';
	export let type = '';
</script>

<button class="btn {styleProps}" {type} on:click|preventDefault>
	<slot />
</button>
