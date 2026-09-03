<script setup>
import { inject, ref, onMounted, onBeforeUnmount } from 'vue'

const t = inject('t')
const language = inject('language')
const toggleLanguage = inject('toggleLanguage')
const menuOpen = ref(false)
const activeSection = ref('home')

const sections = [
  'home',
  'about',
  'workflow',
  'Fitur',
  'gallery',
  'contact'
]

const handleScroll = () => {

  const scrollPosition = window.scrollY + 120

  sections.forEach((id) => {

    const section = document.getElementById(id)

    if (!section) return

    const top = section.offsetTop
    const bottom = top + section.offsetHeight

    if (scrollPosition >= top && scrollPosition < bottom) {
      activeSection.value = id
    }

  })

}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // cek posisi saat halaman pertama kali dibuka
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
  <nav class="navbar">
    <div class="logo">
      <a href="#">
        <img src="../assets/gambar/logo-aisits-2.png" alt="AIS ITS Logo" width="90">
      </a>
    </div>

    <!-- Menu Desktop -->
    <div class="menu desktop-menu">
      <a href="#home" :class="{ active: activeSection==='home' }">{{ t.nav[1] }}</a>
      <a href="#about" :class="{ active: activeSection==='about' }">{{ t.nav[2] }}</a>
      <a href="#workflow" :class="{ active: activeSection==='workflow' }">{{ t.nav[3] }}</a>
      <a href="#Fitur" :class="{ active: activeSection==='Fitur' }">{{ t.nav[5] }}</a>
      <a href="#gallery" :class="{ active: activeSection==='gallery' }">{{ t.nav[4] }}</a>
      <a href="#contact" :class="{ active: activeSection==='contact' }">{{ t.nav[6] }}</a>
    </div>

    <div class="right-side">

      <div class="lang-switch">
        <button :class="{ active: language === 'id' }" @click="toggleLanguage">ID</button>
        <button :class="{ active: language === 'en' }" @click="toggleLanguage">EN</button>
      </div>

      <!-- Tombol Hamburger -->
      <button
        class="menu-btn"
        :class="{ open: menuOpen }"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>
  </nav>
<!-- Untuk Hp/Mobile -->
  <!-- Overlay Blur -->
  <Transition name="overlay">
    <div
      v-if="menuOpen"
      class="overlay"
      @click="closeMenu"
    ></div>
  </Transition>

  <!-- Drawer -->
  <Transition name="drawer">
    <aside
      v-if="menuOpen"
      class="drawer"
    >
    <a href="#home" :class="{ active: activeSection==='home' }" @click="activeSection='home'; closeMenu()">{{ t.nav[1] }}</a>
    <a href="#about" :class="{ active: activeSection==='about' }" @click="activeSection='about'; closeMenu()">{{ t.nav[2] }}</a>
      <a href="#workflow" :class="{ active: activeSection==='workflow' }" @click="activeSection='workflow'; closeMenu()">{{ t.nav[3] }}</a>
      <a href="#Fitur" :class="{ active: activeSection==='Fitur' }" @click="activeSection='Fitur'; closeMenu()">{{ t.nav[5] }}</a>
      <a href="#gallery" :class="{ active: activeSection==='gallery' }" @click="activeSection='gallery'; closeMenu()">{{ t.nav[4] }}</a>
      <a href="#contact" :class="{ active: activeSection==='contact' }" @click="activeSection='contact'; closeMenu()">{{ t.nav[6] }}</a>
    </aside>
  </Transition>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background: #100858;
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.logo {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.menu {
  display: flex;
  gap: 30px;
}

.menu a {
  color: white;
  text-decoration: none;
  transition: 0.3s;
  position:relative;
}

.menu a::after{
  content:"";

  position:absolute;

  left:0;
  bottom:-8px;

  width:100%;
  height:3px;

  background:#4AA3FF;

  border-radius:999px;

  transform:scaleX(0);

  transition:.3s;
}

.menu a.active{
  color:#7ec8ff;
}

.menu a.active::after{
  transform:scaleX(1);
}

.menu a:hover {
  color: #7ec8ff;
}

.lang-switch {
  display: flex;
  background: rgba(255, 255, 255, .15);
  padding: 4px;
  border-radius: 999px;
}

.lang-switch button {
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 999px;
}

.lang-switch button.active {
  background: white;
}

.overlay{
  position:fixed;
  inset:0;

  background:rgba(5,10,25,.35);
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);

  z-index:998;
}

/*  KANAN NAVBAR  */

.right-side{
  display:flex;
  align-items:center;
  gap:16px;
}

/* Tombol hamburger */

.menu-btn{
  display:none;

  width:44px;
  height:44px;

  position:relative;

  border:none;
  background:transparent;

  cursor:pointer;
}

.menu-btn span{
  position:absolute;

  left:10px;

  width:24px;
  height:2px;

  background:white;

  transition:.35s;
}

.menu-btn span:nth-child(1){
  top:14px;
}

.menu-btn span:nth-child(2){
  top:21px;
}

.menu-btn span:nth-child(3){
  top:28px;
}

/* berubah jadi X */

.menu-btn.open span:nth-child(1){
  transform:rotate(45deg);
  top:21px;
}

.menu-btn.open span:nth-child(2){
  opacity:0;
}

.menu-btn.open span:nth-child(3){
  transform:rotate(-45deg);
  top:21px;
}

.menu-btn:hover{
  background:rgba(255,255,255,.22);
}

.menu-btn:active{
  transform: translateY(5px) scale(.95);
}

/* Animasi Drawer */

.drawer{
  position:fixed;

  top:0;
  right:0;

  width:260px;
  height:100vh;

  padding:90px 28px;

  display:flex;
  flex-direction:column;
  gap:24px;

  background:rgba(16,8,88,.96);
  backdrop-filter:blur(18px);

  box-shadow:-15px 0 40px rgba(0,0,0,.25);

  z-index:999;
}

.drawer a{
  color:white;
  text-decoration:none;
  font-size:18px;
  font-weight:500;
  position:relative;
  padding-left:18px;
  transition:.25s;
}

.drawer a::before{

  content:"";

  position:absolute;

  left:0;
  top:50%;

  width:3px;
  height:0;

  background:#4AA3FF;

  border-radius:999px;

  transform:translateY(-50%);

  transition:.3s;

}

.drawer a.active{
  color:#7ec8ff;
}

.drawer a.active::before{
  height:22px;
}

.drawer a:hover{
  color:#7ec8ff;
  transform:translateX(6px);
}

.drawer-enter-active,
.drawer-leave-active{
  transition:.35s cubic-bezier(.22,1,.36,1);
}

.drawer-enter-from,
.drawer-leave-to{
  transform:translateX(100%);
}

.overlay-enter-active,
.overlay-leave-active{
  transition:.25s;
}

.overlay-enter-from,
.overlay-leave-to{
  opacity:0;
}
/* ===== MOBILE ===== */

@media (max-width:768px) {

  .navbar {
    padding: 14px 20px;
  }

  .logo img {
    width: 72px;
  }

  .desktop-menu {
    display: none;
  }

  .menu-btn {
    display: block;
    align-items: center;
    justify-content: center;
  }

  .lang-switch {
    transform: scale(.9);
  }

  /* Drawer */

  .mobile-menu {
    position: fixed;

    top: 70px;
    right: 16px;

    width: 220px;

    padding: 18px;

    display: flex;
    flex-direction: column;
    gap: 18px;

    background: rgba(16, 8, 88, .96);

    backdrop-filter: blur(14px);

    border-radius: 18px;

    box-shadow: 0 20px 50px rgba(0, 0, 0, .25);

    z-index: 999;
  }

  .mobile-menu a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 0;
  }

  .mobile-menu a:hover {
    color: #7ec8ff;
  }

}


</style>