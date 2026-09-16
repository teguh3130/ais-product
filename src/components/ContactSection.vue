<script setup>
import { inject, ref } from 'vue'

const t = inject('t')
const form = ref({ name: '', email: '', message: '' })

const submitForm = () => {
  alert(`Terima kasih, ${form.value.name}! Pesan berhasil dikirim.`)
  form.value = { name: '', email: '', message: '' }
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="contact-inner">
      <div class="contact-copy" data-aos="fade-up">
        <span class="eyebrow">LET'S CONNECT</span>
        <h2>{{ t.contact.header[2] }}</h2>
        <p>{{ t.contact.header[3] }}</p>
        <div class="contact-details">
          <a href="mailto:aisits@its.ac.id">aisits@its.ac.id</a>
          <span>Kampus ITS, Surabaya</span>
        </div>
      </div>

      <form class="contact-form" data-aos="fade-up" data-aos-delay="150" @submit.prevent="submitForm">
        <label>
          <span>{{ t.contact.form.name }}</span>
          <input v-model="form.name" type="text" autocomplete="name" required />
        </label>
        <label>
          <span>{{ t.contact.form.email }}</span>
          <input v-model="form.email" type="email" autocomplete="email" required />
        </label>
        <label>
          <span>{{ t.contact.form.message }}</span>
          <textarea v-model="form.message" rows="4" required></textarea>
        </label>
        <button class="submit-button" type="submit">
          {{ t.contact.form.submit }} <span aria-hidden="true">↗</span>
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: var(--section-space) var(--content-gutter);
  background: var(--color-surface);
}

.contact-inner {
  display: grid;
  width: min(100%, var(--content-width));
  grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.8fr);
  align-items: start;
  gap: clamp(3rem, 10vw, 10rem);
  margin: 0 auto;
}

.eyebrow {
  color: var(--color-accent);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.contact h2 {
  max-width: 10ch;
  margin: 1.25rem 0 1.5rem;
  color: var(--color-text);
  font-size: clamp(3.5rem, 7vw, 5rem);
  font-weight: 600;
  letter-spacing: -0.08em;
  line-height: 0.95;
}

.contact-copy > p {
  max-width: 30rem;
  margin: 0;
  color: var(--color-muted);
  font-size: 1.1rem;
  line-height: 1.75;
}

.contact-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  margin-top: 2.5rem;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.contact-details a {
  color: var(--color-text);
  font-weight: 600;
  text-decoration: none;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 0.5rem;
}

.contact-form label {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.contact-form label span {
  color: var(--color-muted);
  font-size: 0.75rem;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem 0;
  border: 0;
  border-bottom: 1px solid var(--color-border);
  border-radius: 0;
  outline: 0;
  color: var(--color-text);
  background: transparent;
  resize: vertical;
  transition: border-color 0.25s ease;
}

input:focus,
textarea:focus {
  border-color: var(--color-accent);
}

.submit-button {
  align-self: flex-start;
  padding: 1rem 1.4rem;
  border: 0;
  border-radius: var(--radius-pill);
  color: #fff;
  background: var(--color-accent);
  font-size: 0.9rem;
  font-weight: 600;
  transition: transform 0.25s ease, background 0.25s ease;
}

.submit-button span {
  display: inline-block;
  margin-left: 0.5rem;
  transition: transform 0.25s ease;
}

.submit-button:hover {
  background: var(--color-accent-hover);
  transform: translateY(-3px);
}

.submit-button:hover span {
  transform: translate(0.2rem, -0.2rem);
}

@media (max-width: 760px) {
  .contact-inner {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .contact h2 {
    max-width: 12ch;
  }
}
</style>
