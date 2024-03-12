<script lang="ts">
	import Logo from "./Logo.svelte";
    import * as Avatar from "$lib/components/ui/avatar";
    import { Button } from "$lib/components/ui/button";
	import DarkmodeToggle from "./DarkmodeToggle.svelte";
    import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebaseConfig';
    import toast from 'svelte-french-toast';
	async function logOut() {
		await fetch('/', {
			method: 'DELETE'
		});
		await signOut(auth);
        toast.success("Signed out.")
		goto('/');
	}
</script>
<header class="bg-background sticky top-0 left-0 flex items-center justify-between ">
    <Logo/>
    <div class="flex items-center gap-5">
        <DarkmodeToggle/>
        {#if $page.data.user}
        <Avatar.Root>
            <Avatar.Image
                src={$page.data.user.profilePic}
                alt="{$page.data.user.name} profile picture"
            />
        </Avatar.Root>
        <Button on:click={logOut} variant="ghost" class="">Sign out</Button>
    {/if}
    </div>
</header>