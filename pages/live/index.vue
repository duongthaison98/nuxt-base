<template>
  <div>
    <Header />
    <div v-if="!data">
      <Skeleton class="h-[calc(100svh-5rem] w-[100%]">
        <div class="md:w-3/4"></div>
        <div class="md:w-1/4"></div>
      </Skeleton>
    </div>
    <div v-else class="live-page-wrap flex flex-wrap h-[calc(100svh-5rem)]">
      <div class="md:w-3/4">
        <LiveScreen :thumbnail="data.videoInfo.thumbnail" />
      </div>
      <div class="md:w-1/4">
        <LiveChat
          :lst-comments="lstComments"
        />
      </div>
    </div>
    <Toaster />
  </div>
</template> 

<script setup lang="ts">
import Header from '~/components/layout/Header.vue';
import LiveScreen from '~/components/pageComponents/livestream/LiveScreen.vue';
import LiveChat from '~/components/pageComponents/livestream/LiveChat.vue';
import LiveRepo from '~/repositories/liveRepository/index';
import type { ListComments } from '@/types';
import { useNotify } from '@/composables/useNotify'

const paramComments = ref<{last_time: string, size: number}>({
  last_time: '',
  size: 30
})
const lstComments = ref<ListComments>([])

const { data, error } = await useAsyncData('fetchData', async () => {
  try {
    const [
      resTopvideo,
      resFollowVideo,
      resSuggestVideo,
      resVideoInfo,
      resMessage
    ] = await Promise.all([
      LiveRepo.getTopVideo(),
      LiveRepo.getFollowVideo(),
      LiveRepo.getSuggestVideo(),
      LiveRepo.getVideoByShortId("bgzPk26GaZVeFKCeGj59Rb"),
      getChat()
    ])
    
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

async function getChat() {
  try {
    paramComments.value.last_time = '';
    const res = await LiveRepo.getAllMessage("4f918f54-112d-4a78-ac00-b65a55f90592", paramComments.value)
    lstComments.value = res.Data.reverse();    

    console.log("lstComments.value", lstComments.value);
    
  } catch (error) {
    console.log(error);  
  }
}
</script>