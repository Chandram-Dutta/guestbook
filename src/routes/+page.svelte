<script lang="ts">
	import { BookHeart, SendHorizontal } from 'lucide-svelte';
	import { Button } from 'bits-ui';
	import { PUBLIC_FRONTEND_URL } from '$env/static/public';
	import type { Message } from '$lib/message';
	import { onMount, tick } from 'svelte';

	let message = '';
	let messages: Message[] = [];
	let element: HTMLElement;

	onMount(() => {
		getPosts();
		scrollToBottom(element);
	});

	const scrollToBottom = async (node: HTMLElement) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	async function getIpAdress(): Promise<string> {
		const res = await fetch('https://api.ipify.org?format=json');
		const data = await res.json();
		return data.ip;
	}

	async function createAPost() {
		fetch(`${PUBLIC_FRONTEND_URL}api/post`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ message, ip: await getIpAdress(), name: 'Guest' })
		})
			.then((_) => {
				message = '';
				getPosts();
			})
			.catch((err) => console.error(err));
	}

	async function getPosts() {
		const res = await fetch(`${PUBLIC_FRONTEND_URL}api/get`);
		const data = await res.json();
		messages = data;
		await tick();
		scrollToBottom(element);
	}
</script>

<div class="flex flex-col h-screen">
	<div class="w-full p-4 flex flex-row items-center bg-fuchsia-900 text-fuschia-100 shadow-md">
		<BookHeart />
		<h1 class="text-2xl m-2">Guestbook</h1>
	</div>

	<div bind:this={element} class="flex-1 overflow-y-auto p-4">
		{#each messages as message}
			<div class="p-4 bg-fuchsia-100 text-fuchsia-950 rounded-lg m-2">
				<p>{message.message}</p>
				<p>{message.name}</p>
			</div>
		{/each}
	</div>

	<div class="w-full p-4 flex flex-row items-center bg-fuchsia-900 text-fuschia-100 shadow-md">
		<input
			class="flex-1 p-4 bg-fuchsia-100 text-fuchsia-950 rounded-lg"
			type="text"
			bind:value={message}
		/>
		<Button.Root
			class="transition active:scale-95 hover:bg-fuchsia-100/95 ml-4 p-4 rounded-full bg-fuchsia-100 text-fuchsia-950"
			on:click={createAPost}
		>
			<SendHorizontal />
		</Button.Root>
	</div>
</div>
