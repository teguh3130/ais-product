<script setup>
import { inject } from 'vue'

const t = inject('t')
</script>
<template>
  <section id="home" class="hero">
    <div class="content" data-aos="fade-up" data-aos-delay="100">
      <h1>{{ t.hero.title }}</h1>

      <p data-aos="fade-up" data-aos-delay="300">
        {{ t.hero.subtitle }}
      </p>

      <a href="#about"><button class="btn-learn" data-aos="zoom-in" data-aos-delay="500">{{ t.hero.button
          }}</button></a>

    </div>
  </section>
</template>
<style scoped>
.btn-learn {
  background-color: white;
  color: #00285a;
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* ===========================
   MOBILE (≤768px)
=========================== */

@media (max-width:768px) {

  .hero {
    min-height: 100vh;
    padding: 90px 20px 60px;

    background-position: center;
    background-size: cover;
  }

  .hero-content {
    max-width: 100%;
    text-align: center;
  }

  .hero h1 {
    font-size: 34px;
    line-height: 1.15;
    margin-bottom: 18px;
  }

  .hero p {
    font-size: 16px;
    line-height: 1.7;
    margin-bottom: 30px;
  }

  .hero-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .hero-btn {
    width: 100%;
    max-width: 240px;
    padding: 15px 20px;
    font-size: 15px;
    border-radius: 14px;
    font-weight: 600;
  }

}
</style>