<script lang="ts">
	import { MagicMoveRenderer } from 'shiki-magic-move/renderer';
	import type { ShikiMagicMoveRendererProps } from '../types';

	const { ...props }: ShikiMagicMoveRendererProps = $props();

	let container: HTMLPreElement;
	let renderer: MagicMoveRenderer;
	let isMountred = $state(false);

	$effect(() => {
		if (!container) return;
		container.innerHTML = '';
		isMountred = true;
		renderer = new MagicMoveRenderer(container);
	});

	$effect(() => {
		async function render() {
			if (!renderer) return;
			Object.assign(renderer.options, props.options);
			if (props.animate) {
				if (props.previous) renderer.replace(props.previous);
        props.onStart?.();
				await renderer.render(props.tokens);
        props.onEnd?.();
			} else {
				renderer.replace(props.tokens);
			}
		}
		render();
	});
</script>

<pre bind:this={container} class="shiki-magic-move-container"></pre>
