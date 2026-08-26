<script setup>
import { inject } from 'vue'

const t = inject('t')
</script>
<template>
  <section class="hero">
    <div class="content" data-aos="fade-up" data-aos-delay="100">
      <h1>{{ t.hero.title }}</h1>

      <p data-aos="fade-up" data-aos-delay="300">
        {{ t.hero.subtitle }}
      </p>

      <a href="#about"><button class="btn-learn" data-aos="zoom-in" data-aos-delay="500">{{ t.hero.button }}</button></a>

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
</style>