<script setup>
  import { inject } from 'vue'

  const t = inject('t')
  const language = inject('language')
  const toggleLanguage = inject('toggleLanguage')
</script>
<template>
  <section class="about" id="about">
    <div class="container">

      <div class="left">
        <h2>{{t.about.subtitle}}</h2>
          
        <p>
          {{t.about.description}}
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