<script lang="ts">
    import { page } from '$app/stores';
	import DragDrop from "$lib/components/DragDrop.svelte";
	import FilesTable from "$lib/components/FilesTable.svelte";
	export let data;

</script>


<div class="max-w-5xl mx-auto mt-4">
    <DragDrop/>
    <FilesTable files={data.files} count={data.count}/>
</div>