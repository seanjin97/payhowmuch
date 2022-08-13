<script lang="ts">
	import { isDarkBg } from '$lib/handlers/util';
	import type { StyleProps } from '$lib/types';

	export let abbrName: string;
	export let styleProps: StyleProps;
</script>

<div class="avatar placeholder">
	<div class="rounded-full w-8  cursor-default" style="background: {styleProps.primary}">
		<span class="text-xs {isDarkBg(styleProps.primary) ? 'text-white' : 'text-black'}"
			>{abbrName}</span
		>
	</div>
</div>
