<script lang="ts">
	export let styleProps = '';
	export let refFor = '';
</script>

<label for={refFor} class="btn {styleProps}">
	<slot />
</label>
