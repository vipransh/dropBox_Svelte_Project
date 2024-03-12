<script>
	import Header from '$lib/components/Header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import { Toaster } from 'svelte-french-toast';
</script>
<ModeWatcher/>
<Header/>
<Toaster/>
<slot />
