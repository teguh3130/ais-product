<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import VesselInfoCard from './VesselInfoCard.vue'
/* Hero visual. The brief named `background-ais.jpeg`; no file with that exact
   name exists in the project, so the existing maritime still
   `background ais.jpeg` is used as the hero background. Nothing was created or
   renamed. Vite resolves the asset URL through this static import. */
import heroBackground from '../assets/gambar/background ais.jpeg'

const t = inject('t')
const language = inject('language')

/* Position of the vessel on the source image, normalised 0..1. Estimated from
   `background ais.jpeg` (a compact object just below the horizon on the right).
   Adjust these two values to re-aim the marker. */
const SHIP_X = 0.738
const SHIP_Y = 0.545

const heroEl = ref(null)
const imageEl = ref(null)
const cardEl = ref(null)

const markerPos = ref({ x: 0, y: 0 })
const cardPos = ref({ left: '0px', top: '0px' })
const markerReady = ref(false)
const cardReady = ref(false)
const link = ref({ x1: 0, y1: 0, x2: 0, y2: 0 })

const parsePosition = (value) => {
  const parts = String(value).trim().split(/\s+/)
  const read = (token, fallback) => {
    if (!token) return fallback
    if (token === 'center') return 0.5
    if (token.endsWith('%')) return Number.parseFloat(token) / 100
    return fallback
  }
  return [read(parts[0], 0.5), read(parts[1] ?? parts[0], 0.5)]
}

/* Map the normalised vessel position through the same cover crop the image
   uses, so the marker sits on the vessel at every viewport size, then place
   the information card nearby without covering the vessel. */
const updateVesselLayout = () => {
  const hero = heroEl.value
  const image = imageEl.value
  const card = cardEl.value
  if (!hero || !image || !card) return
  const width = hero.clientWidth
  const height = hero.clientHeight
  if (!width || !height) return

  const imageAspect = (image.naturalWidth || 2048) / (image.naturalHeight || 1152)
  const [posX, posY] = parsePosition(getComputedStyle(image).objectPosition)
  const containerAspect = width / height

  let displayedWidth
  let displayedHeight
  let offsetX = 0
  let offsetY = 0
  if (containerAspect > imageAspect) {
    displayedWidth = width
    displayedHeight = width / imageAspect
    offsetY = -(displayedHeight - height) * posY
  } else {
    displayedHeight = height
    displayedWidth = height * imageAspect
    offsetX = -(displayedWidth - width) * posX
  }

  const mx = offsetX + SHIP_X * displayedWidth
  const my = offsetY + SHIP_Y * displayedHeight
  markerPos.value = { x: mx, y: my }
  markerReady.value = true

  const cardWidth = card.offsetWidth
  const cardHeight = card.offsetHeight
  const gutter = Number.parseFloat(getComputedStyle(hero).paddingLeft) || 32
  const navbar = document.querySelector('.navbar')
  const navBottom = (navbar ? navbar.getBoundingClientRect().height : 88) + 12
  const maxLeft = Math.max(gutter, width - cardWidth - gutter)
  const maxTop = Math.max(navBottom, height - cardHeight - gutter)

  let left
  let top
  if (width >= 860) {
    /* wide: sit above the vessel, or below it when the top is too tight */
    left = Math.min(Math.max(mx - cardWidth / 2, gutter), maxLeft)
    top = my - cardHeight - 56
    if (top < navBottom) top = my + 56
    top = Math.min(Math.max(top, navBottom), maxTop)
  } else {
    /* narrow: keep the card at the bottom, clear of the copy above */
    left = gutter
    top = Math.min(Math.max(height - cardHeight - 64, navBottom), maxTop)
  }

  cardPos.value = { left: `${Math.round(left)}px`, top: `${Math.round(top)}px` }
  cardReady.value = true

  const targetX = Math.min(Math.max(mx, left), left + cardWidth)
  const targetY = Math.min(Math.max(my, top), top + cardHeight)
  link.value = { x1: mx, y1: my, x2: targetX, y2: targetY }
}

let resizeObserver = null

onMounted(() => {
  updateVesselLayout()
  if (typeof ResizeObserver !== 'undefined' && heroEl.value) {
    resizeObserver = new ResizeObserver(updateVesselLayout)
    resizeObserver.observe(heroEl.value)
  }
  window.addEventListener('resize', updateVesselLayout)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updateVesselLayout)
})

const secondaryLabel = computed(() =>
  language.value === 'id' ? 'Tentang AIS ITS' : 'About AIS ITS',
)

const scrollText = computed(() =>
  language.value === 'id' ? 'GULIR UNTUK MENJELAJAHI' : 'SCROLL TO EXPLORE',
)
</script>

<template>
  <section id="home" ref="heroEl" class="hero">
    <!-- MARITIME VISUAL -->
    <div class="hero-media" aria-hidden="true">
      <img
        ref="imageEl"
        class="hero-image"
        :src="heroBackground"
        alt=""
        fetchpriority="high"
        decoding="async"
      />

      <div class="hero-scrim"></div>
    </div>

    <!-- COPY -->
    <div class="hero-inner">
      <div class="hero-copy">
        <h1>{{ t.hero.title }}</h1>

        <p>{{ t.hero.subtitle }}</p>

        <div class="hero-actions">
          <a href="#workflow" class="button button-primary">
            {{ t.hero.button }}
            <span aria-hidden="true">→</span>
          </a>

          <a href="#about" class="button button-secondary">
            {{ secondaryLabel }}
          </a>
        </div>
      </div>
    </div>

    <!-- AIS VESSEL MARKER, CONNECTOR AND INFORMATION CARD -->
    <div
      class="vessel-marker"
      :class="{ 'is-ready': markerReady }"
      :style="{ left: `${markerPos.x}px`, top: `${markerPos.y}px` }"
      aria-hidden="true"
    >
      <span class="vessel-marker__inner">
        <span class="vessel-marker__dot"></span>
      </span>
    </div>

    <svg v-if="markerReady" class="vessel-link" aria-hidden="true">
      <line :x1="link.x1" :y1="link.y1" :x2="link.x2" :y2="link.y2" pathLength="1" />
    </svg>

    <div
      ref="cardEl"
      class="vessel-card-anchor"
      :class="{ 'is-ready': cardReady }"
      :style="cardPos"
    >
      <VesselInfoCard />
    </div>

    <a href="#about" class="scroll-cue">
      <span>{{ scrollText }}</span>
      <i></i>
    </a>
  </section>
</template>

<style scoped>
/* =========================
   HERO SHELL
   ========================= */

.hero {
  --hero-accent: #4da3ff;

  position: relative;
  display: flex;
  min-height: 100svh;
  align-items: center;
  overflow: hidden;
  padding: 8.5rem var(--content-gutter) 7rem;
  background: #061428;
}

/* =========================
   MARITIME VISUAL
   ========================= */

.hero-media {
  position: absolute;
  z-index: 0;
  inset: 0;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* darkens the left for copy, keeps the right open, and blends top/bottom */
.hero-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(3, 10, 24, 0.68) 0%, rgba(3, 10, 24, 0) 26%),
    linear-gradient(0deg, rgba(3, 10, 24, 0.55) 0%, rgba(3, 10, 24, 0) 28%),
    linear-gradient(
      90deg,
      rgba(5, 17, 34, 0.96) 0%,
      rgba(5, 17, 34, 0.85) 22%,
      rgba(5, 17, 34, 0.52) 42%,
      rgba(5, 17, 34, 0.18) 62%,
      rgba(5, 17, 34, 0.03) 82%,
      rgba(5, 17, 34, 0) 100%
    ),
    rgba(6, 20, 40, 0.1);
}

/* =========================
   COPY
   ========================= */

.hero-inner {
  position: relative;
  z-index: 2;
  display: grid;
  width: min(100%, var(--content-width));
  grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
  align-items: center;
  gap: clamp(2rem, 4vw, 4rem);
  margin: 0 auto;
}

.hero-copy {
  max-width: 38rem;
  min-width: 0;
}

.hero h1 {
  max-width: 15ch;
  margin: 0 0 1.4rem;
  color: #fff;
  font-size: clamp(2.7rem, 5.2vw, 4.6rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.03;
  text-shadow: 0 2px 34px rgba(2, 8, 20, 0.4);
  animation: hero-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both;
}

.hero-copy p {
  max-width: 34rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: clamp(1.02rem, 1.2vw, 1.16rem);
  line-height: 1.7;
  text-shadow: 0 1px 18px rgba(2, 8, 20, 0.5);
  animation: hero-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.22s both;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 2.4rem;
  animation: hero-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.32s both;
}

/* =========================
   BUTTONS
   ========================= */

.button {
  display: inline-flex;
  min-height: 3.25rem;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 1.6rem;
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  color: #fff;
  background: var(--color-accent);
}

.button-primary:hover {
  background: var(--color-accent-hover);
}

.button-primary span {
  font-size: 1.05rem;
  line-height: 1;
  transition: transform 0.25s ease;
}

.button-primary:hover span {
  transform: translateX(3px);
}

.button-secondary {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.04);
}

.button-secondary:hover {
  border-color: rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.1);
}

/* =========================
   AIS VESSEL MARKER, CONNECTOR, CARD
   ========================= */

.vessel-marker {
  position: absolute;
  z-index: 3;
  left: 0;
  top: 0;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

.vessel-marker__inner {
  position: relative;
  display: block;
  width: 0.85rem;
  height: 0.85rem;
  opacity: 0;
}

.vessel-marker.is-ready .vessel-marker__inner {
  animation: vessel-marker-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
}

.vessel-marker__dot {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(120, 200, 255, 0.95);
  border-radius: 50%;
  background: rgba(6, 20, 40, 0.85);
  box-shadow: 0 0 12px rgba(77, 163, 255, 0.8);
}

.vessel-link {
  position: absolute;
  z-index: 3;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.vessel-link line {
  stroke: rgba(120, 200, 255, 0.55);
  stroke-width: 1.2;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: vessel-link-draw 0.7s ease 0.45s both;
}

.vessel-card-anchor {
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  width: min(19rem, 34vw);
  visibility: hidden;
  pointer-events: none;
}

.vessel-card-anchor.is-ready {
  visibility: visible;
}

@keyframes vessel-marker-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes vessel-link-draw {
  from {
    stroke-dashoffset: 1;
  }

  to {
    stroke-dashoffset: 0;
  }
}

/* =========================
   SCROLL CUE
   ========================= */

.scroll-cue {
  position: absolute;
  z-index: 3;
  bottom: 2.4rem;
  left: var(--content-gutter);
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  text-shadow: 0 1px 14px rgba(2, 8, 20, 0.6);
  animation: hero-fade 0.9s ease 0.6s both;
}

.scroll-cue span {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.scroll-cue i {
  width: 3rem;
  height: 1px;
  background: rgba(255, 255, 255, 0.6);
  transform-origin: left center;
  animation: cue-line 2.8s ease-in-out infinite;
}

/* =========================
   ANIMATION
   ========================= */

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes cue-line {
  0%,
  100% {
    transform: scaleX(0.45);
    opacity: 0.55;
  }

  50% {
    transform: scaleX(1);
    opacity: 1;
  }
}

/* =========================
   RESPONSIVE
   ========================= */

@media (max-width: 1024px) {
  .hero {
    padding-top: 8rem;
    padding-bottom: 6.5rem;
  }

  .hero h1 {
    font-size: clamp(2.5rem, 5.4vw, 3.6rem);
  }

  .hero-copy {
    max-width: 34rem;
  }

  .vessel-link line {
    stroke: rgba(120, 200, 255, 0.4);
  }
}

@media (max-width: 860px) {
  .hero {
    min-height: 100svh;
    padding-top: 7.5rem;
    /* reserve the bottom for the information card */
    padding-bottom: 22rem;
  }

  .hero-inner {
    grid-template-columns: minmax(0, 1fr);
  }

  .vessel-card-anchor {
    width: min(20rem, calc(100% - 2 * var(--content-gutter)));
  }

  /* portrait crop: shift the image so the vessel stays in frame */
  .hero-image {
    object-position: 76% center;
  }

  .hero-copy {
    max-width: 100%;
  }

  /* stacked copy needs a stronger, more even scrim on the portrait crop */
  .hero-scrim {
    background:
      linear-gradient(
        180deg,
        rgba(3, 10, 24, 0.85) 0%,
        rgba(5, 17, 34, 0.58) 45%,
        rgba(5, 17, 34, 0.85) 100%
      ),
      rgba(6, 20, 40, 0.22);
  }

  .hero h1 {
    max-width: 16ch;
    font-size: clamp(2.4rem, 8vw, 3.4rem);
  }
}

@media (max-width: 520px) {
  .hero {
    padding-top: 7rem;
    padding-bottom: 22rem;
  }

  .hero h1 {
    font-size: clamp(2.1rem, 9vw, 2.8rem);
  }

  .hero-copy p {
    font-size: 1rem;
  }

  .hero-actions {
    width: 100%;
    gap: 0.65rem;
  }

  .button {
    width: 100%;
  }

  .scroll-cue i {
    width: 2rem;
  }
}

/* =========================
   REDUCED MOTION
   ========================= */

@media (prefers-reduced-motion: reduce) {
  .hero h1,
  .hero-copy p,
  .hero-actions,
  .scroll-cue {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }

  .scroll-cue i {
    transform: none !important;
    animation: none !important;
  }

  .vessel-marker__inner {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }

  .vessel-link line {
    stroke-dashoffset: 0 !important;
    animation: none !important;
  }
}
</style>
