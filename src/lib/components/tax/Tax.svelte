<script>
	import TaxGst from './TaxGST.svelte';
	import TaxSvcCharge from './TaxSvcCharge.svelte';
</script>

<div class="mt-8">
	<div class="tooltip flex w-fit tooltip-info" data-tip="GST is applied after Service Charges!">
		<div class="flex items-center">
			<h2 class="text-left text-lg font-bold whitespace-nowrap opacity-90">
				How much taxes are included?
			</h2>
			<i class="fa-solid fa-circle-info text-sky-400 fa-xs pl-[8px]" />
		</div>
	</div>

	<TaxSvcCharge />
	<TaxGst />
</div>
