<template>
  <div class="live-chat-wrap flex flex-col h-[calc(100svh-5rem)] w-full p-[10px] bg-black">
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
        v-for="(item, index) in lstComments" 
        :key="index" 
        :class="{ 'chat-user': item.type === MessageType.User }"
      >
        <div v-if="item.type === MessageType.User" class="chat-mess p-1">
          <span class="chat-name font-bold" :style="{'color': item.text_color}">{{ item.display_name }}: </span>
          <span class="chat-text text-gray-300" v-html="item.content"></span>
        </div>
        <div v-else-if="item.type === MessageType.Donate" class="bg-yellow-600 message-action inline-block py-1 px-2 rounded-[20px] my-2">
          <span class="chat-name text-white font-bold">
            {{ item.display_name }}: 
          </span>
          <span class="text-white" v-html="item.content"></span>
        </div>
      </div>
    </div>
    <div class="chat-input-section pt-3 flex">
      <div class="chat-input w-full mr-2">
        <Input
          v-model="chatValue" 
          class="chat-input-cmt bg-[#ffffff1a] h-[40px] text-white rounded-[6px] p-[10px] w-full border-none text-base" 
          placeholder="Nội dung ..." 
          @keydown.enter="onSendChat"
        />
      </div>
      <div class="chat-send" @click="onSendChat()">
        <img src="@/assets/images/send.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/pages/_livestream.scss';
import type { ListComments } from '@/types';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MessageType, CommentStatus } from '@/constants/liveStatus';
import { useChatStore } from '@/stores/chat';

interface Props {
  lstComments: ListComments;
  isDoneChat: boolean
}
const { lstComments, isDoneChat } = defineProps<Props>();
const chatStore = useChatStore();

const chatValue = ref<string>('');
const emit = defineEmits(['onSendChat']);

watch(() => isDoneChat, () => {
  if (isDoneChat) {
    chatValue.value = '';
  }
})

const onSendChat = () => {
  if (!chatValue.value) {
    return;
  }

  emit('onSendChat', chatValue.value, chatStore.chatColor);
};
</script>