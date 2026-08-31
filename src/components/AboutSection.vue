<script setup>
import { inject } from 'vue'

const t = inject('t')
const language = inject('language')
const toggleLanguage = inject('toggleLanguage')
</script>
<template>
  <section class="about" id="about">

    <h2 class="about-title" data-aos="zoom-in" data-aos-delay="100">
      {{ t.about.subtitle }}
    </h2>

    <div class="about-content">

      <div class="text-column">

        <p data-aos="fade-right" data-aos-delay="300">
          {{ t.about.description[1] }}
        </p>

        <p data-aos="fade-right" data-aos-delay="500">
          {{ t.about.description[2] }}
        </p>

      </div>

      <div class="image-box" data-aos="fade-left" data-aos-delay="400">
        <img src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800" alt="Kapal AIS ITS">
      </div>

    </div>

  </section>
</template>

<style scoped>
.about{
  background:white;
  padding:100px 40px;
}

.about-title{
  text-align:center;
  font-size:42px;
  color:#003366;
  margin-bottom:55px;
}

.about-content{
  max-width:1200px;
  margin:auto;

  display:grid;
  grid-template-columns:1fr 1.05fr;
  gap:60px;
  align-items:center;
}

.text-column p{
  color:#555;
  font-size:17px;
  line-height:1.9;
}

.text-column p + p{
  margin-top:28px;
}

.image-box img{
  width:100%;
  height:430px;
  object-fit:cover;
  border-radius:22px;
  display:block;
}

/* =========================
   MOBILE
========================= */

@media (max-width:768px){

.about{
padding:70px 22px;
}

.about-title{
font-size:32px;
margin-bottom:30px;
}

.about-content{
display:flex;
flex-direction:column;
gap:28px;
}

/* gambar di atas */

.image-box{
order:1;
}

.text-column{
order:2;
}

.image-box img{
width:100%;
height:240px;
object-fit:cover;
border-radius:20px;
}

.text-column p{
font-size:16px;
line-height:1.85;
text-align: justify;
}

.text-column p + p{
margin-top:20px;
}

}
</style>