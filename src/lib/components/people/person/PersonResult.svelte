<script lang="ts">
	import {
		priceFormatter,
		calculateGstAndSvcCharge,
		extractSvcCharge,
		extractGst,
	} from '$lib/handlers/util';
	import { slide } from 'svelte/transition';
	import { gst, svcCharge } from '$lib/store';
	import Button from '$lib/components/common/Button.svelte';
	export let subtotal: number;

	$: derivedSvcCharge = extractSvcCharge(subtotal, $svcCharge);
	$: derivedGst = extractGst(derivedSvcCharge, subtotal, $gst);
	$: totalWithTax = calculateGstAndSvcCharge($svcCharge, subtotal, $gst);
</script>

<div transition:slide|local>
	<div class="flex justify-between items-center">
		<div
			class="tooltip flex w-fit tooltip-info tooltip-right"
			data-tip="This is the sum of all item entries!"
		>
			<div class="flex items-center">
				<h4 class="font-medium text-md">Subtotal</h4>
				<i class="fa-solid fa-circle-info text-sky-400 fa-xs" />
			</div>
		</div>
		<div><p class="font-medium text-md">${priceFormatter.format(subtotal)}</p></div>
	</div>
	<div class="flex justify-between items-center">
		<div>
			<h4 class="font-medium text-md">Service Charge</h4>
		</div>
		<div>
			<p class="font-medium text-md">
				${priceFormatter.format(derivedSvcCharge)}
			</p>
		</div>
	</div>
	<div class="flex justify-between items-center">
		<div
			class="tooltip flex w-fit tooltip-info tooltip-right"
			data-tip="GST is applied after Service Charges!"
		>
			<div class="flex items-center">
				<h4 class="font-medium text-md">GST</h4>
				<i class="fa-solid fa-circle-info text-sky-400 fa-xs" />
			</div>
		</div>

		<div>
			<p class="font-medium text-md">${priceFormatter.format(derivedGst)}</p>
		</div>
	</div>
	<div class="flex justify-between items-center">
		<div>
			<h4 class="font-bold text-md">Total</h4>
		</div>
		<div>
			<p class="font-bold text-xl">
				${priceFormatter.format(totalWithTax)}
			</p>
		</div>
	</div>
</div>
