<script setup>
  import { inject } from 'vue'

  const t = inject('t')
</script>
<template>
    <section class="hero">
        <div class="content">
        <h1>{{t.hero.title}}</h1>

        <p>
            {{t.hero.subtitle}}
        </p>

        <a href="#about"><button class="btn-learn">{{t.hero.button}}</button></a>
        
        </div>
    </section>
</template>
<style scoped>
  .btn-learn{
    background-color: white;
    color: #00285a;
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>