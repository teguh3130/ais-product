<script setup>
import { ref, provide, computed } from 'vue'
import { translations } from './i18n/translations'

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
  <RouterView />
</template>
<style>

body{
  font-family: Arial, Helvetica, sans-serif;
}
</style>