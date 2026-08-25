<script setup>
import { inject } from 'vue'

const t = inject('t')
const language = inject('language')
const toggleLanguage = inject('toggleLanguage')
</script>
<template>
  <nav class="navbar">
    <div class="logo">
      <a href="#">
        <img src="../assets/gambar/logo-aisits-2.png" alt="AIS ITS Logo" width="90">
      </a>
    </div>

    <div class="menu">
      <a href="#">{{ t.nav.home }}</a>
      <a href="#about">{{ t.nav.about }}</a>
      <a href="#workflow">{{ t.workflow.subtitle }}</a>
      <a href="#gallery">{{ t.nav.gallery }}</a>
      <a href="#Fitur">{{ t.nav.features }}</a>
      <a href="#contact">{{ t.nav.contact }}</a>
    </div>

    <div class="lang-switch">

      <button :class="{ active: language === 'id' }" @click="toggleLanguage">
        ID
      </button>

      <button :class="{ active: language === 'en' }" @click="toggleLanguage">
        EN
      </button>

    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background: #100858;
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.logo {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.menu {
  display: flex;
  gap: 30px;
}

.menu a {
  color: white;
  text-decoration: none;
  transition: 0.3s;
}

.menu a:hover {
  color: #7ec8ff;
}

.lang-switch {
  display: flex;
  background: rgba(255, 255, 255, .15);
  padding: 4px;
  border-radius: 999px;
}

.lang-switch button {
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 999px;
}

.lang-switch button.active {
  background: white;
}
</style>