<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import demoVideo from '../assets/video/test.mp4'
import ewsImage from '../assets/gambar/ews.png'
import inspectionImage from '../assets/gambar/spesification.png'
import movementImage from '../assets/gambar/trackmap.png'

const t = inject('t')
const selectedSlide = ref(null)

const slides = computed(() => [
  { key: 1, type: 'video', file: demoVideo },
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

const handleKeydown = (event) => {
  if (event.key === 'Escape') closeLightbox()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))
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
        <video v-if="slide.type === 'video'" :src="slide.file" muted loop autoplay playsinline></video>
        <img v-else :src="slide.file" :alt="t.gallery.judul[slide.key]" loading="lazy" />
        <span class="gallery-label">{{ t.gallery.judul[slide.key] }} <b aria-hidden="true">↗</b></span>
      </button>
    </div>

    <Transition name="lightbox">
      <div v-if="selectedSlide" class="lightbox" role="dialog" aria-modal="true" @click="closeLightbox">
        <div class="lightbox-panel" @click.stop>
          <button class="close-button" type="button" aria-label="Close gallery" @click="closeLightbox">×</button>
          <video v-if="selectedSlide.type === 'video'" :src="selectedSlide.file" controls autoplay muted
            playsinline></video>
          <img v-else :src="selectedSlide.file" :alt="t.gallery.judul[selectedSlide.key]" />
          <div class="lightbox-copy">
            <span class="eyebrow">AIS ITS / {{ String(selectedSlide.key).padStart(2, '0') }}</span>
            <h3>{{ t.gallery.judul[selectedSlide.key] }}</h3>
            <p>{{ t.gallery.deskripsi[selectedSlide.key] }}</p>
          </div>
        </div>
      </div>
    </Transition>
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

.gallery-item video,
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

.gallery-item:hover video,
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
  margin-top: 80px;
  z-index: 2000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgba(17, 17, 17, 0.72);
  backdrop-filter: blur(18px);
}

.lightbox-panel {
  position: relative;
  width: min(100%, 68rem);
  max-height: 94svh;
  overflow: auto;
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.24);
}

.lightbox-panel video,
.lightbox-panel>img {
  display: block;
  width: 100%;
  max-height: 70svh;
  object-fit: contain;
  background: #111;
}

.lightbox-copy {
  padding: 1.5rem clamp(1.25rem, 4vw, 2.5rem) 2rem;
}

.lightbox-copy h3 {
  margin: 0.8rem 0 0.35rem;
  color: var(--color-text);
  font-size: 1.5rem;
}

.lightbox-copy p {
  margin: 0;
  color: var(--color-muted);
}

.close-button {
  position: absolute;
  z-index: 1;
  top: 1rem;
  right: 1rem;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  border-radius: 50%;
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.86);
  font-size: 1.7rem;
  line-height: 1;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
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
}
</style>
