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
  <div id="app" class="app-shell">
    <Navbar />
    <main class="app-main">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
    <FooterSection />
  </div>
</template>