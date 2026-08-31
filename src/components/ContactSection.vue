<script setup>
import { ref, inject } from 'vue'

const t = inject('t')

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  alert(`Terima kasih, ${form.value.name}! Pesan berhasil dikirim.`)

  form.value = {
    name: '',
    email: '',
    message: ''
  }
}
</script>
<template>
  <section id="contact" class="contact">
    <div class="container">

      <!-- Informasi -->
      <div class="contact-info">
        <span class="subtitle" data-aos="zoom-in" data-aos-delay="300">{{ t.contact.header[1] }}</span>

        <h2 data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">{{ t.contact.header[2] }}</h2>

        <p data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">
          {{ t.contact.header[3] }}
        </p>

        <div class="info-item" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">
          📍 Kampus ITS, Surabaya
        </div>

        <div class="info-item" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">
          📧 aisits@its.ac.id
        </div>

        <div class="info-item" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">
          📞 +62 31 5994251
        </div>
      </div>

      <!-- Form -->
      <div class="contact-form" data-aos="fade-left" data-aos-delay="300" data-aos-duration="1000">

        <form @submit.prevent="submitForm">

          <input v-model="form.name" type="text" :placeholder="t.contact.form.name" required>

          <input v-model="form.email" type="email" :placeholder="t.contact.form.email" required>

          <textarea v-model="form.message" :placeholder="t.contact.form.message" rows="5" required></textarea>

          <button type="submit">
            {{ t.contact.form.submit }}
          </button>

        </form>

      </div>

    </div>
  </section>
</template>
<style scoped>
.contact {
  padding: 100px 40px;
  background: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: auto;

  display: flex;
  gap: 60px;
  align-items: center;
}

.contact-info,
.contact-form {
  flex: 1;
}

.subtitle {
  color: #0066cc;
  font-weight: bold;
}

h2 {
  font-size: 40px;
  color: #003366;
  margin: 15px 0;
}

.info-item {
  margin-top: 20px;
  color: #555;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

input,
textarea {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #0066cc;
}

button {
  padding: 16px;
  background: #0055aa;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: .3s;
}

button:hover {
  background: #003366;
}

@media(max-width:768px){

.contact{
padding:80px 20px;
}

.contact-container{
display:flex;
flex-direction:column;
gap:28px;
}

.contact-info{
text-align:center;
}

.contact iframe{
width:100%;
height:250px;
}

}
</style>