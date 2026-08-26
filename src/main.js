import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, // animasi hanya sekali
      offset: 50,
    });
  },[]);
}
