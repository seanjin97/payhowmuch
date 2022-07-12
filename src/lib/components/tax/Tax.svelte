<script>
	import TaxGst from './TaxGST.svelte';
	import TaxSvcCharge from './TaxSvcCharge.svelte';
</script>

<div class="mt-8">
	<div
		class="tooltip flex w-fit tooltip-info"
		data-tip="GST is applied on top of Service Charges!"
	>
		<h2 class="underline opacity-90">How much taxes are included</h2>
		<i class="fa-solid fa-circle-info text-sky-400" />
	</div>

	<TaxSvcCharge />
	<TaxGst />
</div>
