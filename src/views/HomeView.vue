<script setup>
import HeroSection from '../components/HeroSection.vue'
import Navbar from '../components/Navbar.vue'
import AboutSection from '../components/AboutSection.vue'
import Features from '../components/Features.vue';
import ContactSection from '../components/ContactSection.vue'
import FooterSection from '../components/FooterSection.vue'
import WorkflowSection from '../components/WorkflowSection.vue';
</script>
<template>
  <Navbar />

  <!-- <section class="hero">
    <div class="content">
      <h1>Automatic Identification System ITS</h1>

      <p>
        Solusi teknologi maritim untuk pemantauan kapal secara real-time,
        analisis data AIS, dan pengembangan sistem monitoring berbasis ITS.
      </p>

      <button class="btn-learn">Pelajari Produk</button>
    </div>
  </section> -->

  <HeroSection />

  <AboutSection />

  <WorkflowSection />

  <Features />

  <ContactSection />

  <FooterSection />

</template>
