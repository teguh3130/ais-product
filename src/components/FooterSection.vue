<script setup>
import { computed, inject } from 'vue'

const t = inject('t')

const navigation = computed(() => [
  { label: t.value.nav[1], href: '#home' },
  { label: t.value.nav[2], href: '#about' },
  { label: t.value.nav[3], href: '#workflow' },
  { label: t.value.nav[4], href: '#gallery' },
  { label: t.value.nav[5], href: '#Fitur' },
  { label: t.value.nav[6], href: '#contact' },
])
</script>

<template>
  <footer class="footer">
    <div class="footer-top">
      <a class="footer-brand" href="#home" aria-label="AIS ITS home">
        <img src="../assets/gambar/logo-aisits.png" alt="AIS ITS" />
      </a>
      <p>{{ t.footer.deskripsi }}</p>
      <a class="back-to-top" href="#home" aria-label="Back to top">↑</a>
    </div>

    <div class="footer-bottom">
      <span>© 2026 AIS ITS</span>
      <nav aria-label="Footer navigation">
        <a v-for="item in navigation" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>
      <span>ITS Surabaya</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 3rem var(--content-gutter) 1.5rem;
  color: var(--color-text);
  background: var(--color-background);
}

.footer-top,
.footer-bottom {
  display: flex;
  width: min(100%, var(--content-width));
  margin-right: auto;
  margin-left: auto;
}

.footer-top {
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 5rem;
}

.footer-brand img {
  width: 200px;
  height: auto;
}

.footer-top p {
  max-width: 22rem;
  margin: 0;
  color: var(--color-muted);
  font-size: 0.85rem;
  line-height: 1.7;
}

.back-to-top {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text);
  text-decoration: none;
  transition: background 0.25s ease, transform 0.25s ease;
}

.back-to-top:hover {
  background: var(--color-surface);
  transform: translateY(-3px);
}

.footer-bottom {
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  color: var(--color-muted);
  font-size: 0.72rem;
}

.footer-bottom nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.footer-bottom a {
  text-decoration: none;
  transition: color 0.25s ease;
}

.footer-bottom a:hover {
  color: var(--color-text);
}

@media (max-width: 760px) {
  .footer-top {
    display: grid;
    grid-template-columns: 1fr auto;
    padding-bottom: 3rem;
  }

  .footer-top p {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  .footer-bottom {
    align-items: flex-start;
    flex-direction: column;
  }

  .footer-bottom nav {
    justify-content: flex-start;
  }
}
</style>
