<template>
    <div ref="chatContainer" class="chat-container w-full h-full overflow-y-scroll scroll-smooth ms-20 rounded-lg flex flex-col gap-y-5 py-8 px-7 text-white text-sm font-light bg-gradient-to-t from-gray-700 to-gray-500">
        <div v-for="(chat, i) in chats" class="flex flex-row gap-x-3" :class="chat.direction === 'out' ? 'justify-start' : 'justify-end'">
            <div class="h-fit w-fit text-base font-semibold rounded-full py-1 px-[0.4rem]" :class="chat.direction == 'in' ? 'bg-purple-200' : 'bg-white'">{{chat.direction == "in" ? "🗿" : "🚀"}}</div>
            <p class="mt-2">{{ chat.message }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { setupLogging } from "@/stores/chat";
import { useChat } from "../composables/usechat";
import { nextTick, onMounted, ref, watch } from "vue";

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
</script>