<script>
	import { svcCharge } from '$lib/store';
</script>

<div class="flex justify-between items-center">
	<p>Service Charge</p>
	<label class="relative block">
		<input
			bind:value={$svcCharge}
			name="gst"
			type="number"
			class="input input-bordered font-bold text-center md:p-8 sm:p-4 text-xl w-28"
		/>
		<span class="absolute inset-y-4 right-2 flex items-center"
			><i class="fas fa-percent text-2xl" /></span
		>
	</label>
</div>
