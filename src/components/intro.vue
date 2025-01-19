<template>
    <div class="flex flex-col md:gap-y-8  md:py-60 py-4">
        <h1 class="text-gray-600 poppins font-semibold text-5xl text-start">Hi, I’m <span class="font-bold text-gray-800">Iank</span>, a Software Engineer</h1>
        <div class="flex flex-col">
            <p class="text-base text-gray-500">Turning ideas into powerful solutions 🚀</p>
            <p class="text-base text-gray-500">Curious? Ask Cinbot to find more information about me.!</p>
        </div>

    </div>
</template>
<script setup lang="ts">
import cookie from "@/utils/cookie";
import { onBeforeMount, onMounted } from "vue";
import random from "@/utils/random_key";
import chat from "@/service/chat";

const {getCookie, setCookie} = cookie

onMounted(() => {
    const unique = getCookie('identity')
    if (!unique) {
        let key = random.generateUniqueValue()
        setCookie('identity', key)
    }
})

onBeforeMount(() => {
    chat.fetchHistory()
})
</script>
