<template>
  <div class="min-h-screen bg-gray-800 text-white">
    <Navbar v-if="isAuthenticated" />
    <Toast position="top-left" />
    <div class="container mx-auto p-6">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { isAuthenticated } from "@/store/Auth";
import Toast from "primevue/toast";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: { Navbar, Toast },
  setup() {
    return { isAuthenticated };
  },
});
</script>
