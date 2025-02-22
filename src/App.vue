<template>
  <div class="min-h-screen bg-gray-800 text-white">
      <Navbar />
      <Toast position="top-left" />
      <div class="container mx-auto p-6">
          <router-view />
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";
import Toast from 'primevue/toast';

export default defineComponent({
  name: "App",
  components: { Navbar, Toast },
});
</script>
