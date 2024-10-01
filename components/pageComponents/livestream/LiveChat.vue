<template>
  <div class="live-chat-wrap flex flex-col h-full w-full p-[10px] bg-black">
    <div class="channel-title flex items-center justify-between text-xl font-bold uppercase text-white mb-3">
      <div class="flex items-center">
        <NuxtImg class="mr-3" src="/images/video.svg" width="20" height="20" alt="" />
        <span>live chat</span>
      </div>
      <div class="collapse-live">
        <NuxtImg src="/images/collapse.svg" width="20" height="20" alt="" />
      </div>
    </div>
    <div class="chat-list flex-1 overflow-y-scroll">
      <div 
        class="chat-item" 
        v-for="(item, index) in props.lstComments" 
        :key="index" 
        :class="{ 'chat-user': item.type === MessageType.User }"
      >
        <div v-if="item.type === MessageType.User" class="chat-mess">
          <span class="chat-name font-weight-bold" :style="{'color': item.text_color}">{{ item.display_name }}: </span>
          <span class="chat-text" v-html="item.content"></span>
        </div>
        <div v-else-if="item.type === MessageType.Donate" class="bg-gold message-action my-2">
          <span class="chat-name font-weight-bold">
            <img src="@/assets/images/medal.svg" alt="">
            {{ item.display_name }}: 
          </span>
          <span class="text-white" v-html="item.content"></span>
        </div>
      </div>
    </div>
    <div class="chat-input-section flex"></div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/pages/_livestream.scss';
import type { ListComments } from '@/types';
import { MessageType, CommentStatus } from '@/constants/liveStatus';

interface Props {
  lstComments: ListComments;
}

const props = defineProps<Props>();
console.log("lstComments props", props.lstComments);

if (process.client) {
  console.log("lstComments props client", props.lstComments);
} else {
  console.log("lstComments props server", props.lstComments);
}

</script>