<script>
	import { page } from '$app/stores';
	import { emojis } from './emojis.js';
</script>


<h1 class="is-size-2 has-text-dang">Woopsie Daisy...</h1>
<h2 class="is-size-1 has-text-dang">{$page.status}</h2>
<h2 class="is-size-1 has-text-dang">{$page.error?.message}</h2>
<span style="font-size: 10em">
	<!-- {emojis[$page.status] ?? emojis[500]} -->
</span>