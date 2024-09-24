<template>
  <div>
    <div v-if="error">
      <p>Error loading data: {{ error.message }}</p>
    </div>
    <div v-else-if="!data">...loading</div>
    <div v-else>
      <div class="container px-52 mt-10">
        <div v-for="(item, index) in data.lstTopVideo" :key="index" class="mb-10">
          <p class="text-2xl font-bold">{{ item.title }}</p>
          <NuxtImg :src="item.thumbnail" alt="" />
        </div>
      </div>
    </div>
  </div>
</template> 

<script setup lang="ts">
import { LivestreamApi } from '~/service/Livestream/index';

const { $useAxios }: any = useNuxtApp();

const { data, error } = await useAsyncData('fetchData', async () => {
  try {
    const [
      resTopvideo,
      resFollowVideo,
      resSuggestVideo
    ] = await Promise.all([
      $useAxios(LivestreamApi.TopVideo, { method: 'get' }),
      $useAxios(LivestreamApi.FollowVideo, { method: 'get' }),
      $useAxios(LivestreamApi.SuggestVideo, { method: 'get' }),
    ])
    
    return {
      lstTopVideo: resTopvideo.Data,
      lstFollowVideo: resFollowVideo.Data,
      lstSuggestVideo: resSuggestVideo.Data
    }
  } catch (error) {
    console.log(error);
    return null;
  }
})
</script>