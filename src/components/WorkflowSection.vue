<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'

const t = inject('t')
const steps = computed(() => t.value.workflow.steps)
const workflowSection = ref(null)
const isVisible = ref(false)
let observer

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) isVisible.value = true
    },
    { threshold: 0.25 },
  )

  if (workflowSection.value) observer.observe(workflowSection.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section id="workflow" ref="workflowSection" class="workflow" :class="{ visible: isVisible }">
    <div class="workflow-intro" data-aos="fade-up">
      <div>
        <span class="eyebrow">HOW IT WORKS</span>
        <h2>{{ t.workflow.title }}</h2>
      </div>
      <p>{{ t.workflow.description }}</p>
    </div>

    <div class="timeline" aria-label="AIS ITS workflow">
      <div class="timeline-line" aria-hidden="true"></div>
      <article v-for="(step, index) in steps" :key="step.number" class="step">
        <div class="step-marker">
          <span>{{ step.number }}</span>
        </div>
        <div class="step-content">
          <span class="step-icon" aria-hidden="true">{{ step.icon }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </div>
      </article>
    </div>

    <div class="workflow-visual" data-aos="fade-up">
      <img :src="t.workflow.img" alt="AIS ITS workflow visualization" loading="lazy" />
    </div>
  </section>
</template>

<style scoped>
.workflow {
  padding: var(--section-space) var(--content-gutter);
  background: var(--color-background);
}

.workflow-intro,
.timeline,
.workflow-visual {
  width: min(100%, var(--content-width));
  margin-right: auto;
  margin-left: auto;
}

.workflow-intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.7fr);
  align-items: end;
  gap: 4rem;
  margin-bottom: clamp(4rem, 9vw, 8rem);
}

.eyebrow,
.step-icon {
  color: var(--color-accent);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.workflow h2 {
  max-width: 11ch;
  margin: 1.25rem 0 0;
  color: var(--color-text);
  font-size: clamp(3rem, 6vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.07em;
  line-height: 1;
}

.workflow-intro>p {
  max-width: 30rem;
  margin: 0;
  color: var(--color-muted);
  font-size: 1.1rem;
  line-height: 1.75;
}

.timeline {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(1rem, 3vw, 3rem);
}

.timeline-line {
  position: absolute;
  top: 2.1rem;
  right: 9%;
  left: 5%;
  height: 3px;
  background: var(--color-border);
}

.timeline-line::after {
  position: absolute;
  inset: 0;
  background: var(--color-accent);
  content: '';
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 6.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.workflow.visible .timeline-line::after {
  transform: scaleX(1);
}

.step {
  position: relative;
  z-index: 1;
}

.step-marker {
  display: grid;
  width: 4.25rem;
  height: 4.25rem;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text);
  background: var(--color-background);
  font-size: 0.8rem;
  font-weight: 700;
  transition: transform 0.35s ease, color 0.35s ease, background 0.35s ease;
}

.step:hover .step-marker {
  color: #fff;
  background: var(--color-accent);
  transform: translateY(-0.35rem);
}

.step-content {
  max-width: 14rem;
  padding-top: 2rem;
}

.step-icon {
  display: block;
  margin-bottom: 1rem;
  font-size: 1.35rem;
}

.step h3 {
  margin: 0 0 0.8rem;
  color: var(--color-text);
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.15;
}

.step p {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.7;
}

.workflow-visual {
  margin-top: clamp(5rem, 11vw, 10rem);
  overflow: hidden;
  border-radius: var(--radius-image);
  background: var(--color-surface);
}

.workflow-visual img {
  width: 100%;
  max-height: 38rem;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 800px) {
  .workflow-intro {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .timeline {
    grid-template-columns: 1fr;
    gap: 2.25rem;
    padding-left: 1rem;
  }

  .timeline-line {
    top: 2.1rem;
    bottom: 2.1rem;
    left: 3.1rem;
    width: 1px;
    height: auto;
  }

  .timeline-line::after {
    transform: scaleY(0);
    transform-origin: top;
  }

  .workflow.visible .timeline-line::after {
    transform: scaleY(1);
  }

  .step {
    display: grid;
    grid-template-columns: 4.25rem 1fr;
    gap: 1.5rem;
  }

  .step-content {
    max-width: 32rem;
    padding-top: 0.35rem;
  }
}
</style>
