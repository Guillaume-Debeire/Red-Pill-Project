<script lang="ts">
  export let onClick;
  export let label: string;
  export let disabled: boolean;
</script>


<button
  class="w-full sm:w-auto px-6 py-2 rounded-lg font-medium
          bg-blue-600 hover:bg-blue-700 transition
          disabled:opacity-50 disabled:cursor-not-allowed"
  on:click={onClick}
  disabled={disabled}
>
  {label}
</button>
