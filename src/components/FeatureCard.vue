<script setup>
import { inject } from 'vue'

const t = inject('t')

defineProps({
  feature: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <article class="feature-card" :style="{ '--delay': `${index * 100}ms` }" data-aos="fade-up">
    <div class="card-image">
      <img :src="feature.image" :alt="t.fitur.title[feature.key]" loading="lazy" />
    </div>
    <div class="card-copy">
      <span class="card-index">0{{ index + 1 }}</span>
      <h3>{{ t.fitur.title[feature.key] }}</h3>
      <p>{{ t.fitur.description[feature.key] }}</p>
    </div>
  </article>
</template>

<style scoped>
.feature-card {
  display: flex;
  min-height: 34rem;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(17, 17, 17, 0.06);
  border-radius: var(--radius-card);
  background: rgba(247, 246, 242, 0.72);
  box-shadow: 0 1.5rem 4rem rgba(17, 17, 17, 0.06);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease;
}

.feature-card:hover {
  box-shadow: 0 2rem 5rem rgba(17, 17, 17, 0.1);
  transform: translateY(-0.6rem);
}

.card-image {
  display: flex;
  min-height: 16rem;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  overflow: hidden;
  background: linear-gradient(145deg, #eef3ff, #f8f8f5);
}

.card-image img {
  width: 100%;
  height: 15rem;
  object-fit: contain;
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.feature-card:hover .card-image img {
  transform: scale(1.05);
}

.card-copy {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.75rem;
}

.card-index {
  color: var(--color-accent);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.feature-card h3 {
  margin: 1.5rem 0 0.9rem;
  color: var(--color-text);
  font-size: clamp(1.4rem, 2.2vw, 1.75rem);
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 1.1;
}

.feature-card p {
  margin: auto 0 0;
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.7;
}

@media (max-width: 900px) {
  .feature-card {
    min-height: 0;
  }

  .card-image {
    min-height: 14rem;
  }
}
</style>
