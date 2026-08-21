<template>
  <section id="workflow" class="workflow" ref="workflowSection" :class="{'active': isVisible}">

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
import { inject, computed, ref, onMounted } from 'vue'

const t = inject('t')

const steps = computed(() => t.value.workflow.steps)

const workflowSection = ref(null)
const isVisible = ref(false)

onMounted(() => {
  if (!workflowSection.value) return

  const observer = new IntersectionObserver(

    ([entry]) => {

      if(entry.isIntersecting){
        isVisible.value = true
      }

    },

    {
      threshold:0.3
    }

  )

  observer.observe(workflowSection.value)

})
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

.step::after{
  content:"";
  position:absolute;
  top:45px;
  left:60%;
  width:90%;
  height:4px;
  background:#4AA3FF;
  border-radius:999px;
  transform:scaleX(0);
  transform-origin:left;
  transition:transform 2s ease;
  z-index:0;
}

.step:last-child::after{
  display:none;
}

.circle{
  width:90px;
  height:90px;
  position:relative;
  z-index:2;
  margin:auto;
  border-radius:50%;
  background:#0055aa;
  color:white;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:40px;
  box-shadow:0 15px 30px rgba(0,85,170,.25);
  opacity:0;
  transform:translateY(25px) scale(.85);
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

.workflow.active .step::after{
  transform:scaleX(1);
}

.workflow.active .step:nth-child(1) .circle{
animation:popUp .5s ease forwards;
animation-delay:.2s;
}

.workflow.active .step:nth-child(2) .circle{
animation:popUp .5s ease forwards;
animation-delay:.5s;
}

.workflow.active .step:nth-child(3) .circle{
animation:popUp .5s ease forwards;
animation-delay:.8s;
}

.workflow.active .step:nth-child(4) .circle{
animation:popUp .5s ease forwards;
animation-delay:1.1s;
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

@keyframes popUp{

from{
opacity:0;
transform:translateY(25px) scale(.85);
}

to{
opacity:1;
transform:translateY(0) scale(1);
}

}

@media(max-width:600px){

.timeline{
grid-template-columns:1fr;
}

}

</style>