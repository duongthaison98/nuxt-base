<template>
  <div>
    <div v-if="error">
      <p>Error loading data: {{ error.message }}</p>
    </div>
    <div v-else-if="!data">...loading</div>
    <div v-else>
      <div class="container px-52 mt-10 mx-auto">
        <Button variant="outline">Button</Button>
        <div v-for="(item, index) in data.lstTopVideo" :key="index" class="mb-10">
          <p class="text-2xl font-bold">{{ item.title }}</p>
          <NuxtImg :src="item.thumbnail" class="w-full" alt="" />
        </div>
      </div>
    </div>
  </div>
</template> 

<script setup lang="ts">
import LiveRepository from '~/repositories/LiveRepository/index';

const liveRepo = new LiveRepository(useNuxtApp().$service); 

const { data, error } = await useAsyncData('fetchData', async () => {
  try {
    const [
      resTopvideo,
      resFollowVideo,
      resSuggestVideo,
    ] = await Promise.all([
      liveRepo.getTopVideo(),
      liveRepo.getFollowVideo(),
      liveRepo.getSuggestVideo(),
    ])
    
    const resVideoInfo = await liveRepo.getVideoByShortId(resTopvideo.Data[0].short_uuid);    

    return {
      lstTopVideo: resTopvideo.Data,
      lstFollowVideo: resFollowVideo.Data,
      lstSuggestVideo: resSuggestVideo.Data,
      videoInfo: resVideoInfo.Data
    }
  } catch (error) {
    console.log(error);
    return null;
  }
})
</script>