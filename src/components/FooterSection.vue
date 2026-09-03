<template>
  <footer class="footer">
    <div class="container">

      <!-- Kolom 1 -->
      <div class="footer-brand">
        <img src="../assets/gambar/logo-aisits-2.png" alt="AIS ITS Logo" width="100%">
        <!-- <h2>AIS ITS</h2> -->

        <p>
          {{t.footer.deskripsi}}
        </p>
      </div>

      <!-- Kolom 2 -->
      <div class="footer-column">
        <h3>Navigasi</h3>

        <!-- <a v-for="link in navLinks" :key="link.name" :href="link.href">
          {{ link.name }}
        </a> -->
        <a href="#">{{ t.nav[1] }}</a>
        <a href="#about">{{ t.nav[2]}}</a>
        <a href="#workflow">{{ t.nav[3] }}</a>
        <a href="#gallery">{{ t.nav[4] }}</a>
        <a href="#Fitur">{{ t.nav[5] }}</a>
        <a href="#contact">{{ t.nav[6] }}</a>

      </div>

      <!-- Kolom 3 -->
      <div class="footer-column">
        <h3>Fitur Utama</h3>

        <a v-for="product in products" :key="product" href="#Fitur">
          {{ product }}
        </a>

      </div>

      <!-- Kolom 4 -->
      <div class="footer-column">
        <h3>Kontak</h3>

        <p>📍 Kampus ITS Surabaya</p>
        <p>📧 aisits@its.ac.id</p>
        <p>📞 +62 31 5994251</p>
      </div>

    </div>

    <div class="footer-bottom">
      © 2026 AIS ITS. All Rights Reserved.
    </div>
  </footer>
</template>

<script setup>

import { inject } from 'vue'

const t = inject('t')

// const navLinks = [
//   { name: "Home", href: "#" },
//   { name: "Tentang", href: "#about" },
//   { name: "Fitur", href: "#Fitur" },
//   { name: "Kontak", href: "#contact" }
// ]

const products = [
  "Early Warning System",
  "Ship Inspection System",
  "Ship Movement Recording"
]

</script>
<style scoped>
.footer {
  background: #14142b;
  color: white;
  padding-top: 70px;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 0 40px 50px;

  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.2fr;
  gap: 40px;
}

.footer-brand h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

.footer-brand p {
  color: #d5e6ff;
  line-height: 1.8;
}

.footer-column h3 {
  margin-bottom: 20px;
  color: white;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-column a {
  color: #d5e6ff;
  text-decoration: none;
  transition: .3s;
}

.footer-column a:hover {
  color: #7ec8ff;
  transform: translateX(5px);
}

.footer-column p {
  color: #d5e6ff;
}

.footer-bottom {
  text-align: center;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, .15);
  color: #c6d9f2;
}

@media(max-width:900px) {

  .container {
    grid-template-columns: 1fr 1fr;
  }

}

@media(max-width:600px) {

  .container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-column {
    align-items: center;
  }

  .footer-brand img{
    width: 100%;
  }

}
</style>