<template>
    <div class="flex flex-col md:gap-y-8  md:py-60 py-4">
        <h1 class="text-gray-600 poppins font-semibold text-5xl text-start">Hi, I’m <span class="font-bold text-gray-800">Iank</span>, a Software Architect</h1>
        <div class="flex flex-col">
            <p class="text-base text-gray-500">turning ideas into powerful solutions 🚀</p>
            <p class="text-base text-gray-500">Curious? Ask away using the prompt below to learn more!</p>
        </div>

    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useChat } from "../composables/usechat";
import type { IChat } from "@/interfaces/chatstore";
const { addMessage } = useChat();

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
