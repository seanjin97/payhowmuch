<script lang="ts">
	export let refId: string;
	export let primaryAction: () => void;
</script>

<input type="checkbox" id={refId} class="modal-toggle" />
<label for={refId} class="modal ">
	<label class="modal-box relative" for="">
		<label for={refId} class="btn btn-sm btn-circle absolute right-2 top-2">
			<i class="fa-solid fa-xmark" />
		</label>
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
			<label for={refId} class="btn bg-neutral-100 btn-outline mr-2">
				<slot name="secondaryButton" />
			</label>
			<label for={refId} class="btn btn-error hover:opacity-70" on:click={primaryAction}>
				<slot name="actionButton" />
			</label>
		</div>
	</label>
</label>
