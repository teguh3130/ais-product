<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import shipImage from '../assets/gambar/ais-buoy.png'

const t = inject('t')
const language = inject('language')
const scrollOffset = ref(0)

const secondaryLabel = computed(() => (language.value === 'id' ? 'Tentang AIS ITS' : 'About AIS ITS'))

const handleScroll = () => {
  scrollOffset.value = Math.min(window.scrollY * 0.12, 80)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section id="home" class="hero">
    <div class="hero-inner">
      <div class="hero-copy" data-aos="fade-up" data-aos-delay="100">
        <span class="eyebrow">AIS ITS / MARITIME INTELLIGENCE</span>
        <h1>{{ t.hero.title }}</h1>
        <p>{{ t.hero.subtitle }}</p>

        <div class="hero-actions">
          <a class="button button-primary" href="#Fitur">{{ t.hero.button }}</a>
          <a class="button button-secondary" href="#about">{{ secondaryLabel }}</a>
        </div>
      </div>

      <div class="hero-visual" :style="{ transform: `translate3d(0, ${scrollOffset}px, 0)` }" data-aos="fade-left"
        data-aos-delay="250">
        <div class="visual-glow"></div>
        <img :src="shipImage" alt="Vessel monitored by AIS ITS" />
        <span class="visual-caption">REAL-TIME VESSEL VISIBILITY</span>
      </div>
    </div>

    <a class="scroll-cue" href="#about" aria-label="Scroll to about AIS ITS">
      <span>SCROLL TO EXPLORE</span>
      <i></i>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  min-height: 100svh;
  align-items: center;
  overflow: hidden;
  padding: 8rem var(--content-gutter) 5rem;
  background: var(--color-background);
}

.hero::before {
  position: absolute;
  top: 18%;
  right: -10%;
  width: 48rem;
  height: 48rem;
  border-radius: 50%;
  background: rgba(0, 102, 255, 0.06);
  content: '';
  filter: blur(1px);
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  width: min(100%, var(--content-width));
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: clamp(2rem, 7vw, 8rem);
  margin: 0 auto;
}

.hero-copy {
  max-width: 39rem;
}

.eyebrow,
.visual-caption,
.scroll-cue span {
  color: var(--color-accent);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.hero h1 {
  max-width: 12ch;
  margin: 1.4rem 0 1.6rem;
  color: var(--color-text);
  font-size: clamp(3.5rem, 6.5vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.075em;
  line-height: 0.98;
}

.hero-copy p {
  max-width: 31rem;
  margin: 0;
  color: var(--color-muted);
  font-size: clamp(1.05rem, 1.5vw, 1.2rem);
  line-height: 1.65;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.25rem;
}

.button {
  display: inline-flex;
  min-height: 3.25rem;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.4rem;
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}

.button:hover {
  transform: translateY(-3px);
}

.button-primary {
  color: #fff;
  background: var(--color-accent);
  box-shadow: 0 10px 24px rgba(0, 102, 255, 0.18);
}

.button-primary:hover {
  background: var(--color-accent-hover);
}

.button-secondary {
  color: var(--color-text);
  border-color: var(--color-border);
  background: rgba(255, 255, 255, 0.55);
}

.button-secondary:hover {
  border-color: rgba(17, 17, 17, 0.2);
  background: var(--color-surface);
}

.hero-visual {
  position: relative;
  display: flex;
  min-height: clamp(22rem, 55vh, 38rem);
  align-items: center;
  justify-content: center;
  transition: transform 0.1s linear;
  will-change: transform;
}

.hero-visual img {
  position: relative;
  z-index: 1;
  width: min(100%, 42rem);
  max-height: 35rem;
  object-fit: contain;
  filter: drop-shadow(0 2rem 2rem rgba(17, 17, 17, 0.14));
  animation: float 7s ease-in-out infinite;
}

.visual-glow {
  position: absolute;
  width: 75%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 0 8rem rgba(0, 102, 255, 0.12);
}

.visual-caption {
  position: absolute;
  right: 2%;
  bottom: 8%;
  z-index: 2;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: var(--radius-pill);
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(14px);
}

.scroll-cue {
  position: absolute;
  bottom: 2.25rem;
  left: var(--content-gutter);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.scroll-cue span {
  color: var(--color-muted);
  font-size: 0.62rem;
}

.scroll-cue i {
  display: block;
  width: 3rem;
  height: 1px;
  background: var(--color-text);
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-0.75rem);
  }
}

@media (max-width: 800px) {
  .hero {
    min-height: auto;
    padding-top: 8rem;
    padding-bottom: 7rem;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero h1 {
    max-width: 10ch;
    font-size: clamp(3.25rem, 14vw, 5rem);
  }

  .hero-visual {
    min-height: 18rem;
  }

  .visual-caption {
    right: 0;
    bottom: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-visual img {
    animation: none;
  }
}
</style>
