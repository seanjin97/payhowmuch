<script lang="ts">
	import { priceFormatter } from '$lib/handlers/util';

	import type { SharingItem } from '$lib/types';
	export let sharedItem: SharingItem;
</script>

<div class="flex justify-between p-2 items-center">
	<div>
		<div class="flex items-center">
			<i class="fa-solid fa-people-group mr-1" />
			<p>{sharedItem.name}</p>
		</div>
	</div>
	<div>
		<p>
			${priceFormatter.format(sharedItem.subtotal / sharedItem.sharers.length)}
		</p>
	</div>
</div>
