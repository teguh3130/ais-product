<script setup>
import { computed, inject } from 'vue'

const t = inject('t')
const steps = computed(() => t.value.workflow.steps)

/* Derive "01" to "04" from position so the sequence holds in every language. */
const stepNumber = (index) => String(index + 1).padStart(2, '0')
</script>

<template>
  <section id="workflow" class="workflow">
    <header class="workflow-intro" data-aos="fade-up">
      <h2>{{ t.workflow.title }}</h2>
      <p>{{ t.workflow.support }}</p>
    </header>

    <ol class="process">
      <li
        v-for="(step, index) in steps"
        :key="step.title"
        class="process-step"
        :class="{ 'is-final': index === steps.length - 1 }"
        data-aos="fade-up"
        :data-aos-delay="index * 80"
      >
        <span v-if="index < steps.length - 1" class="step-connector" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
          <span class="connector-pulse"></span>
        </span>

        <span class="step-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <template v-if="index === 0">
              <path d="M3 15h18l-3 4H6z" />
              <path d="M8 15V9h5v6" />
              <path d="M16.5 9V6" />
            </template>
            <template v-else-if="index === 1">
              <path d="M12 20v-9" />
              <path d="M8 20h8" />
              <circle cx="12" cy="10" r="1.3" />
              <path d="M8.6 8.4a4.6 4.6 0 0 1 6.8 0" />
              <path d="M5.8 5.8a8.6 8.6 0 0 1 12.4 0" />
            </template>
            <template v-else-if="index === 2">
              <rect x="5" y="5.5" width="14" height="5" rx="1.5" />
              <rect x="5" y="13.5" width="14" height="5" rx="1.5" />
              <circle cx="8" cy="8" r="0.9" />
              <circle cx="8" cy="16" r="0.9" />
            </template>
            <template v-else>
              <rect x="3" y="5" width="18" height="12" rx="1.5" />
              <path d="M9 20h6M12 17v3" />
              <path d="M7 12.5l3-3 2.4 2 4-4" />
            </template>
          </svg>
        </span>

        <span class="step-number">{{ stepNumber(index) }}</span>
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.workflow {
  padding: var(--section-space) var(--content-gutter);
  background: var(--color-background);
  scroll-margin-top: 6.25rem;
}

/* =========================
   INTRO
   ========================= */

.workflow-intro {
  width: min(100%, var(--content-width));
  margin: 0 auto clamp(4rem, 9vw, 7rem);
}

.workflow h2 {
  max-width: 24ch;
  margin: 0;
  color: var(--color-text);
  font-size: clamp(2.3rem, 4.4vw, 3.4rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
}

.workflow-intro p {
  max-width: 34rem;
  margin: 1.25rem 0 0;
  color: var(--color-muted);
  font-size: clamp(1rem, 1.3vw, 1.12rem);
  line-height: 1.75;
}

/* =========================
   PROCESS
   ========================= */

.process {
  --cycle: 4s;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: min(100%, var(--content-width));
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.process-step {
  position: relative;
  padding: 0 clamp(0.5rem, 1.6vw, 1.25rem);
  text-align: center;
}

/* Thin rail between stages, with a small arrow marking the direction. */
.step-connector {
  position: absolute;
  top: 2.25rem;
  right: calc(-50% + 2.6rem);
  left: calc(50% + 2.6rem);
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--color-muted);
}

.step-connector::before,
.step-connector::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.step-connector svg {
  flex: 0 0 auto;
  width: 0.85rem;
  height: 0.85rem;
}

/* Blue signal that carries the flow from one stage to the next. */
.connector-pulse {
  position: absolute;
  top: 50%;
  left: 0;
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  border-radius: 50%;
  background: var(--color-accent);
  opacity: 0;
  animation: pulse-travel var(--cycle) linear infinite;
}

.step-icon {
  display: inline-grid;
  place-items: center;
  width: 4.5rem;
  height: 4.5rem;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text);
  background: var(--color-surface);
}

.step-icon svg {
  width: 1.6rem;
  height: 1.6rem;
}

.step-number {
  display: block;
  margin-top: 1.5rem;
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  font-variant-numeric: tabular-nums;
}

.process-step h3 {
  margin: 0.4rem 0 0;
  color: var(--color-text);
  font-size: clamp(1rem, 1.25vw, 1.15rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.process-step p {
  max-width: 15rem;
  margin: 0.6rem auto 0;
  color: var(--color-muted);
  font-size: 0.9rem;
  line-height: 1.65;
}

/* The final destination carries the single blue accent. */
.process-step.is-final .step-icon {
  border-color: rgba(10, 92, 255, 0.4);
  color: var(--color-accent);
  background: rgba(10, 92, 255, 0.06);
}

.process-step.is-final .step-number {
  color: var(--color-accent);
}

/* =========================
   DATA FLOW ANIMATION
   Each stage peaks once per cycle, then the pulse travels on. Stage 04 keeps
   its static accent and only settles, so the sequence ends on the destination.
   ========================= */

.process-step:not(.is-final) .step-icon {
  animation: icon-highlight var(--cycle) ease-in-out infinite;
}

.process-step:not(.is-final) .step-number {
  animation: number-highlight var(--cycle) ease-in-out infinite;
}

.process-step.is-final .step-icon {
  animation: icon-settle var(--cycle) ease-in-out infinite;
}

/* Align each stage with the moment the pulse arrives. */
.process-step:nth-child(1) .step-icon,
.process-step:nth-child(1) .step-number {
  animation-delay: calc(var(--cycle) * -0.75);
}

.process-step:nth-child(2) .step-icon,
.process-step:nth-child(2) .step-number {
  animation-delay: calc(var(--cycle) * -0.5);
}

.process-step:nth-child(3) .step-icon,
.process-step:nth-child(3) .step-number {
  animation-delay: calc(var(--cycle) * -0.25);
}

/* Send each connector's pulse one quarter-cycle after the previous stage. */
.process-step:nth-child(1) .connector-pulse {
  animation-delay: 0s;
}

.process-step:nth-child(2) .connector-pulse {
  animation-delay: calc(var(--cycle) * 0.25);
}

.process-step:nth-child(3) .connector-pulse {
  animation-delay: calc(var(--cycle) * 0.5);
}

@keyframes pulse-travel {
  0% {
    left: 0%;
    opacity: 0;
  }

  5% {
    opacity: 1;
  }

  20% {
    opacity: 1;
  }

  25% {
    left: 100%;
    opacity: 0;
  }

  100% {
    left: 100%;
    opacity: 0;
  }
}

@keyframes icon-highlight {
  0%,
  66% {
    color: var(--color-text);
    border-color: var(--color-border);
    background: var(--color-surface);
    transform: scale(1);
  }

  75% {
    color: var(--color-accent);
    border-color: rgba(10, 92, 255, 0.4);
    background: rgba(10, 92, 255, 0.06);
    transform: scale(1.045);
  }

  84%,
  100% {
    color: var(--color-text);
    border-color: var(--color-border);
    background: var(--color-surface);
    transform: scale(1);
  }
}

@keyframes number-highlight {
  0%,
  66% {
    color: var(--color-muted);
  }

  75% {
    color: var(--color-accent);
  }

  84%,
  100% {
    color: var(--color-muted);
  }
}

@keyframes icon-settle {
  0%,
  66% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.05);
  }

  84%,
  100% {
    transform: scale(1);
  }
}

/* =========================
   RESPONSIVE
   ========================= */

@media (max-width: 1024px) {
  .step-icon {
    width: 4rem;
    height: 4rem;
  }

  .step-icon svg {
    width: 1.45rem;
    height: 1.45rem;
  }

  .step-connector {
    top: 2rem;
    right: calc(-50% + 2.3rem);
    left: calc(50% + 2.3rem);
  }

  .process-step p {
    font-size: 0.86rem;
  }
}

@media (max-width: 860px) {
  .workflow-intro {
    margin-bottom: clamp(2.5rem, 7vw, 4rem);
  }

  .process {
    grid-template-columns: minmax(0, 1fr);
  }

  .process-step {
    min-height: 4.5rem;
    padding: 0 0 0 5.5rem;
    text-align: left;
  }

  .process-step + .process-step {
    margin-top: 2.25rem;
  }

  .step-connector {
    display: none;
  }

  /* Turn the rail vertical and connect each stage to the next. */
  .process-step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 4.5rem;
    bottom: -2.25rem;
    left: 2.25rem;
    width: 1px;
    background: var(--color-border);
  }

  .step-icon {
    position: absolute;
    top: 0;
    left: 0;
  }

  .step-number {
    margin-top: 0;
  }

  .process-step p {
    max-width: none;
    margin-right: 0;
    margin-left: 0;
  }
}

/* =========================
   REDUCED MOTION
   ========================= */

@media (prefers-reduced-motion: reduce) {
  .connector-pulse,
  .process-step .step-icon,
  .process-step .step-number {
    animation: none;
  }

  .connector-pulse {
    opacity: 0;
  }
}
</style>
