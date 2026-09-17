<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ewsImage from '../assets/gambar/ews.png'
import inspectionImage from '../assets/gambar/spesification.png'
import movementImage from '../assets/gambar/trackmap.png'

const t = inject('t')
const selectedSlide = ref(null)
let savedScrollPosition = 0

const slides = computed(() => [
  { key: 1, type: 'video', file: 'https://www.youtube.com/embed/cgE5S2BUTdA?rel=0' },
  { key: 2, type: 'image', file: ewsImage },
  { key: 3, type: 'image', file: inspectionImage },
  { key: 4, type: 'image', file: movementImage },
])

const openLightbox = (slide) => {
  selectedSlide.value = slide
}

const closeLightbox = () => {
  selectedSlide.value = null
}

watch(selectedSlide, (slide) => {
  if (slide) {
    savedScrollPosition = window.scrollY
    document.body.classList.add('modal-open')
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedScrollPosition}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    return
  }

  document.body.classList.remove('modal-open')
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  window.scrollTo(0, savedScrollPosition)
})

const handleKeydown = (event) => {
  if (event.key === 'Escape') closeLightbox()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('modal-open')
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  window.scrollTo(0, savedScrollPosition)
})
</script>

<template>
  <section id="gallery" class="gallery">
    <div class="gallery-intro" data-aos="fade-up">
      <div>
        <span class="eyebrow">IN THE FIELD</span>
        <h2>{{ t.gallery.header[2] }}</h2>
      </div>
      <p>{{ t.gallery.header[3] }}</p>
    </div>

    <div class="gallery-grid">
      <button v-for="(slide, index) in slides" :key="slide.key" class="gallery-item"
        :class="`gallery-item-${index + 1}`" type="button" data-aos="fade-up" :data-aos-delay="index * 100"
        @click="openLightbox(slide)">
        <iframe v-if="slide.type === 'video'" :src="slide.file" :title="t.gallery[`item${slide.key}`].title"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
        <img v-else :src="slide.file" :alt="t.gallery[`item${slide.key}`].title" loading="lazy" />
        <span class="gallery-label">{{ t.gallery[`item${slide.key}`].title }} <b aria-hidden="true">↗</b></span>
      </button>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="selectedSlide" class="lightbox" role="dialog" aria-modal="true" @click="closeLightbox">
          <div class="gallery-modal" @click.stop>
            <button class="gallery-close" type="button" aria-label="Close gallery" @click="closeLightbox">×</button>
            <div class="gallery-media">
              <iframe v-if="selectedSlide.type === 'video'" :src="selectedSlide.file"
                :title="t.gallery[`item${selectedSlide.key}`].title"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
              <img v-else :src="selectedSlide.file" :alt="t.gallery[`item${selectedSlide.key}`].title" />
            </div>
            <div class="gallery-info">
              <span class="eyebrow">{{ t.gallery[`item${selectedSlide.key}`].label }}</span>
              <h3>{{ t.gallery[`item${selectedSlide.key}`].title }}</h3>
              <p>{{ t.gallery[`item${selectedSlide.key}`].description }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.gallery {
  padding: var(--section-space) var(--content-gutter);
  background: var(--color-background);
}

.gallery-intro,
.gallery-grid {
  width: min(100%, var(--content-width));
  margin-right: auto;
  margin-left: auto;
}

.gallery-intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.7fr);
  align-items: end;
  gap: 4rem;
  margin-bottom: clamp(3rem, 7vw, 6rem);
}

.eyebrow {
  color: var(--color-accent);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.gallery h2 {
  max-width: 12ch;
  margin: 1.25rem 0 0;
  color: var(--color-text);
  font-size: clamp(3rem, 6vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.07em;
  line-height: 1;
}

.gallery-intro p {
  max-width: 30rem;
  margin: 0;
  color: var(--color-muted);
  font-size: 1.1rem;
  line-height: 1.75;
}

.gallery-grid {
  columns: 2 20rem;
  column-gap: 1rem;
}

.gallery-item {
  position: relative;
  display: block;
  width: 100%;
  min-height: 18rem;
  margin: 0 0 1rem;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: var(--radius-image);
  background: var(--color-surface);
  cursor: zoom-in;
  break-inside: avoid;
}

.gallery-item-1 {
  min-height: 27rem;
}

.gallery-item-3 {
  min-height: 24rem;
}

.gallery-item iframe,
.gallery-item img {
  width: 100%;
  height: 100%;
  min-height: inherit;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s ease;
}

.gallery-item img {
  object-fit: contain;
  padding: 1rem;
  background: #eef3ff;
}

.gallery-item:hover iframe,
.gallery-item:hover img {
  filter: brightness(0.78);
  transform: scale(1.045);
}

.gallery-label {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: var(--radius-pill);
  color: #fff;
  background: rgba(17, 17, 17, 0.28);
  backdrop-filter: blur(12px);
  font-size: 0.8rem;
  text-align: left;
}

.gallery-label b {
  color: #fff;
  font-size: 1.1rem;
}

.lightbox {
  position: fixed;
  z-index: 9999;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  padding-top: max(32px, env(safe-area-inset-top));
  padding-bottom: max(32px, env(safe-area-inset-bottom));
  box-sizing: border-box;
  overflow: auto;
  background: rgba(10, 12, 20, 0.55);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
}

.gallery-modal {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(1200px, 95vw);
  height: min(92vh, 900px);
  border-radius: 28px;
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.28);
}

.gallery-media {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  background: #111;
}

.gallery-media img,
.gallery-media iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  object-fit: contain;
  background: #111;
}

.gallery-info {
  flex: 0 0 170px;
  min-height: 0;
  overflow-y: auto;
  padding: 28px 32px;
  background: var(--color-surface);
  scrollbar-color: rgba(17, 24, 39, 0.28) transparent;
  scrollbar-width: thin;
}

.gallery-info::-webkit-scrollbar {
  width: 6px;
}

.gallery-info::-webkit-scrollbar-track {
  background: transparent;
}

.gallery-info::-webkit-scrollbar-thumb {
  border-radius: var(--radius-pill);
  background: rgba(17, 24, 39, 0.28);
}

.gallery-info h3 {
  margin: 0.8rem 0 0.35rem;
  color: var(--color-text);
  font-size: 1.5rem;
}

.gallery-info p {
  margin: 0;
  color: var(--color-muted);
}

.gallery-close {
  position: absolute;
  z-index: 10;
  top: 16px;
  right: 16px;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  font-size: 1.7rem;
  line-height: 1;
  transition: transform 220ms cubic-bezier(.22, 1, .36, 1), background 220ms ease;
}

.gallery-close:hover {
  background: rgba(255, 255, 255, 0.92);
  transform: scale(1.08) rotate(90deg);
}

.gallery-close:active {
  transform: scale(0.95);
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 280ms cubic-bezier(.22, 1, .36, 1);
}

.lightbox-enter-active .gallery-modal,
.lightbox-leave-active .gallery-modal {
  transition: transform 280ms cubic-bezier(.22, 1, .36, 1);
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-from .gallery-modal,
.lightbox-leave-to .gallery-modal {
  transform: scale(0.96);
}

@media (max-width: 760px) {
  .gallery-intro {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .gallery-grid {
    columns: 1;
  }

  .gallery-item,
  .gallery-item-1,
  .gallery-item-3 {
    min-height: 17rem;
  }

  .lightbox {
    padding: 16px;
    padding-top: max(16px, env(safe-area-inset-top));
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }

  .gallery-modal {
    width: 100%;
    height: min(92vh, 900px);
    border-radius: 20px;
  }

  .gallery-info {
    flex-basis: 200px;
    padding: 24px 20px;
  }

  .gallery-media iframe {
    aspect-ratio: 16 / 9;
    height: auto;
    min-height: 100%;
  }

  .gallery-close {
    width: 44px;
    height: 44px;
  }
}

@media (min-width: 761px) and (max-width: 1100px) {
  .gallery-modal {
    border-radius: 24px;
  }

  .gallery-info {
    flex-basis: 180px;
  }
}
</style>
