<script setup>
import { computed, inject } from 'vue'
import logo from '../assets/gambar/logo-aisits.png'

const t = inject('t')
const contactEmail = 'aisits@its.ac.id'
const currentYear = new Date().getFullYear()

const navigation = computed(() => [
  { label: t.value.nav[1], href: '#home' },
  { label: t.value.nav[2], href: '#about' },
  { label: t.value.nav[5], href: '#features' },
  { label: t.value.nav[3], href: '#workflow' },
  { label: t.value.nav[6], href: '#contact' },
])
</script>

<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="footer-grid">
        <!-- BRAND -->
        <div class="footer-brand">
          <a class="brand-mark" href="#home" aria-label="AIS ITS home">
            <img :src="logo" alt="AIS ITS" />
          </a>
          <span class="brand-sub">Automatic Identification System</span>
          <p class="brand-desc">{{ t.footer.deskripsi }}</p>
        </div>

        <!-- EXPLORE -->
        <div class="footer-col">
          <h3>{{ t.footer.explore }}</h3>
          <nav class="nav-list" aria-label="Footer navigation">
            <a v-for="item in navigation" :key="item.href" :href="item.href">{{ item.label }}</a>
          </nav>
        </div>

        <!-- CONTACT -->
        <div class="footer-col">
          <h3>{{ t.footer.contact }}</h3>
          <a class="contact-email" :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
          <span class="contact-location">Kampus ITS, Surabaya</span>
        </div>
      </div>
    </div>

    <!-- BOTTOM BAR -->
    <div class="footer-bottom">
      <div class="bottom-inner">
        <span class="copyright">© {{ currentYear }} AIS ITS</span>
        <span class="its">Institut Teknologi Sepuluh Nopember</span>
        <a class="back-to-top" href="#home" :aria-label="t.footer.backToTop">
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  color: var(--color-text);
  background: var(--color-background);
  border-top: 1px solid var(--color-border);
}

/* =========================
   MAIN
   ========================= */

.footer-main {
  padding: clamp(3.5rem, 7vw, 6rem) var(--content-gutter) clamp(3.5rem, 7vw, 5.5rem);
}

.footer-grid {
  display: grid;
  width: min(100%, var(--content-width));
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 0.8fr) minmax(0, 0.9fr);
  gap: clamp(2.5rem, 6vw, 6rem);
  margin: 0 auto;
}

.footer-brand {
  min-width: 0;
}

.footer-brand img {
  width: 170px;
  height: auto;
}

.brand-sub {
  display: block;
  margin-top: 1rem;
  color: var(--color-muted);
  font-size: 0.8rem;
  letter-spacing: 0.02em;
}

.brand-desc {
  max-width: 28rem;
  margin: 1rem 0 0;
  color: var(--color-muted);
  font-size: 0.92rem;
  line-height: 1.75;
}

.footer-col {
  min-width: 0;
}

.footer-col h3 {
  margin: 0 0 1.1rem;
  color: var(--color-text);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.nav-list a {
  color: var(--color-muted);
  font-size: 0.92rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-list a:hover {
  color: var(--color-accent);
}

.contact-email {
  display: inline-block;
  color: var(--color-text);
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-email:hover {
  color: var(--color-accent);
}

.contact-location {
  display: block;
  margin-top: 0.6rem;
  color: var(--color-muted);
  font-size: 0.92rem;
}

/* =========================
   BOTTOM BAR
   ========================= */

.footer-bottom {
  padding: 0 var(--content-gutter);
  border-top: 1px solid var(--color-border);
}

.bottom-inner {
  display: flex;
  width: min(100%, var(--content-width));
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 0 auto;
  padding: 1.5rem 0;
  color: var(--color-muted);
  font-size: 0.72rem;
}

.copyright,
.its {
  letter-spacing: 0.04em;
}

.back-to-top {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text);
  text-decoration: none;
  transition:
    background 0.25s ease,
    transform 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease;
}

.back-to-top:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-3px);
}

/* =========================
   RESPONSIVE
   ========================= */

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 3rem);
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .footer-brand {
    grid-column: auto;
  }

  .bottom-inner {
    flex-wrap: wrap;
  }

  .back-to-top {
    margin-left: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-list a,
  .contact-email,
  .back-to-top {
    transition: none;
  }

  .back-to-top:hover {
    transform: none;
  }
}
</style>
