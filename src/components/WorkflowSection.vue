<template>
  <section id="workflow" class="workflow" ref="workflowSection" :class="{ 'active': isVisible }">

    <div class="header">
      <span class="subtitle" data-aos="fade-down" data-aos-delay="700">{{ t.workflow.subtitle }}</span>

      <h2 data-aos="zoom-in" data-aos-delay="200">{{ t.workflow.title }}</h2>

      <p data-aos="zoom-in" data-aos-delay="300">{{ t.workflow.description }}</p>
    </div>

    <div class="timeline">

      <div class="step" v-for="step in steps" :key="step.number">

        <div class="circle">
          {{ step.icon }}
        </div>

        <div class="content">

          <span class="number">
            {{ step.number }}
          </span>

          <h3 data-aos="fade-right" data-aos-delay="700">{{ step.title }}</h3>

          <p data-aos="fade-right" data-aos-delay="700">{{ step.description }}</p>

        </div>
        
      </div>

    </div>

    <img :src="t.workflow.img" alt="Workflow" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="1000"/>

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

      if (entry.isIntersecting) {
        isVisible.value = true
      }

    },

    {
      threshold: 0.3
    }

  )

  observer.observe(workflowSection.value)

})
</script>

<style scoped>
.workflow {
  padding: 100px 40px;
  background: white;
}

.header {
  max-width: 800px;
  margin: auto;
  text-align: center;
  margin-bottom: 70px;
}

.subtitle {
  color: #0066cc;
  font-weight: bold;
}

h2 {
  font-size: 42px;
  color: #003366;
  margin: 15px 0;
}

.header p {
  color: #666;
  line-height: 1.8;
}

.timeline {
  max-width: 1200px;
  margin: auto;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.content{
  display:flex;
  flex-direction:column;
}

.step {
  text-align: center;
  position: relative;
}

.step::after {
  content: "";
  position: absolute;
  top: 45px;
  left: 60%;
  width: 90%;
  height: 4px;
  background: #4AA3FF;
  border-radius: 999px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 2s ease;
  z-index: 0;
}

.step:last-child::after {
  display: none;
}

.circle {
  width: 90px;
  height: 90px;
  position: relative;
  z-index: 2;
  margin: auto;
  border-radius: 50%;
  background: #0055aa;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  box-shadow: 0 15px 30px rgba(0, 85, 170, .25);
  opacity: 1;
  /* transform: translateY(25px) scale(.85); */
}

.number {
  display: inline-block;
  margin-top: 18px;
  color: #007bff;
  font-weight: bold;
}

.step h3 {
  margin: 15px 0;
  color: #003366;
}

.step p {
  color: #666;
  line-height: 1.7;
}

.workflow.active .step .circle{
  animation:popUp .5s ease forwards;
}

.workflow.active .step::after {
  transform: scaleX(1);
}

.workflow.active .step:nth-child(1) .circle {
  animation: popUp .5s ease forwards;
  animation-delay: .2s;
}

.workflow.active .step:nth-child(2) .circle {
  animation: popUp .5s ease forwards;
  animation-delay: .5s;
}

.workflow.active .step:nth-child(3) .circle {
  animation: popUp .5s ease forwards;
  animation-delay: .8s;
}

.workflow.active .step:nth-child(4) .circle {
  animation: popUp .5s ease forwards;
  animation-delay: 1.1s;
}

img {
  width: 97%;
  height: auto;
  margin: 20px;
  object-fit: cover;
  border: #2e5a6b 13px solid;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.753);
}

@media(max-width:900px) {

  .timeline {
    grid-template-columns: repeat(2, 1fr);
  }

}

@keyframes popUp {

  from {
    opacity: 0;
    transform: translateY(25px) scale(.85);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

}

@media(max-width:768px){

  .workflow{
    padding:80px 22px;
  }

  .header{
    margin-bottom:45px;
  }

  .header h2{
    font-size:32px;
  }

  .header p{
    font-size:15px;
  }

  .timeline{
    display:flex;
    flex-direction:column;
    gap:36px;
    position:relative;
  }

  /* garis vertikal */
  .step:not(:last-child)::before{
    content:"";
    position:absolute;
    left:29px;      /* sejajar dengan tengah icon */
    top:60px;       /* mulai dari bawah icon */
    width:3px;
    height:calc(100% + 36px); /* sambung ke langkah berikutnya */
    background:#4AA3FF;
    border-radius:999px;
    z-index:1;
  }

  .step{
    display:grid;
    grid-template-columns:60px 1fr;
    gap:18px;
    align-items:start;
    text-align:left;
    position:relative;
  }

  .step::after{
    display:none;
  }

  .circle{
    width:60px;
    height:60px;
    margin:0;
    font-size:28px;
    z-index:2;
  }

  .content{
    display:flex;
    flex-direction:column;
    gap:8px;
  }

  .number{
    display:none;
  }

  .content h3{
    margin:0;
    font-size:20px;
    color:#003366;
  }

  .content p{
    margin:0;
    font-size:15px;
    line-height:1.8;
    color:#666;
  }

  img{
    width:100%;
    margin:45px 0 0;
    border-width:8px;
    border-radius:16px;
  }
}
</style>