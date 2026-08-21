<script setup>
import FeatureCard from './FeatureCard.vue'
import ews from '../assets/gambar/ews.png'
import inspection from '../assets/gambar/spesification.png'
import movement from '../assets/gambar/trackmap.png'

    const Features = [
        {
            icon: '🚨',
            title: 'Early Warning System(EWS)',
            description: 'Sistem peringatan dini untuk memberi tahu kapal jika mendekati area berbahaya, pipa bawah laut, platform lepas pantai, atau saat penurunan jangkar.'
        },
        {
            icon: '📊',
            title: 'Ship Inspection System (Inspeksi Kapal)',
            description: 'Membantu pihak Syahbandar / Otoritas Pelabuhan (Port Authority) dalam menilai tingkat risiko kapal sebelum atau sesudah memasuki pelabuhan.'
        },
        {
            icon: '💻',
            title: 'Ship Movement Recording (Perekaman Pergerakan Kapal)',
            description: 'Mengumpulkan data AIS dari berbagai sumber (AISHUB, IPSWITCH, LAPAN) untuk menyimpan riwayat pergerakan kapal (historical data).'
        }
    ]
</script>
<template>
    <section id="Fitur" class="fitur">
        <h2 class="fitur-title">Fitur Utama AIS ITS</h2>
        <div class="container">
        <FeatureCard
            v-for="features in Features"
            :key="features.title"
            :icon="features.icon"
            :title="features.title"
            :description="features.description"
        />
        </div>
    </section>
</template>
<style>
  .container{
    display: grid;
    /* flex-direction: column; */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin:20px;
  }
  .fitur{
    padding: 100px 40px;
    background-color: #f5f5f5;
  }
  .fitur-title{
    text-align: center;
    font-size: 36px;
    color: #00285a;
    margin-bottom: 40px;
  }
</style>