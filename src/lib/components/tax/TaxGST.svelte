<script>
	import { gst } from '$lib/store';
</script>

<div class="flex justify-between items-center my-2 ">
	<p>GST</p>
	<label class="relative block">
		<input
			bind:value={$gst}
			name="gst"
			type="number"
			class="input input-bordered font-bold text-center md:p-8 sm:p-4 text-xl w-28"
		/>
		<span class="absolute inset-y-4 right-2 flex items-center"
			><i class="fas fa-percent text-2xl" /></span
		>
	</label>
</div>
