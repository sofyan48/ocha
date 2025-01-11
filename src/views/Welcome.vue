<template>
  <main>
    <div class="container md:mx-auto py-5 px-2 h-screen">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 ">
        <Intro />
        <Prompt />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Intro from '../components/intro.vue'
import Prompt from '../components/prompt.vue'
</script>