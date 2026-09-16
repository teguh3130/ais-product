<script setup>
import { inject } from 'vue'
import FeatureCard from './FeatureCard.vue'
import ewsImage from '../assets/gambar/ews.png'
import inspectionImage from '../assets/gambar/spesification.png'
import movementImage from '../assets/gambar/trackmap.png'

const t = inject('t')

const features = [
  { key: '1', image: ewsImage },
  { key: '2', image: inspectionImage },
  { key: '3', image: movementImage },
]
</script>

<template>
  <section id="Fitur" class="features">
    <div class="features-intro" data-aos="fade-up">
      <span class="eyebrow">ONE SYSTEM. MANY SIGNALS.</span>
      <h2>{{ t.fitur.header }}</h2>
    </div>

    <div class="feature-grid">
      <FeatureCard v-for="(feature, index) in features" :key="feature.key" :feature="feature" :index="index" />
    </div>
  </section>
</template>

<style scoped>
.features {
  padding: var(--section-space) var(--content-gutter);
  background: var(--color-surface);
}

.features-intro,
.feature-grid {
  width: min(100%, var(--content-width));
  margin-right: auto;
  margin-left: auto;
}

.features-intro {
  margin-bottom: clamp(3rem, 7vw, 6rem);
}

.eyebrow {
  color: var(--color-accent);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.features h2 {
  margin: 1.25rem 0 0;
  color: var(--color-text);
  font-size: clamp(3rem, 6vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.07em;
  line-height: 1;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
