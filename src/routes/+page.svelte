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
		toggle ? (code = clean_tabs(code_to)) : (code = clean_tabs(code_from));
	};
</script>

<svelte:window on:click={toggle_animation} />

{#await highlighter then highlighter}
	<ShikiMagicMove lang="ts" theme="night-owl" {highlighter} {code} />
{/await}
