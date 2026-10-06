<script setup>
import { ref, provide, computed, watchEffect } from 'vue'
import { translations } from './i18n/translations'
import AppNavbar from '@/components/AppNavbar.vue'
import FooterSection from '@/components/FooterSection.vue'

const STORAGE_KEY = 'ais-its-language'
const DEFAULT_LOCALE = 'en'
const SUPPORTED_LOCALES = ['en', 'id']

const readStoredLanguage = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && SUPPORTED_LOCALES.includes(saved)) return saved
  } catch {
    /* storage unavailable, fall through to the default */
  }
  return DEFAULT_LOCALE
}

const language = ref(readStoredLanguage())

const setLanguage = (value) => {
  if (!SUPPORTED_LOCALES.includes(value) || value === language.value) return
  language.value = value
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* storage unavailable, keep the in-memory choice */
  }
}

const toggleLanguage = () => {
  setLanguage(language.value === 'id' ? 'en' : 'id')
}

const t = computed(() => translations[language.value])

const pageMeta = {
  id: 'AIS ITS: Automatic Identification System untuk Pemantauan Kapal',
  en: 'AIS ITS: Automatic Identification System for Vessel Monitoring',
}

watchEffect(() => {
  document.documentElement.lang = language.value
  document.title = pageMeta[language.value]
})

provide('language', language)
provide('toggleLanguage', toggleLanguage)
provide('t', t)
</script>

<template>
  <div id="app" class="app-shell">
    <AppNavbar />
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
