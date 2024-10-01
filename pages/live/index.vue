<template>
  <div>
    <div v-if="error">
      <p>Error loading data: {{ error.message }}</p>
    </div>
    <div v-else-if="!data">
      <Skeleton class="h-[125px] w-[250px] rounded-xl" />
    </div>
    <div v-else>
      <div class="container px-52 mt-10 mx-auto">
        <Button variant="outline" @click="pushNoti()">Button</Button>
        <div>isAuthenticated {{ isAuthenticated }}</div>
        <Carousel class="relative w-full max-w-xs">
          <CarouselContent>
            <CarouselItem v-for="(item, index) in data.lstTopVideo" :key="index">
              <NuxtImg :src="item.thumbnail" class="w-full" alt="" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
    <Toaster />
  </div>
</template> 

<script setup lang="ts">
import LiveRepo from '~/repositories/liveRepository/index';
import { useNotify } from '@/composables/useNotify'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const { data, error } = await useAsyncData('fetchData', async () => {
  try {
    const [
      resTopvideo,
      resFollowVideo,
      resSuggestVideo,
    ] = await Promise.all([
      LiveRepo.getTopVideo(),
      LiveRepo.getFollowVideo(),
      LiveRepo.getSuggestVideo(),
    ])
    
    const resVideoInfo = await LiveRepo.getVideoByShortId(resTopvideo.Data[0].short_uuid);    

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

function pushNoti() {
  authStore.isAuthenticated = !authStore.isAuthenticated
  useNotify('Thành công', 'success');
}
</script>