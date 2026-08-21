
<script setup>
import { ref } from 'vue'

import ews from '../assets/gambar/ews.png'
import inspection from '../assets/gambar/spesification.png'
import movement from '../assets/gambar/trackmap.png'

const gallery = [

  {
    title: "Early Warning System",
    short: "Peringatan area berbahaya.",
    description:
      "Sistem memberikan peringatan dini ketika kapal mendekati area berisiko.",
    image: ews
  },

  {
    title: "Ship Inspection System",
    short: "Analisis inspeksi kapal.",
    description:
      "Membantu otoritas pelabuhan melakukan evaluasi risiko kapal.",
    image: inspection
  },

  {
    title: "Ship Movement Recording",
    short: "Riwayat pergerakan kapal.",
    description:
      "Menyimpan data historis AIS untuk analisis perjalanan kapal.",
    image: movement
  }

]

const selectedImage = ref(null)

const openImage = (item) => {
  selectedImage.value = item
}

const closeImage = () => {
  selectedImage.value = null
}
</script>
<template>
  <section id="gallery" class="gallery">

    <div class="header">
      <span class="subtitle">Galeri Produk</span>
      <h2>Visualisasi AIS ITS</h2>
      <p>
        Beberapa tampilan produk dan sistem yang dikembangkan
        untuk monitoring kapal berbasis AIS.
      </p>
    </div>

    <div class="gallery-grid">

      <div
        class="gallery-card"
        v-for="item in gallery"
        :key="item.title"
        @click="openImage(item)"
      >

        <img
          :src="item.image"
          :alt="item.title"
        >

        <div class="overlay">
          <h3>{{ item.title }}</h3>
          <p>{{ item.short }}</p>
        </div>

      </div>

    </div>

    <div
      v-if="selectedImage"
      class="modal"
      @click="closeImage"
    >

      <div
        class="modal-content"
        @click.stop
      >

        <button
          class="close-btn"
          @click="closeImage"
        >
          ✕
        </button>

        <img
          :src="selectedImage.image"
          :alt="selectedImage.title"
        >

        <h3>{{ selectedImage.title }}</h3>

        <p>{{ selectedImage.description }}</p>

      </div>

    </div>

  </section>
</template>

<style scoped>

.gallery{
  padding:100px 40px;
  background:#f8fafc;
}

.header{
  max-width:800px;
  margin:auto;
  text-align:center;
  margin-bottom:60px;
}

.subtitle{
  color:#0066cc;
  font-weight:bold;
}

.header h2{
  font-size:42px;
  color:#003366;
}

.gallery-grid{
  max-width:1200px;
  margin:auto;

  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:30px;
}

.gallery-card{
  position:relative;
  overflow:hidden;
  border-radius:18px;
  cursor:pointer;
  box-shadow:0 10px 25px rgba(0,0,0,.08);
}

.gallery-card img{
  width:100%;
  height:240px;
  object-fit:cover;
  transition:.5s;
}

.gallery-card:hover img{
  transform:scale(1.08);
}

.overlay{
  position:absolute;
  inset:0;

  background:linear-gradient(
    transparent,
    rgba(0,40,80,.85)
  );

  display:flex;
  flex-direction:column;
  justify-content:end;

  padding:24px;
  color:white;
}

.modal{
  position:fixed;
  inset:0;

  background:rgba(0,0,0,.7);

  display:flex;
  justify-content:center;
  align-items:center;

  z-index:1000;
}

.modal-content{
  background:white;
  width:min(90%,800px);
  border-radius:18px;
  padding:24px;
  position:relative;
}

.modal-content img{
  width:100%;
  border-radius:12px;
}

.close-btn{
  position:absolute;
  top:16px;
  right:16px;

  border:none;
  background:#003366;
  color:white;

  width:36px;
  height:36px;
  border-radius:50%;

  cursor:pointer;
}

</style>