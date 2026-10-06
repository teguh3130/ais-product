<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'

const t = inject('t')
const language = inject('language')
const toggleLanguage = inject('toggleLanguage')
const menuOpen = ref(false)
const hasScrolled = ref(false)
const activeSection = ref('home')
const menuButton = ref(null)

const navigation = computed(() => [
  { id: 'home', label: t.value.nav[1] },
  { id: 'about', label: t.value.nav[2] },
  { id: 'features', label: t.value.nav[5] },
  { id: 'workflow', label: t.value.nav[3] },
  { id: 'contact', label: t.value.nav[6] },
])

const handleScroll = () => {
  hasScrolled.value = window.scrollY > 24

  const scrollPosition = window.scrollY + 140
  const visibleSection = [...navigation.value].reverse().find(({ id }) => {
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

const handleKeydown = (event) => {
  if (event.key !== 'Escape' || !menuOpen.value) return
  closeMenu()
  menuButton.value?.focus()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="navbar" :class="{ 'is-scrolled': hasScrolled, 'is-menu-open': menuOpen }">
    <div class="navbar-inner">
      <a class="brand" href="#home" aria-label="AIS ITS home" @click="closeMenu">
        <img src="../assets/gambar/logo-aisits.png" alt="AIS ITS" width="210" height="98" />
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
        <div
          class="lang-switch"
          :class="{ 'lang-switch-en': language === 'en' }"
          aria-label="Language selector"
        >
          <button
            :class="{ active: language === 'id' }"
            type="button"
            @click="language === 'en' && toggleLanguage()"
          >
            ID
          </button>
          <button
            :class="{ active: language === 'en' }"
            type="button"
            @click="language === 'id' && toggleLanguage()"
          >
            EN
          </button>
        </div>

        <button
          ref="menuButton"
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
  height: 6.25rem;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 0;
  border-bottom: 1px solid transparent;
  background: rgba(247, 246, 242, 0.02);
  transition:
    background 0.35s ease,
    border-color 0.35s ease,
    backdrop-filter 0.35s ease;
}

/* Shared content grid: the brand and actions align to the same width and
   centering as the hero content, so both live in one layout system. */
.navbar-inner {
  display: flex;
  width: min(calc(100% - 2 * var(--content-gutter)), var(--content-width));
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
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
  width: 210px;
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
  font-size: 0.9925rem;
  font-weight: bold;
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
  position: relative;
  display: flex;
  gap: 0.125rem;
  min-height: 38px;
  padding: 0.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: rgba(148, 163, 184, 0.16);
  box-shadow: inset 0 1px 2px rgba(17, 24, 39, 0.04);
  isolation: isolate;
}

.lang-switch::before {
  position: absolute;
  z-index: -1;
  top: 0.25rem;
  bottom: 0.25rem;
  left: 0.25rem;
  width: 3rem;
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  box-shadow: 0 3px 10px rgba(17, 24, 39, 0.12);
  content: '';
  transform: translateX(0);
  transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
}

.lang-switch.lang-switch-en::before {
  transform: translateX(3.125rem);
}

.lang-switch button {
  position: relative;
  z-index: 1;
  min-width: 3rem;
  padding: 0.3rem 0.45rem;
  border: 0;
  border-radius: var(--radius-pill);
  color: var(--color-muted);
  background: transparent;
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  transition:
    color 250ms ease,
    transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
}

.lang-switch button.active {
  color: var(--color-text);
  transform: scale(1.04);
}

.lang-switch button:not(.active):hover {
  color: var(--color-text);
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
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

/* =========================================================
   CONTRAST OVER THE DARK CINEMATIC HERO (top of the page)
   ========================================================= */

.navbar:not(.is-scrolled):not(.is-menu-open) {
  border-bottom-color: transparent;
  background: rgba(4, 12, 26, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.navbar:not(.is-scrolled):not(.is-menu-open) .brand img {
  filter: drop-shadow(0 2px 12px rgba(2, 10, 24, 0.5));
}

.navbar:not(.is-scrolled):not(.is-menu-open) .desktop-menu a {
  color: rgba(255, 255, 255, 0.76);
  text-shadow: 0 1px 14px rgba(2, 8, 20, 0.7);
}

.navbar:not(.is-scrolled):not(.is-menu-open) .desktop-menu a::after {
  background: #4da3ff;
}

.navbar:not(.is-scrolled):not(.is-menu-open) .desktop-menu a:hover,
.navbar:not(.is-scrolled):not(.is-menu-open) .desktop-menu a.active {
  color: #fff;
}

.navbar:not(.is-scrolled):not(.is-menu-open) .lang-switch {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.14);
  box-shadow: inset 0 1px 2px rgba(2, 10, 24, 0.2);
}

.navbar:not(.is-scrolled):not(.is-menu-open) .lang-switch::before {
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 3px 10px rgba(2, 10, 24, 0.35);
}

.navbar:not(.is-scrolled):not(.is-menu-open) .lang-switch button {
  color: rgba(255, 255, 255, 0.78);
}

.navbar:not(.is-scrolled):not(.is-menu-open) .lang-switch button.active,
.navbar:not(.is-scrolled):not(.is-menu-open) .lang-switch button:not(.active):hover {
  color: var(--color-text);
}

.navbar:not(.is-scrolled):not(.is-menu-open) .menu-button {
  border-color: rgba(255, 255, 255, 0.32);
  background: rgba(255, 255, 255, 0.14);
}

.navbar:not(.is-scrolled):not(.is-menu-open) .menu-button span {
  background: #fff;
}

.navbar.is-menu-open {
  border-color: var(--color-border);
  background: rgba(247, 246, 242, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
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
    width: 128px;
  }

  .lang-switch {
    min-height: 34px;
  }

  .lang-switch::before {
    width: 2.65rem;
  }

  .lang-switch.lang-switch-en::before {
    transform: translateX(2.775rem);
  }

  .lang-switch button {
    min-width: 2.65rem;
    padding: 0.25rem 0.35rem;
    font-size: 0.85rem;
  }
}
</style>
