<template>
  <div class="live-screen-wrap h-full w-full border-r border-r-slate-900">
    <NuxtImg :src="thumbnail" width="100%" height="100%" class="w-full h-full object-cover" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  thumbnail: string;
}

const { thumbnail } = defineProps<Props>();
</script>