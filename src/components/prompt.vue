<template>
  <div
    class="relative w-full h-full overflow-y-auto scroll-smooth rounded-lg flex flex-col gap-y-5 py-8 md:px-7 px-2 text-white text-sm font-light bg-gradient-to-t from-gray-700 to-gray-500 md:h-[800px] justify-between">
    <div class="chat-container h-5/6 overflow-y-scroll p-4" ref="chatContainer">
      <transition-group name="chat" tag="div" class="chat-container gap-y-6 flex flex-col">
        <div v-for="(chat, i) in chats" :key="i" class="flex flex-row gap-x-3"
          :class="chat.direction === 'out' ? 'justify-start' : 'justify-end'">
          <div class="h-fit w-fit text-base font-semibold rounded-full py-1 px-[0.4rem]"
            :class="chat.direction == 'in' ? 'bg-purple-200' : 'bg-white'">{{ chat.direction == "in" ? "🗿" : "🚀" }}
          </div>
          <p class="mt-2">{{ chat.message }}</p>
        </div>
      </transition-group>

      <transition name="popup" appear>
        <div v-if="getLoading" class="flex flex-row gap-x-3 justify-start my-6">
          <div class="h-fit w-fit text-base font-semibold rounded-full py-1 px-[0.4rem] bg-white">🚀</div>
          <p class="">...</p>
        </div>
      </transition>
    </div>

    <div class="mt-8 w-full flex flex-row gap-x-4">
      <input v-model="tempMessage" type="text"
        class="flex-auto border-2 border-gray-300 p-2 rounded-md focus:outline-gray-400 text-black"
        placeholder="Ask me anything about Iank?!" @keydown.enter="sendMessage()" >
      <button @click="sendMessage()" class="md:px-5 px-2 py-3 bg-purple-300 rounded-md w-fit">Send</button>
    </div>
  </div>
</template>

<style scoped>
/* Tambahkan animasi masuk & keluar */
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease-in-out;
}

.popup-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.popup-enter-to {
  opacity: 1;
  transform: scale(1);
}

.popup-leave-from {
  opacity: 1;
  transform: scale(1);
}

.popup-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.chat-enter-active,
.chat-leave-active {
  transition: all 0.3s ease-in-out;
}

.chat-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.chat-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.chat-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.chat-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<script setup lang="ts">
import { reactive, ref, onMounted, watch, nextTick } from "vue";
import { useChat } from "../composables/usechat";
import chat from "@/service/chat";

const { chats, getLoading, setLoading } = useChat();
const chatContainer = ref<HTMLDivElement | null>(null);
const tempMessage = ref("");

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTo({
      top: chatContainer.value.scrollHeight,
      behavior: "smooth",
    });
  }
};

const sendMessage = () => {
  if (!tempMessage.value) {
    alert("Pesan tidak boleh kosong!");
    return;
  }

  setTimeout(() => {
    setLoading(true)
  }, 400);
  
  setTimeout(() => {
    scrollToBottom();
  }, 600);

  chat.fetchMessage({
    chat: tempMessage.value,
    collection: "ocha_v2",
  })
    .then((res) => {
      console.log("from view", res);
    })
    .catch((err) => {
      console.log("from view", err);
    });

  tempMessage.value = "";
};

watch(
  chats.value,
  async () => {
    await nextTick();
    scrollToBottom();
  },
  { deep: true }
);

onMounted(() => {
  scrollToBottom();
});

</script>