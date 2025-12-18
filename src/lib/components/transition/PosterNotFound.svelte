<script lang="ts">
	import classNames from "classnames";

  export let className: string = "";
  export let title: string= ""
</script>

<div class={classNames("h-full w-full text-gray-400 bg-linear-to-t from-black via-black/80 to-black/5 flex justify-center items-center", className)}>
  {#if title}
    <span>{title}</span>
  {:else}
  <span>Pas de Poster</span>
  {/if}
</div>
