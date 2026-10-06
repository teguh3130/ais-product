<script setup>
import { inject } from 'vue'

const t = inject('t')

const vessel = {
  name: 'KM. DEMO MARITIME',
  mmsi: '525012345',
  type: 'Cargo Ship',
  speed: '12.4 kn',
  course: '087°',
  heading: '090°',
  destination: 'Surabaya',
  status: 'Under way',
}
</script>

<template>
  <aside class="vessel-card" :aria-label="t.vesselCard.ariaLabel">
    <header class="vessel-card__head">
      <span class="vessel-card__title">{{ t.vesselCard.title }}</span>
      <span class="vessel-card__badge">{{ t.vesselCard.badge }}</span>
    </header>

    <dl class="vessel-card__grid">
      <div class="vessel-card__item vessel-card__item--wide">
        <dt>{{ t.vesselCard.fields.name }}</dt>
        <dd>{{ vessel.name }}</dd>
      </div>
      <div class="vessel-card__item">
        <dt>{{ t.vesselCard.fields.mmsi }}</dt>
        <dd>{{ vessel.mmsi }}</dd>
      </div>
      <div class="vessel-card__item">
        <dt>{{ t.vesselCard.fields.type }}</dt>
        <dd>{{ vessel.type }}</dd>
      </div>
      <div class="vessel-card__item">
        <dt>{{ t.vesselCard.fields.speed }}</dt>
        <dd>{{ vessel.speed }}</dd>
      </div>
      <div class="vessel-card__item">
        <dt>{{ t.vesselCard.fields.course }}</dt>
        <dd>{{ vessel.course }}</dd>
      </div>
      <div class="vessel-card__item">
        <dt>{{ t.vesselCard.fields.heading }}</dt>
        <dd>{{ vessel.heading }}</dd>
      </div>
      <div class="vessel-card__item">
        <dt>{{ t.vesselCard.fields.destination }}</dt>
        <dd>{{ vessel.destination }}</dd>
      </div>
      <div class="vessel-card__item vessel-card__item--wide">
        <dt>{{ t.vesselCard.fields.status }}</dt>
        <dd>{{ vessel.status }}</dd>
      </div>
    </dl>

    <p class="vessel-card__note">{{ t.vesselCard.note }}</p>
  </aside>
</template>

<style scoped>
.vessel-card {
  width: 100%;
  padding: 0.9rem 1rem 1rem;
  border: 1px solid rgba(120, 180, 255, 0.22);
  border-radius: 12px;
  background: linear-gradient(160deg, rgba(9, 24, 50, 0.82) 0%, rgba(4, 14, 32, 0.72) 100%);
  box-shadow: 0 24px 60px rgba(2, 10, 24, 0.45);
  color: #fff;
  backdrop-filter: blur(14px) saturate(130%);
  -webkit-backdrop-filter: blur(14px) saturate(130%);
  animation: vessel-card-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.7s both;
}

.vessel-card__head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.vessel-card__title {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

/* Neutral "illustrative" badge. Deliberately not green, so the example data
   never reads as a live AIS connection. */
.vessel-card__badge {
  margin-left: auto;
  padding: 0.18rem 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 6px;
  color: #fff;
  background: rgba(255, 255, 255, 0.16);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.vessel-card__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.55rem 0.9rem;
  margin: 0.8rem 0 0;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.vessel-card__item {
  min-width: 0;
}

.vessel-card__item--wide {
  grid-column: 1 / -1;
}

.vessel-card__item dt {
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.vessel-card__item dd {
  margin: 0.15rem 0 0;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.3;
}

.vessel-card__note {
  margin: 0.8rem 0 0;
  padding-top: 0.7rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.68);
  font-size: 0.62rem;
  line-height: 1.5;
  letter-spacing: 0.02em;
}

@keyframes vessel-card-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .vessel-card {
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
</style>
