<template>
  <section id="workflow" class="workflow">

    <div class="header">
      <span class="subtitle">{{ t.workflow.subtitle }}</span>

      <h2>{{ t.workflow.title }}</h2>

      <p>{{ t.workflow.description }}</p>
    </div>

    <div class="timeline">

      <div
        class="step"
        v-for="step in steps"
        :key="step.number"
      >

        <div class="circle">
          {{ step.icon }}
        </div>

        <span class="number">
          {{ step.number }}
        </span>

        <h3>{{ step.title }}</h3>

        <p>{{ step.description }}</p>

      </div>

    </div>

    <div class="img-workflow"><img src="../assets/gambar/kapal-bg.webp" alt="Workflow" width="100%"></div>

  </section>
</template>

<script setup>
import { inject, computed } from 'vue'

const t = inject('t')

const steps = computed(() => t.value.workflow.steps)
</script>

<style scoped>

.workflow{
  padding:100px 40px;
  background:white;
}

.header{
  max-width:800px;
  margin:auto;
  text-align:center;
  margin-bottom:70px;
}

.subtitle{
  color:#0066cc;
  font-weight:bold;
}

h2{
  font-size:42px;
  color:#003366;
  margin:15px 0;
}

.header p{
  color:#666;
  line-height:1.8;
}

.timeline{
  max-width:1200px;
  margin:auto;

  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:30px;
}

.step{
  text-align:center;
  position:relative;
}

.circle{
  width:90px;
  height:90px;

  margin:auto;

  border-radius:50%;

  background:#0055aa;
  color:white;

  display:flex;
  justify-content:center;
  align-items:center;

  font-size:40px;

  box-shadow:0 15px 30px rgba(0,85,170,.25);
}

.number{
  display:inline-block;
  margin-top:18px;
  color:#007bff;
  font-weight:bold;
}

.step h3{
  margin:15px 0;
  color:#003366;
}

.step p{
  color:#666;
  line-height:1.7;
}

.img-workflow{
  text-align:center;
  padding: 20px;
  margin:20px;
  border: #666 7px solid;
  border-radius: 20px;
}

@media(max-width:900px){

.timeline{
grid-template-columns:repeat(2,1fr);
}

}

@media(max-width:600px){

.timeline{
grid-template-columns:1fr;
}

}

</style>