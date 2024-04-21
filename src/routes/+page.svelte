<script lang="ts">
	import { ShikiMagicMove } from '$lib';
	import { getHighlighter } from 'shiki';

	let code_from = `
  let search = ''
  $: filteredCodes = codes.filter(
    item =>
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase()) ||
      item.detail.toLowerCase().includes(search.toLowerCase()) ||
      item.class.toLowerCase().includes(search.toLowerCase())
  )
  `;
	let code_to = `
  let search_query = $state('');
  let filtered_codes = $derived.by(() => {
    if (search_query.length === 0) return codes;
    return codes.filter(
      (item) =>
        item.code.toLowerCase().includes(search_query.toLowerCase()) ||
        item.message.toLowerCase().includes(search_query.toLowerCase()) ||
        item.detail.toLowerCase().includes(search_query.toLowerCase()) ||
        item.class.toLowerCase().includes(search_query.toLowerCase())
    );
  });
  `;

	let toggle = $state(false);
	let code = $state(code_from);

	const highlighter = getHighlighter({
		themes: ['night-owl'],
		langs: ['javascript', 'typescript', 'svelte']
	});

	const toggle_animation = () => {
		toggle = !toggle;
		toggle ? (code = code_to) : (code = code_from);
	};
</script>

<svelte:window on:click={toggle_animation} />

{#await highlighter then highlighter}
	<ShikiMagicMove
		lang="ts"
		theme="night-owl"
		{highlighter}
		{code}
	/>
{/await}
