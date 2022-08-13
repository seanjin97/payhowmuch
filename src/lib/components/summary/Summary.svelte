<script lang="ts">
	import { people, gst, svcCharge, theme, sharingItems } from '$lib/store';
	import toast, { Toaster } from 'svelte-french-toast';

	import {
		addSummaryToCopyText,
		copyToClipboard,
		extractGst,
		extractSvcCharge,
		formatCopyText,
		priceFormatter,
	} from '$lib/handlers/util';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { afterUpdate } from 'svelte';
	import { fade } from 'svelte/transition';
	import ConfirmedEdits from './ConfirmedEdits.svelte';
	import Button from '../common/Button.svelte';

	$: countConfirmed = $people.filter(
		(person) =>
			person.sharedItems.length > 0 ||
			(person.functionalProps.isConfirmed && person.items.length > 0),
	).length;

	$: percentageConfirmed = tweened(0, { duration: 400, easing: cubicOut });

	$: totalSubtotal =
		$people.reduce((prevValue, currValue) => prevValue + currValue.subtotal, 0) +
		$sharingItems.reduce((prev, curr) => prev + curr.subtotal, 0);

	$: totalSvcCharge = extractSvcCharge(totalSubtotal, $svcCharge);

	$: totalGST = extractGst(totalSvcCharge, totalSubtotal, $gst);

	$: totalTotal = totalSubtotal + totalSvcCharge + totalGST;

	afterUpdate(() => {
		if ($people.length > 0) {
			percentageConfirmed.set((countConfirmed / $people.length) * 100);
		}
	});

	const copyAll = async () => {
		let textToCopy = '';
		$people.forEach((person) => {
			textToCopy += formatCopyText(
				person.name,
				person.items,
				person.sharedItems,
				person.subtotal,
				$gst,
				$svcCharge,
			);
			textToCopy += '\n\n';
		});
		textToCopy += addSummaryToCopyText(totalSubtotal, totalSvcCharge, totalGST, totalTotal);
		await copyToClipboard(textToCopy);
		toast.success('Successfully copied!', {
			style: `background: ${$theme === 'winter' ? '#06142f' : '#293247'}; color: ${
				$theme === 'winter' ? '#b6c4eb' : '#b6c4eb'
			};`,
		});
	};
</script>

<div class="card my-8 p-4 bg-neutral text-neutral-content shadow-xl" transition:fade|local>
	<div class="flex justify-center items-center text-center mb-8">
		<ConfirmedEdits people={$people} {countConfirmed} {percentageConfirmed} />
	</div>
	<div
		class="items-center text-center {Math.ceil($percentageConfirmed) === 100
			? 'opacity-100 '
			: 'opacity-30'}"
	>
		<h4 class="text-xl font-bold">Summary</h4>
		<div class="p-8">
			<div class="flex justify-between">
				<p>SUBTOTAL</p>
				<span>${priceFormatter.format(totalSubtotal)}</span>
			</div>
			<div class="flex justify-between">
				<p>SERVICE CHARGE</p>
				<span>${priceFormatter.format(totalSvcCharge)}</span>
			</div>
			<div class="flex justify-between">
				<p>GST</p>
				<span>${priceFormatter.format(totalGST)}</span>
			</div>
			<div class="flex justify-between">
				<p>TOTAL</p>
				<span>${priceFormatter.format(totalTotal)}</span>
			</div>
		</div>
	</div>

	<div class="m-auto">
		<div class="mb-2">
			{#if Math.ceil($percentageConfirmed) === 100}
				<Button
					styleProps="text-neutral btn-accent hover:opacity-80 items-center"
					on:click={copyAll}
				>
					<span>
						Copy Bill!<i class="fa-solid fa-copy ml-2" />
					</span>
				</Button>
			{:else}
				<Button
					styleProps="btn-disabled btn-accent bg-accent opacity-50 text-neutral btn-accent hover:opacity-80 items-center"
				>
					<span>
						Copy Bill!<i class="fa-solid fa-copy ml-2" />
					</span>
				</Button>
			{/if}
		</div>
	</div>
	<Toaster />
</div>
