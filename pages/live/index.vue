<template>
  <div>
    <div v-if="error">
      <p>Error loading data: {{ error.message }}</p>
    </div>
    <div v-else-if="!data">...loading</div>
    <div v-else>
      <div class="container px-52 mt-10 mx-auto">
        <Button variant="outline" @click="pushNoti()">Button</Button>
        <div>counter {{ store.count }}</div>
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
import LiveRepository from '~/repositories/LiveRepository/index';
import { useToast } from '@/components/ui/toast/use-toast'
import { useCounterStore } from '@/stores/index';

const { toast } = useToast()
const store = useCounterStore()


const liveRepo = new LiveRepository(useNuxtApp().$axios); 
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

function pushNoti() {
  store.increment();
  toast({
    title: 'Thành công',
    variant: 'default',
    duration: 2000
  });
}
</script>