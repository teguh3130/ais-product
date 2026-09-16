<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'

const t = inject('t')
const language = inject('language')
const toggleLanguage = inject('toggleLanguage')
const menuOpen = ref(false)
const hasScrolled = ref(false)
const activeSection = ref('home')

const navigation = computed(() => [
  { id: 'home', label: t.value.nav[1] },
  { id: 'about', label: t.value.nav[2] },
  { id: 'workflow', label: t.value.nav[3] },
  { id: 'Fitur', label: t.value.nav[5] },
  { id: 'gallery', label: t.value.nav[4] },
  { id: 'contact', label: t.value.nav[6] },
])

const handleScroll = () => {
  hasScrolled.value = window.scrollY > 24

  const scrollPosition = window.scrollY + 140
  const visibleSection = [...navigation.value]
    .reverse()
    .find(({ id }) => {
      const section = document.getElementById(id)
      return section && scrollPosition >= section.offsetTop
    })

  activeSection.value = visibleSection?.id || 'home'
}

const closeMenu = () => {
  menuOpen.value = false
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="navbar" :class="{ 'is-scrolled': hasScrolled }">
    <a class="brand" href="#home" aria-label="AIS ITS home" @click="closeMenu">
      <img src="../assets/gambar/logo-aisits.png" alt="AIS ITS" width="90" height="42" />
    </a>

    <nav class="desktop-menu" aria-label="Main navigation">
      <a
        v-for="item in navigation"
        :key="item.id"
        :href="`#${item.id}`"
        :class="{ active: activeSection === item.id }"
      >
        {{ item.label }}
      </a>
    </nav>

    <div class="nav-actions">
      <div class="lang-switch" aria-label="Language selector">
        <button :class="{ active: language === 'id' }" type="button" @click="language === 'en' && toggleLanguage()">
          ID
        </button>
        <button :class="{ active: language === 'en' }" type="button" @click="language === 'id' && toggleLanguage()">
          EN
        </button>
      </div>

      <button
        class="menu-button"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  <Transition name="mobile-menu">
    <div v-if="menuOpen" class="mobile-navigation">
      <nav aria-label="Mobile navigation">
        <a
          v-for="item in navigation"
          :key="item.id"
          :href="`#${item.id}`"
          :class="{ active: activeSection === item.id }"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </Transition>
</template>

<style scoped>
.navbar {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem var(--content-gutter);
  border-bottom: 1px solid transparent;
  background: rgba(247, 246, 242, 0.02);
  transition: padding 0.35s ease, background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease;
}

.navbar.is-scrolled {
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  border-color: var(--color-border);
  background: rgba(247, 246, 242, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.brand {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.brand img {
  width: 90px;
  height: auto;
  object-fit: contain;
}

.desktop-menu {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2.2vw, 2rem);
  margin-left: auto;
  margin-right: 2rem;
}

.desktop-menu a,
.mobile-navigation a {
  position: relative;
  color: var(--color-muted);
  font-size: 0.8125rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.25s ease;
}

.desktop-menu a::after {
  position: absolute;
  right: 0;
  bottom: -0.6rem;
  left: 0;
  height: 2px;
  border-radius: var(--radius-pill);
  background: var(--color-accent);
  content: '';
  transform: scaleX(0);
  transition: transform 0.25s ease;
}

.desktop-menu a:hover,
.desktop-menu a.active,
.mobile-navigation a.active {
  color: var(--color-text);
}

.desktop-menu a.active::after {
  transform: scaleX(1);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.lang-switch {
  display: flex;
  gap: 0.125rem;
  padding: 0.2rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.55);
}

.lang-switch button {
  min-width: 2rem;
  padding: 0.3rem 0.45rem;
  border: 0;
  border-radius: var(--radius-pill);
  color: var(--color-muted);
  background: transparent;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.lang-switch button.active {
  color: var(--color-text);
  background: var(--color-surface);
  box-shadow: 0 2px 8px rgba(17, 17, 17, 0.08);
}

.menu-button {
  display: none;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-surface);
}

.menu-button span {
  display: block;
  width: 1rem;
  height: 1px;
  margin: 0.3rem auto;
  background: var(--color-text);
  transition: transform 0.25s ease;
}

.mobile-navigation {
  position: fixed;
  z-index: 999;
  inset: 0;
  padding: 7rem var(--content-gutter) 2rem;
  background: rgba(247, 246, 242, 0.96);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.mobile-navigation nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
}

.mobile-navigation a {
  color: var(--color-text);
  font-size: clamp(1.75rem, 7vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

@media (max-width: 900px) {
  .desktop-menu {
    display: none;
  }

  .menu-button {
    display: block;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .brand img {
    width: 76px;
  }

  .lang-switch {
    display: none;
  }
}
</style>
