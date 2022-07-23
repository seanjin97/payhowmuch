<script lang="ts">
	import Button from './Button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let modalOpen: boolean;
	const dispatch = createEventDispatcher();

	const primaryAction = () => {
		modalOpen = false;
		dispatch('primaryAction');
	};
</script>

<div class="modal {modalOpen ? 'modal-open' : ''}">
	<div class="modal-box relative">
		<Button
			styleProps="btn btn-sm btn-circle absolute right-2 top-2"
			on:click={() => (modalOpen = false)}
		>
			<i class="fa-solid fa-xmark" />
		</Button>
		<div class="flex justify-center items-center">
			<div
				class="flex justify-center bg-neutral w-12 h-12 text-center rounded-xl items-center"
			>
				<h3 class="text-lg font-bold">
					<slot name="header" />
				</h3>
			</div>
		</div>

		<p class="py-2 text-center mt-12">
			<slot name="body" />
		</p>
		<p class="py-4 opacity-70 text-center mb-4">
			<slot name="secondary" />
		</p>
		<div class="divider" />

		<div class="modal-action">
			<Button
				on:click={() => (modalOpen = false)}
				styleProps="btn bg-neutral-100 btn-outline mr-2"
			>
				<slot name="secondaryButton" />
			</Button>
			<Button styleProps="btn btn-error hover:opacity-70" on:click={primaryAction}>
				<slot name="actionButton" />
			</Button>
		</div>
	</div>
</div>
