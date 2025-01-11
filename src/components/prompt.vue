<template>
    <div  class="relative chat-container w-full h-full overflow-y-auto scroll-smooth rounded-lg flex flex-col gap-y-5 py-8 md:px-7 px-2 text-white text-sm font-light bg-gradient-to-t from-gray-700 to-gray-500 justify-between md:h-[800px] h-[400px]">
        <div class=" flex flex-col gap-5 max-h-[90%] overflow-y-scroll p-4" ref="chatContainer">
          <div v-for="(chat, i) in chats" class="flex flex-row gap-x-3" :class="chat.direction === 'out' ? 'justify-start' : 'justify-end'">
              <div class="h-fit w-fit text-base font-semibold rounded-full py-1 px-[0.4rem]" :class="chat.direction == 'in' ? 'bg-purple-200' : 'bg-white'">{{chat.direction == "in" ? "🗿" : "🚀"}}</div>
              <p class="mt-2">{{ chat.message }}</p>
          </div>
        </div>

        <div class="mt-8 w-full flex flex-row gap-x-4">
            <input v-model="tempMessage" type="text" class="flex-auto border-2 border-gray-300 p-2 rounded-md focus:outline-gray-400 text-black" placeholder="Ask me anything!">
            <button @click="sendMessage()" class="md:px-5 px-2 py-3 bg-purple-300 rounded-md w-fit">Ask Ocha</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { setupLogging } from "@/stores/chat";
import { useChat } from "../composables/usechat";
import { nextTick, onMounted, ref, watch } from "vue";

import { reactive } from "vue";
import type { IChat } from "@/interfaces/chatstore";
const { addMessage } = useChat();

const { chats } = useChat();
const chatContainer = ref<HTMLDivElement | null>(null);

setupLogging();

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

watch(
  chats.value,
  async () => {
    await nextTick(); // Wait for the DOM to update
    scrollToBottom();
  }
);

onMounted(() => {
  scrollToBottom(); // Initial scroll to the bottom when the component mounts
});




const tempMessage = ref("");

const message: IChat = reactive({
    message: "",
    direction: "in",
});

const sendMessage = () => {
    message.message = tempMessage.value;
    addMessage(message);
    tempMessage.value = "";
};
</script>