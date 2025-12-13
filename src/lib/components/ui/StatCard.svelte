<script lang="ts">
  export let label: string;
  export let value: number;
  export let color: 'green' | 'blue' | 'red' | 'neutral' = 'neutral';

  const colors = {
    green: 'text-green-400',
    blue: 'text-blue-400',
    red: 'text-red-400',
    neutral: 'text-white'
  };
</script>

<div class="bg-neutral-800 rounded-xl p-4">
  <p class="text-sm text-zinc-400">{label}</p>
  <p class={`text-2xl font-bold ${colors[color]}`}>
    {value}
  </p>
</div>