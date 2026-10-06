<script setup>
import { inject } from 'vue'

const t = inject('t')
const contactEmail = 'aisits@its.ac.id'
const mailtoHref = `mailto:${contactEmail}`
</script>

<template>
  <section id="contact" class="contact">
    <div class="contact-inner">
      <!-- LEFT: statement -->
      <div class="contact-copy" data-aos="fade-up">
        <h2>{{ t.contact.headline }}</h2>
        <p>{{ t.contact.support }}</p>
      </div>

      <!-- RIGHT: direct contact, no form -->
      <div class="contact-direct" data-aos="fade-up" data-aos-delay="100">
        <div class="contact-details">
          <a class="contact-email" :href="mailtoHref">{{ contactEmail }}</a>
          <span class="contact-location">{{ t.contact.location }}</span>
        </div>

        <a class="contact-cta" :href="mailtoHref">
          {{ t.contact.emailCta }}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: clamp(4.5rem, 8vw, 7rem) var(--content-gutter);
  background: var(--color-surface);
  scroll-margin-top: 6.25rem;
}

/* =========================
   LAYOUT
   ========================= */

.contact-inner {
  display: grid;
  width: min(100%, var(--content-width));
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.85fr);
  align-items: start;
  gap: clamp(3rem, 8vw, 8rem);
  margin: 0 auto;
}

.contact h2 {
  max-width: 16ch;
  margin: 0 0 1.5rem;
  color: var(--color-text);
  font-size: clamp(2.3rem, 4.4vw, 3.4rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
}

.contact-copy p {
  max-width: 34rem;
  margin: 0;
  color: var(--color-muted);
  font-size: clamp(1rem, 1.2vw, 1.12rem);
  line-height: 1.75;
}

/* =========================
   DIRECT CONTACT
   ========================= */

.contact-direct {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  padding-top: clamp(0.5rem, 1.5vw, 1rem);
  border-top: 1px solid var(--color-border);
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.contact-email {
  width: fit-content;
  color: var(--color-text);
  font-size: clamp(1.35rem, 2.4vw, 1.9rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-email:hover {
  color: var(--color-accent);
}

.contact-location {
  color: var(--color-muted);
  font-size: 0.95rem;
}

.contact-cta {
  display: inline-flex;
  min-height: 3.25rem;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 1.6rem;
  border-radius: 12px;
  color: #fff;
  background: var(--color-accent);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    background 0.25s ease;
}

.contact-cta:hover {
  background: var(--color-accent-hover);
  transform: translateY(-2px);
}

.contact-cta span {
  transition: transform 0.25s ease;
}

.contact-cta:hover span {
  transform: translateX(3px);
}

/* =========================
   RESPONSIVE
   ========================= */

@media (max-width: 900px) {
  .contact-inner {
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 3rem);
  }

  .contact h2 {
    max-width: 100%;
  }
}

@media (max-width: 520px) {
  .contact h2 {
    font-size: clamp(2rem, 8.5vw, 2.7rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-email,
  .contact-cta,
  .contact-cta span {
    transition: none;
  }

  .contact-cta:hover {
    transform: none;
  }

  .contact-cta:hover span {
    transform: none;
  }
}
</style>
