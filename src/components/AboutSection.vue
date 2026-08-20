<template>
  <section class="about" id="about">
    <div class="container">

      <div class="left">
        <h2>Tentang AIS ITS</h2>

        <p>
          AISITS adalah sistem identifikasi otomatis dan perangkat keselamatan maritim yang dikembangkan oleh ITS untuk mencegah kecelakaan di laut.
        </p>

        <p>
          Fungsi Utama sistem ini adalah Menerima, menyimpan, dan memproses data AIS dari kapal dan platform lepas pantai (offshore platform) untuk mengamankan navigasi, melindungi pipa bawah laut (subsea pipeline), serta platform lepas pantai.
        </p>
      </div>

      <div class="right">
        <img
          src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800"
          alt="Kapal AIS ITS"
        >
      </div>

    </div>
  </section>
</template>

<style scoped>

.about{
  background:white;
  padding:100px 40px;
}

.container{
  max-width:1200px;
  margin:auto;

  display:flex;
  align-items:center;
  gap:60px;
}

.left{
  flex:1;
}

.right{
  flex:1;
}

.right img{
  width:100%;
  border-radius:20px;
}

h2{
  font-size:40px;
  color:#003366;
  margin-bottom:20px;
}

p{
  color:#555;
  line-height:1.8;
  margin-bottom:20px;
}

@media(max-width:768px){

.container{
flex-direction:column;
}

h2{
text-align:center;
}

}

</style>