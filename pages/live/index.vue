<template>
  <div>
    <Header />
    <div v-if="!data">
      <div class="flex h-[calc(100svh-5rem)] w-[100%]">
        <div class="md:w-3/4 h-full mr-2">
          <Skeleton class="w-full h-full rounded-none" />
        </div>
        <div class="md:w-1/4 h-full">
          <Skeleton class="w-full h-full rounded-none" />
        </div>
      </div>
    </div>
    <div v-else class="live-page-wrap flex flex-wrap h-[calc(100svh-5rem)]">
      <div class="md:w-3/4">
        <LiveScreen :thumbnail="data.videoInfo.thumbnail" />
      </div>
      <div class="md:w-1/4 h-full">
        <LiveChat
          :lst-comments="data.lstComments"
          :isDoneChat="isDoneChat"
          @onSendChat="handleSendChat"
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
import type { ListComments, PayloadChat, ListVideo, VideoData } from '@/types';
import { useNotify } from '@/composables/useNotify'

const paramComments = ref<{last_time: number | string, size: number}>({
  last_time: '',
  size: 50
})
const isDoneChat = ref<boolean>(false);

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
      LiveRepo.getVideoByShortId("ZcrLYQejNMXMQ2LBJgNgSE"),
      LiveRepo.getAllMessage("4f918f54-112d-4a78-ac00-b65a55f90592", paramComments.value)
    ])
    
    return {
      lstTopVideo: resTopvideo.Data as ListVideo,
      lstFollowVideo: resFollowVideo.Data as ListVideo,
      lstSuggestVideo: resSuggestVideo.Data as ListVideo,
      videoInfo: resVideoInfo.Data as VideoData,
      lstComments: resMessage.Data.reverse() as ListComments
    }
  } catch (error) {
    console.log(error);
    return null;
  }
})

async function loadComments() {
  try {
    if (data.value?.lstComments && data.value.lstComments.length > 0) {
      paramComments.value.last_time = data.value.lstComments[0].created_time;

      const res = await LiveRepo.getAllMessage("4f918f54-112d-4a78-ac00-b65a55f90592", paramComments.value);
      if (res.Data && res.Data.length > 0) {
        data.value?.lstComments.unshift(...res.Data.reverse());
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function handleSendChat(chatValue: string, color: string) {
  try {
    isDoneChat.value = false;

    const payload: PayloadChat = {
      channel_id: "4f918f54-112d-4a78-ac00-b65a55f90592",
      content: chatValue,
      text_color: color
    }
    await LiveRepo.createMessage(payload);

    const resMessage = await LiveRepo.getAllMessage("4f918f54-112d-4a78-ac00-b65a55f90592", paramComments.value);
    if (data.value) {
      data.value.lstComments = resMessage.Data.reverse();
    }

    isDoneChat.value = true;
  } catch (error) {
    console.log(error);
    useNotify('Đã có lỗi xảy ra', 'default');
  }
}

useHead({
  title: data.value?.videoInfo.title,
  meta: [
    { name: 'description', content: data.value?.videoInfo.description }
  ]
})
</script>