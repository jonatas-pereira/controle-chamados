<script setup lang="ts">
import { Toaster } from 'vue-sonner';
import 'vue-sonner/style.css'
</script>

<template>
  <Toaster
    position="top-right"
    rich-colors
    expand
    close-button
  ></Toaster>
  <RouterView></RouterView>
</template>

<style scoped></style>
