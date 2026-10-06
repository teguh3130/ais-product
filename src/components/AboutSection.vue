<script setup>
import { inject } from 'vue'
import aboutVisual from '../assets/gambar/safety.png'

const t = inject('t')

const focusKeys = ['safety', 'research', 'collaboration']
</script>

<template>
  <section id="about" class="about">
    <!-- MAIN: copy left, large visual right -->
    <div class="about-main">
      <div class="about-copy" data-aos="fade-up">
        <h2>{{ t.about.headline }}</h2>
        <div class="about-description">
          <p>{{ t.about.description[1] }}</p>
          <p>{{ t.about.description[2] }}</p>
        </div>
      </div>

      <figure class="about-visual" data-aos="fade-up" data-aos-delay="100">
        <img :src="aboutVisual" :alt="t.about.visualAlt" loading="lazy" />
      </figure>
    </div>

    <!-- OUR FOCUS -->
    <div class="about-focus">
      <h3 class="focus-heading">{{ t.about.focus.headline }}</h3>
      <div class="focus-grid">
        <article
          v-for="(key, index) in focusKeys"
          :key="key"
          class="focus-item"
          data-aos="fade-up"
          :data-aos-delay="index * 80"
        >
          <h4>{{ t.about.focus.items[key].title }}</h4>
          <p>{{ t.about.focus.items[key].description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  --about-width: 1360px;

  padding: clamp(4.5rem, 6vw, 5.5rem) var(--content-gutter) var(--section-space);
  background: var(--color-background);
  scroll-margin-top: 6.25rem;
}

/* =========================
   MAIN COMPOSITION
   ========================= */

.about-main {
  display: grid;
  width: min(100%, var(--about-width));
  grid-template-columns: minmax(0, 42fr) minmax(0, 58fr);
  align-items: center;
  gap: clamp(2.5rem, 5vw, 5rem);
  margin: 0 auto;
}

.about-copy {
  min-width: 0;
  max-width: 37.5rem;
}

.about h2 {
  max-width: 37.5rem;
  margin: 0 0 1.75rem;
  color: var(--color-text);
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 0.98;
  text-wrap: balance;
}

.about-description {
  max-width: 35rem;
}

.about-description p {
  margin: 0 0 1.1rem;
  color: var(--color-muted);
  font-size: 1.125rem;
  line-height: 1.75;
}

.about-description p:last-child {
  margin-bottom: 0;
}

/* The large visual is the section's anchor: edge-to-edge in its column. */
.about-visual {
  min-width: 0;
  margin: 0;
}

.about-visual img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(17, 24, 39, 0.05);
}

/* =========================
   OUR FOCUS
   ========================= */

.about-focus {
  width: min(100%, var(--about-width));
  margin: clamp(4rem, 8vw, 7rem) auto 0;
  /* Nudge the focus columns down from the divider (~32px) without moving it. */
  padding-top: calc(clamp(2.5rem, 5vw, 4rem) + 2rem);
  border-top: 1px solid var(--color-border);
}

.focus-heading {
  max-width: 34ch;
  margin: 0 0 clamp(2rem, 4vw, 3rem);
  color: var(--color-text);
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.focus-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.focus-item {
  min-width: 0;
  padding: 0 clamp(1.25rem, 2.5vw, 2.5rem);
  border-left: 1px solid var(--color-border);
}

.focus-item:first-child {
  padding-left: 0;
  border-left: 0;
}

.focus-item:last-child {
  padding-right: 0;
}

.focus-item h4 {
  margin: 0 0 0.6rem;
  color: var(--color-text);
  font-size: 1.55rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.focus-item p {
  margin: 0;
  color: var(--color-muted);
  font-size: 1rem;
  line-height: 1.7;
}

/* =========================
   RESPONSIVE
   ========================= */

@media (max-width: 760px) {
  .about-main {
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 3rem);
  }

  .about-copy {
    max-width: 100%;
  }

  .about h2 {
    max-width: 100%;
  }

  .about-focus {
    margin-top: clamp(3rem, 7vw, 4.5rem);
  }

  .focus-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .focus-item {
    padding: 1.5rem 0;
    border-left: 0;
    border-top: 1px solid var(--color-border);
  }

  .focus-item:first-child {
    padding-top: 0;
    border-top: 0;
  }
}
</style>
