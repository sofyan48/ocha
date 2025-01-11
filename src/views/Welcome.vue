<template>
  <main>
    <div class="container mx-auto py-5 h-screen">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 h-full">
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