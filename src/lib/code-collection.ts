export const code_collection = [
	{
		code_from: `
			let search = ''
			$: filteredCodes = codes.filter(
				item =>
					item.code.toLowerCase().includes(search.toLowerCase()) ||
					item.message.toLowerCase().includes(search.toLowerCase()) ||
					item.detail.toLowerCase().includes(search.toLowerCase()) ||
					item.class.toLowerCase().includes(search.toLowerCase())
			)
		`,
		code_to: `
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
		`,
		lang: 'ts'
	},
	{
		code_from: `
			import { onMount } from 'svelte';
			import { themes } from './themes';

			let current_theme = '';

			onMount(() => {
				if (typeof window !== 'undefined') {
					const theme = window.localStorage.getItem('theme');
					if (theme && themes.includes(theme)) {
						document.documentElement.setAttribute('data-theme', theme);
						current_theme = theme;
					}
				}
			});
		`,
		code_to: `
			import { themes } from './themes';

			let current_theme = $state('');

			$effect(() => {
				if (typeof window !== 'undefined') {
					const theme = window.localStorage.getItem('theme');
					if (theme && themes.includes(theme)) {
						document.documentElement.setAttribute('data-theme', theme);
						current_theme = theme;
					}
				}
			});
		`,
		lang: 'ts'
	}
];
