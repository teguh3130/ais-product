<script setup>
import { inject, ref, onMounted, onBeforeUnmount } from 'vue'

import demoVideo from '../assets/video/test.mp4'
import ews from '../assets/gambar/ews.png'
import inspection from '../assets/gambar/spesification.png'
import movement from '../assets/gambar/trackmap.png'

const t = inject('t')

const slides = [
  {
    type: 'video',
    file: demoVideo
  },
  {
    type: 'image',
    file: ews
  },
  {
    type: 'image',
    file: inspection
  },
  {
    type: 'image',
    file: movement
  }
]

const current = ref(0)

const nextSlide = () => {
  current.value = (current.value + 1) % slides.length
}

const prevSlide = () => {
  current.value = (current.value - 1 + slides.length) % slides.length
}

let interval

onMounted(() => {
  interval = setInterval(nextSlide, 5000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})

</script>
<template>

  <section id="gallery" class="gallery">

    <div class="header" data-aos="fade-down" data-aos-delay="300" data-aos-duration="1000">
      <h2 class="subtitle">{{ t.gallery.header[1] }}</h2>

      <h3>{{t.gallery.header[2]}}</h3>

      {{t.gallery.header[3]}}

    </div>

    <div class="carousel-wrapper">

      <button class="nav prev" @click="prevSlide">
        ❮

      </button>

      <div class="carousel" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="500">

        <div v-for="(slide, index) in slides" :key="index" class="card" :class="{
          active: index === current,
          left: index === ((current - 1 + slides.length) % slides.length),
          right: index === ((current + 1) % slides.length)
        }">

          <video v-if="slide.type === 'video'" :src="slide.file" autoplay muted loop playsinline></video>

          <img v-else :src="slide.file" :alt="t.gallery.judul[index + 1]"/>

          <div class="overlay">

            <!-- <badge>{{ slide.type === 'video' ? 'Demo' : 'Product' }}</badge> -->

            {{ t.gallery.judul[index + 1] }} #
            {{ t.gallery.deskripsi[index + 1] }}

          </div>

        </div>

      </div>

      <button class="nav next" @click="nextSlide">
        ❯

      </button>

    </div>

    <div class="dots">

      <span v-for="(_, index) in slides" :key="index" class="dot" :class="{ active: index === current }"
        @click="current = index"></span>

    </div>

  </section>

</template>
<style scoped>
.gallery {
  padding: 100px 30px;
  background: #f8fafc;
  overflow: hidden;
}

.header {
  text-align: center;
  max-width: 700px;
  margin: auto auto 60px;
}

.subtitle {
  color: #007bff;
  font-weight: bold;
}

.header h2 {
  font-size: 42px;
  color: #003366;
  margin: 15px 0;
}
.header h3 {
  color: #003366;
  margin: 15px 0;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 460px;
}

.card {
  position: absolute;
  top: 0;
  left: 50%;
  width: 68%;
  height: 100%;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, .15);
  transition: .6s ease;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%) scale(.85);
}

.card img,
.card video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 7px solid rgb(98, 98, 202);
  border-radius: 22px;
}

.card.active {
  opacity: 1;
  transform: translateX(-50%) scale(1);
  z-index: 3;
  pointer-events: auto;
}

.card.left {
  opacity: .75;
  transform: translateX(-92%) scale(.82);
  z-index: 2;
}

.card.right {
  opacity: .75;
  transform: translateX(-8%) scale(.82);
  z-index: 2;
}

.overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 28px;
  color: white;
  background: linear-gradient(transparent, rgba(0, 20, 60, .9));
}

.nav {
  position: absolute;
  width: 58px;
  height: 58px;
  border: none;
  border-radius: 50%;
  background: white;
  font-size: 28px;
  cursor: pointer;
  z-index: 5;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .15);
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.nav:hover {
  transform: scale(1.05);
}

.dots {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 35px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #cbd5e1;
  cursor: pointer;
  transition: .3s;
}

.dot.active {
  background: #0055aa;
  transform: scale(1.4);
}

@media(max-width:768px) {

  .carousel {
    height: 320px;
  }

  .card {
    width: 88%;
  }

  .card.left,
  .card.right {
    opacity: 0;
    transform: translateX(-50%) scale(.9);
  }

}
</style>