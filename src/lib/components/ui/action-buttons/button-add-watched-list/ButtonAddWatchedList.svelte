<script lang="ts">
	import classNames from "classnames";

  export let onClick;
  export let label: string;
  export let disabled: boolean;
  export let className: string = "";
</script>


<button
  class={classNames("w-full min-w-50 sm:w-auto px-6 py-2 rounded-lg font-medium bg-cyan-600 hover:bg-cyan-900 transition disabled:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer", className)}
  on:click={onClick}
  disabled={disabled}
>
  {label}
</button>
