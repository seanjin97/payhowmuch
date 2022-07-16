<script lang="ts">
	import { people } from '$lib/store';
	import { percentageFormatter } from '$lib/handlers/util';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { afterUpdate } from 'svelte';
	import { fade } from 'svelte/transition';
	import Button from '../common/Button.svelte';
	$: countConfirmed = $people.filter((person) => person.functionalProps.isConfirmed).length;

	$: percentageConfirmed = tweened(0, { duration: 400, easing: cubicOut });

	afterUpdate(() => {
		if ($people.length > 0) {
			percentageConfirmed.set((countConfirmed / $people.length) * 100);
		}
	});
</script>

<div class="card my-8 p-4 bg-neutral-focus text-neutral-content shadow-xl" transition:fade>
	<div class="flex justify-center items-center text-center">
		<div>
			<h4 class="font-bold text-xl mb-4">
				Confirmed Edits for {countConfirmed} of {$people.length}
				People!
			</h4>
			<div id="progress-bar" class="flex items-center justify-between mb-4">
				<label for="progress-bar" class="m-1 text-xs opacity-80">0%</label>
				<progress
					class="progress {Math.ceil($percentageConfirmed) === 100
						? 'progress-success'
						: 'progress-error'}"
					value={$percentageConfirmed}
					max="100"
				/>
				<label for="progress-bar" class="m-1 text-xs opacity-80"
					>{percentageFormatter.format($percentageConfirmed)}%</label
				>
			</div>

			<div class="mb-2">
				<Button
					styleProps="{Math.ceil($percentageConfirmed) === 100
						? ''
						: 'btn-disabled btn-accent bg-accent opacity-50'} btn-disabled bg-accent text-neutral btn-accent opacity-50 hover:opacity-80 items-center"
				>
					<span>
						<!-- Copy Bill!<i class="fa-solid fa-copy ml-2" /> -->
						WIP
					</span>
				</Button>
			</div>
		</div>
	</div>
</div>
