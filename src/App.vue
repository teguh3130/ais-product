<script setup>
import { ref, provide, computed } from 'vue'
import { translations } from './i18n/translations'
import Navbar from '@/components/Navbar.vue'
import FooterSection from '@/components/FooterSection.vue'

const language = ref('id')

const toggleLanguage = () => {
  language.value = language.value === 'id' ? 'en' : 'id'
}

const t = computed(() => translations[language.value])

provide('language', language)
provide('toggleLanguage', toggleLanguage)
provide('t', t)
</script>

<template>
  <div id="app" class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <Navbar />
    <main>
      <Transition name="fade" mode="out-in">
        <router-view />
      </Transition>
    </main>
    <FooterSection />
  </div>
</template>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>