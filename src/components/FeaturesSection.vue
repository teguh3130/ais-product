<script setup>
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import liveTracking from '../assets/gambar/01-live-tracking.png'
import earlyWarning from '../assets/gambar/03-ews.png'
import geofencing from '../assets/gambar/geofancing.png'
import vesselTracking from '../assets/gambar/trackmap.png'
import densityHeatmap from '../assets/gambar/heatmap.png'
import weatherIntelligence from '../assets/gambar/08-weather.png'
import speedMonitoring from '../assets/gambar/speedMonitoring.png'
import copernicusWaveVideo from '../assets/gambar/Screencast_copernicus -wave.webm'
import copernicusWindVideo from '../assets/gambar/Screencast_copernicus -wind.webm'
import windyMapWindVideo from '../assets/gambar/Screencast_windymap -wind.webm'
import copernicusWavePoster from '../assets/gambar/screencast-copernicus-wave.jpg'
import copernicusWindPoster from '../assets/gambar/screencast-copernicus-wind.jpg'
import windyMapWindPoster from '../assets/gambar/screencast-windymap-wind.jpg'

const t = inject('t')

/* Same existing AIS ITS profile video the project already used. */
const videoSrc = 'https://www.youtube.com/embed/cgE5S2BUTdA?rel=0'

/* Real AIS ITS screenshots, one per feature, in the same order as the copy. */
const screenshots = [
  liveTracking,
  earlyWarning,
  geofencing,
  vesselTracking,
  densityHeatmap,
  speedMonitoring,
  weatherIntelligence,
]

/* Existing screenshot features, one card each, unchanged. */
const screenshotFeatures = computed(() =>
  t.value.fitur.items.map((item, index) => ({ ...item, image: screenshots[index] })),
)

/* Dedicated screencast cards. Titles are the real subjects of the recordings;
   posters are frames extracted from the videos themselves. No invented copy. */
const screencastFeatures = [
  {
    title: 'Copernicus Wave',
    description: 'Wave visualization in the Global Copernicus Marine interface.',
    image: copernicusWavePoster,
    video: copernicusWaveVideo,
  },
  {
    title: 'Copernicus Wind',
    description: 'Wind speed visualization in the Global Copernicus Marine interface.',
    image: copernicusWindPoster,
    video: copernicusWindVideo,
  },
  {
    title: 'WindyMap Wind',
    description: 'Wind visualization using the WindyMap interface.',
    image: windyMapWindPoster,
    video: windyMapWindVideo,
  },
]

const features = computed(() => [...screenshotFeatures.value, ...screencastFeatures])

/* -------------------------
   Carousel
   ------------------------- */

const viewport = ref(null)
const activeIndex = ref(0)
const isDragging = ref(false)
const prefersReducedMotion = ref(false)

let cards = []
let dragStartX = 0
let dragStartScroll = 0
let dragDistance = 0
let programmatic = false
let settleTimer = null

const measureCards = () => {
  cards = viewport.value ? Array.from(viewport.value.querySelectorAll('[data-feature-card]')) : []
}

const scrollBehavior = () => (prefersReducedMotion.value ? 'auto' : 'smooth')

const cardCenter = (card) => card.offsetLeft + card.offsetWidth / 2

const nearestIndex = () => {
  if (!viewport.value || cards.length === 0) return 0
  const middle = viewport.value.scrollLeft + viewport.value.clientWidth / 2
  let best = 0
  let bestDistance = Infinity
  cards.forEach((card, index) => {
    const distance = Math.abs(cardCenter(card) - middle)
    if (distance < bestDistance) {
      bestDistance = distance
      best = index
    }
  })
  return best
}

const scrollToIndex = (index) => {
  if (!viewport.value || cards.length === 0) return
  const clamped = Math.max(0, Math.min(cards.length - 1, index))
  const target = cardCenter(cards[clamped]) - viewport.value.clientWidth / 2

  programmatic = true
  activeIndex.value = clamped
  viewport.value.scrollTo({ left: target, behavior: scrollBehavior() })

  const release = () => {
    programmatic = false
    viewport.value?.removeEventListener('scrollend', release)
    clearTimeout(settleTimer)
  }

  if ('onscrollend' in viewport.value) {
    viewport.value.addEventListener('scrollend', release, { once: true })
  }
  clearTimeout(settleTimer)
  settleTimer = setTimeout(release, 700)
}

const goTo = (index) => scrollToIndex(index)

const handleScroll = () => {
  if (programmatic || !viewport.value || cards.length === 0) return
  const index = nearestIndex()
  if (index !== activeIndex.value) activeIndex.value = index
}

const onPointerMove = (event) => {
  if (!isDragging.value) return
  const delta = event.clientX - dragStartX
  dragDistance = Math.max(dragDistance, Math.abs(delta))
  viewport.value.scrollLeft = dragStartScroll - delta
}

const endDrag = () => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', endDrag)
  window.removeEventListener('pointercancel', endDrag)
  if (!isDragging.value) return
  isDragging.value = false
  if (dragDistance > 6 && cards.length > 0) {
    scrollToIndex(nearestIndex())
  }
}

const onPointerDown = (event) => {
  if (event.pointerType === 'touch') return
  if (event.pointerType === 'mouse' && event.button !== 0) return
  isDragging.value = true
  dragStartX = event.clientX
  dragStartScroll = viewport.value.scrollLeft
  dragDistance = 0
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerup', endDrag)
  window.addEventListener('pointercancel', endDrag)
}

const progress = computed(() =>
  features.value.length ? ((activeIndex.value + 1) / features.value.length) * 100 : 0,
)

const syncReducedMotion = () => {
  prefersReducedMotion.value =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* -------------------------
   Lightbox
   ------------------------- */

const modalOpen = ref(false)
const modalIndex = ref(0)
const closeButton = ref(null)
let lastFocused = null

const activeModalFeature = computed(() => features.value[modalIndex.value] ?? null)

const onKeydown = (event) => {
  if (event.key === 'Escape') closeModal()
}

const openModal = (index) => {
  if (dragDistance > 6) {
    dragDistance = 0
    return
  }
  dragDistance = 0
  modalIndex.value = index
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

watch(modalOpen, (open) => {
  if (open) {
    lastFocused = document.activeElement
    document.addEventListener('keydown', onKeydown)
    document.body.style.overflow = 'hidden'
    nextTick(() => closeButton.value?.focus())
  } else {
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
    lastFocused?.focus?.()
  }
})

onMounted(() => {
  measureCards()
  syncReducedMotion()
  window.addEventListener('resize', measureCards)
  window.addEventListener('orientationchange', measureCards)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', measureCards)
  window.removeEventListener('orientationchange', measureCards)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', endDrag)
  window.removeEventListener('pointercancel', endDrag)
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
  clearTimeout(settleTimer)
})
</script>

<template>
  <section id="features" class="features">
    <header class="features-intro" data-aos="fade-up">
      <h2>{{ t.fitur.headline }}</h2>
      <p>{{ t.fitur.support }}</p>
    </header>

    <figure class="features-media" data-aos="fade-up">
      <div class="media-frame">
        <iframe
          :src="videoSrc"
          :title="t.fitur.videoTitle"
          loading="lazy"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
          "
          allowfullscreen
        ></iframe>
      </div>
    </figure>

    <div
      class="carousel"
      role="region"
      aria-roledescription="carousel"
      :aria-label="t.fitur.carouselLabel"
    >
      <div
        ref="viewport"
        class="carousel-viewport"
        :class="{ 'is-dragging': isDragging }"
        @scroll.passive="handleScroll"
        @pointerdown="onPointerDown"
      >
        <ul class="carousel-track">
          <li v-for="(feature, index) in features" :key="feature.title" class="carousel-item">
            <article
              class="feature-card"
              :class="{ 'is-active': activeIndex === index }"
              data-feature-card
            >
              <div class="feature-media">
                <img
                  :src="feature.image"
                  :alt="feature.title"
                  :loading="index === 0 ? 'eager' : 'lazy'"
                />
                <span v-if="feature.video" class="feature-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                </span>
              </div>

              <div class="feature-caption">
                <h3 class="feature-title">{{ feature.title }}</h3>
              </div>

              <button
                type="button"
                class="feature-card-button"
                :aria-label="feature.title"
                @click="openModal(index)"
              ></button>
            </article>
          </li>
        </ul>
      </div>

      <div class="carousel-footer">
        <div
          class="progress"
          role="progressbar"
          :aria-label="t.fitur.progressLabel"
          aria-valuemin="1"
          :aria-valuemax="features.length"
          :aria-valuenow="activeIndex + 1"
        >
          <span class="progress-fill" :style="{ width: `${progress}%` }"></span>
        </div>

        <div class="carousel-nav">
          <button
            type="button"
            class="nav-button"
            :aria-label="t.fitur.prev"
            :disabled="activeIndex === 0"
            @click="goTo(activeIndex - 1)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              aria-hidden="true"
            >
              <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            class="nav-button"
            :aria-label="t.fitur.next"
            :disabled="activeIndex === features.length - 1"
            @click="goTo(activeIndex + 1)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              aria-hidden="true"
            >
              <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="modalOpen && activeModalFeature"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          @click.self="closeModal"
        >
          <div class="lightbox-panel">
            <button
              ref="closeButton"
              type="button"
              class="lightbox-close"
              :aria-label="t.fitur.close"
              @click="closeModal"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
              </svg>
            </button>

            <div class="lightbox-media">
              <video
                v-if="activeModalFeature.video"
                :key="activeModalFeature.video"
                :src="activeModalFeature.video"
                :poster="activeModalFeature.image"
                controls
                playsinline
                preload="metadata"
              ></video>
              <img v-else :src="activeModalFeature.image" :alt="activeModalFeature.title" />
            </div>

            <div class="lightbox-copy">
              <h3 id="lightbox-title">{{ activeModalFeature.title }}</h3>
              <p v-if="activeModalFeature.description">{{ activeModalFeature.description }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.features {
  padding: var(--section-space) 0;
  background: var(--color-surface);
  scroll-margin-top: 6.25rem;
}

/* =========================
   INTRO
   ========================= */

.features-intro {
  width: min(calc(100% - 2 * var(--content-gutter)), var(--content-width));
  margin: 0 auto;
}

.features h2 {
  max-width: 18ch;
  margin: 0;
  color: var(--color-text);
  font-size: clamp(2.3rem, 4.4vw, 3.4rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
}

.features-intro p {
  max-width: 34rem;
  margin: 1.25rem 0 0;
  color: var(--color-muted);
  font-size: clamp(1rem, 1.3vw, 1.12rem);
  line-height: 1.75;
}

/* =========================
   FEATURED MEDIA
   ========================= */

.features-media {
  width: min(calc(100% - 2 * var(--content-gutter)), var(--content-width));
  margin: clamp(2.5rem, 5vw, 4rem) auto 0;
}

.media-frame {
  position: relative;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: #0b1220;
}

.media-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

/* =========================
   CAROUSEL (compact cards)
   ========================= */

.carousel {
  --card-width: clamp(190px, 21vw, 280px);

  margin-top: clamp(3rem, 6vw, 5rem);
}

.carousel-viewport {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  cursor: grab;
}

.carousel-viewport::-webkit-scrollbar {
  display: none;
}

.carousel-viewport.is-dragging {
  cursor: grabbing;
  scroll-snap-type: none;
  user-select: none;
}

.carousel-track {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: clamp(0.75rem, 1.4vw, 1.25rem);
  margin: 0;
  padding: 1rem calc(50% - var(--card-width) / 2) 1.5rem;
  list-style: none;
}

.carousel-item {
  flex: 0 0 auto;
  width: var(--card-width);
  scroll-snap-align: center;
}

.feature-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  color: inherit;
  text-align: left;
  background: var(--color-surface);
  transition: border-color 0.3s ease;
  cursor: pointer;
}

.feature-card.is-active {
  border-color: rgba(10, 92, 255, 0.45);
}

/* The whole card is one control: a stretched button keeps native semantics. */
.feature-card-button {
  position: absolute;
  inset: 0;
  padding: 0;
  border: 0;
  border-radius: inherit;
  background: transparent;
  cursor: pointer;
}

.feature-media {
  position: relative;
  width: 100%;
  margin: 0;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  border-radius: 15px 15px 0 0;
  background: #eef1f6;
}

.feature-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Marks the cards that open a screencast instead of a still. */
.feature-play {
  position: absolute;
  bottom: 0.6rem;
  left: 0.6rem;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: #fff;
  background: rgba(17, 24, 39, 0.55);
}

.feature-play svg {
  width: 1rem;
  height: 1rem;
}

.feature-card:hover .feature-media img,
.feature-card.is-active .feature-media img {
  transform: scale(1.03);
}

.feature-caption {
  padding: 0.85rem 1rem 0.95rem;
}

.feature-title {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(0.92rem, 1vw, 1.08rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

/* =========================
   FOOTER: PROGRESS + NAV
   ========================= */

.carousel-footer {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
  width: min(calc(100% - 2 * var(--content-gutter)), var(--content-width));
  margin: clamp(1.5rem, 3vw, 2.25rem) auto 0;
}

.progress {
  position: relative;
  flex: 1 1 auto;
  height: 2px;
  overflow: hidden;
  border-radius: 2px;
  background: var(--color-border);
}

.progress-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--color-accent);
  transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.carousel-nav {
  display: flex;
  flex: 0 0 auto;
  gap: 0.6rem;
}

.nav-button {
  display: inline-grid;
  place-items: center;
  width: 46px;
  height: 46px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text);
  background: var(--color-surface);
  transition:
    border-color 0.25s ease,
    color 0.25s ease,
    opacity 0.25s ease;
}

.nav-button:hover:not(:disabled) {
  border-color: var(--color-text);
}

.nav-button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.nav-button svg {
  width: 1.1rem;
  height: 1.1rem;
}

/* =========================
   LIGHTBOX
   ========================= */

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: clamp(0.75rem, 3vw, 2.5rem);
  background: rgba(17, 24, 39, 0.62);
}

.lightbox-panel {
  position: relative;
  width: min(1120px, 100%);
  max-height: calc(100vh - 2 * clamp(0.75rem, 3vw, 2.5rem));
  overflow: auto;
  padding: clamp(0.85rem, 1.6vw, 1.25rem);
  border-radius: 16px;
  background: var(--color-surface);
  box-shadow: 0 30px 80px rgba(17, 24, 39, 0.35);
}

.lightbox-close {
  position: absolute;
  top: clamp(0.85rem, 1.6vw, 1.25rem);
  right: clamp(0.85rem, 1.6vw, 1.25rem);
  z-index: 2;
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text);
  background: var(--color-surface);
  cursor: pointer;
  transition: border-color 0.25s ease;
}

.lightbox-close:hover {
  border-color: var(--color-text);
}

.lightbox-close svg {
  width: 1.1rem;
  height: 1.1rem;
}

.lightbox-media {
  display: flex;
  justify-content: center;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: #eef1f6;
}

.lightbox-media img,
.lightbox-media video {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 68vh;
}

.lightbox-media video {
  background: #000;
}

.lightbox-copy {
  padding: 1.25rem 0.5rem 0.25rem;
}

.lightbox-copy h3 {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(1.3rem, 2vw, 1.75rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.lightbox-copy p {
  max-width: 62rem;
  margin: 0.6rem 0 0;
  color: var(--color-muted);
  font-size: 1rem;
  line-height: 1.7;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.22s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active .lightbox-panel,
.lightbox-leave-active .lightbox-panel {
  transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}

.lightbox-enter-from .lightbox-panel,
.lightbox-leave-to .lightbox-panel {
  transform: scale(0.97);
}

/* =========================
   RESPONSIVE
   ========================= */

@media (max-width: 900px) {
  .lightbox {
    padding: 0;
  }

  .lightbox-panel {
    width: 100%;
    max-height: 100vh;
    min-height: 100vh;
    border-radius: 0;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
  }

  .lightbox-media {
    flex: 0 0 auto;
  }

  .lightbox-media img,
  .lightbox-media video {
    max-height: 58vh;
  }

  .lightbox-copy {
    overflow: auto;
    padding: 1rem 0.25rem 1.5rem;
  }
}

@media (max-width: 640px) {
  .carousel {
    --card-width: 68vw;
  }

  .nav-button {
    width: 44px;
    height: 44px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-media img,
  .feature-card:hover .feature-media img,
  .feature-card.is-active .feature-media img {
    transform: none;
    transition: none;
  }

  .progress-fill,
  .lightbox-enter-active,
  .lightbox-leave-active,
  .lightbox-enter-active .lightbox-panel,
  .lightbox-leave-active .lightbox-panel {
    transition: none;
  }
}
</style>
