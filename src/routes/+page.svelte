<script lang="ts">
	import { ShikiMagicMove } from '$lib';
	import { code_collection } from '$lib/code-collection';
	import { getHighlighter } from 'shiki';

	let toggle = $state(false);

	const highlighter = getHighlighter({
		themes: ['night-owl'],
		langs: ['javascript', 'typescript', 'svelte']
	});

	const clean_tabs = (code: string) => {
		const tabs = code
			.split('\n')
			.filter(Boolean)[0]
			.split('')
			.filter((char) => char === '\t')
			.join('');
		return code
			.split(/(\n)/)
			.map((line) => line.replace(tabs, ''))
			.join('');
	};

	const toggle_animation = () => {
		toggle = !toggle;
	};
</script>

<svelte:window on:click={toggle_animation} />

{#await highlighter then highlighter}
	{#each code_collection as { code_from, code_to, lang }}
		<ShikiMagicMove
			{lang}
			theme="night-owl"
			{highlighter}
			code={!toggle ? clean_tabs(code_from) : clean_tabs(code_to)}
		/>
	{/each}
{/await}
