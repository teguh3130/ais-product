<script setup>
import { inject } from 'vue'
import overviewImage from '../assets/gambar/1.png'
import shipImage from '../assets/gambar/kapal-bg.webp'

const t = inject('t')
</script>

<template>
  <section id="about" class="about">
    <div class="about-intro" data-aos="fade-up">
      <span class="eyebrow">ABOUT AIS ITS</span>
      <h2>{{ t.about.subtitle }}</h2>
    </div>

    <div class="editorial-row" data-aos="fade-up">
      <div class="editorial-media">
        <img :src="overviewImage" alt="AIS ITS monitoring interface" loading="lazy" />
      </div>
      <div class="editorial-copy">
        <span class="section-index">01 / INTELLIGENCE</span>
        <p>{{ t.about.description[1] }}</p>
      </div>
    </div>

    <div class="editorial-row editorial-row-reverse" data-aos="fade-up">
      <div class="editorial-media">
        <img alt="Vessel tracked by AIS ITS" loading="lazy" />
      </div>
      <div class="editorial-copy">
        <span class="section-index">02 / SAFETY</span>
        <p>{{ t.about.description[2] }}</p>
        <a class="text-link" href="#workflow">Explore the system <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: var(--section-space) var(--content-gutter);
  background: var(--color-surface);
}

.about-intro,
.editorial-row {
  width: min(100%, var(--content-width));
  margin: 0 auto;
}

.about-intro {
  margin-bottom: clamp(4rem, 9vw, 9rem);
}

.eyebrow,
.section-index {
  color: var(--color-accent);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.about h2 {
  max-width: 10ch;
  margin: 1.25rem 0 0;
  color: var(--color-text);
  font-size: clamp(3rem, 6vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.07em;
  line-height: 1;
}

.editorial-row {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(18rem, 0.75fr);
  align-items: center;
  gap: clamp(2rem, 8vw, 8rem);
}

.editorial-row+.editorial-row {
  margin-top: clamp(5rem, 13vw, 12rem);
}

.editorial-row-reverse {
  grid-template-columns: minmax(18rem, 0.75fr) minmax(0, 1.25fr);
}

.editorial-row-reverse .editorial-media {
  order: 2;
}

.editorial-row-reverse .editorial-copy {
  order: 1;
}

.editorial-media {
  overflow: hidden;
  border-radius: var(--radius-image);
  background: var(--color-background);
}

.editorial-media img {
  width: 100%;
  object-fit: cover;
}

.editorial-copy {
  max-width: 28rem;
}

.editorial-copy p {
  margin: 1.5rem 0 0;
  color: var(--color-muted);
  font-size: clamp(1.05rem, 1.5vw, 1.2rem);
  line-height: 1.75;
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
}

.text-link span {
  color: var(--color-accent);
  font-size: 1.2rem;
  transition: transform 0.25s ease;
}

.text-link:hover span {
  transform: translate(0.2rem, -0.2rem);
}

@media (max-width: 760px) {

  .editorial-row,
  .editorial-row-reverse {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .editorial-row-reverse .editorial-media,
  .editorial-row-reverse .editorial-copy {
    order: initial;
  }

  .editorial-copy {
    max-width: 100%;
  }

  .editorial-media img {
    aspect-ratio: 1.2;
  }
}
</style>
