export const translations = {
  id: {
    nav: {
      home: "Home",
      about: "Tentang",
      features: "Fitur",
      contact: "Kontak"
    },

    hero: {
      title: "Automatic Identification System ITS",
      subtitle:
        "Solusi teknologi maritim untuk pemantauan kapal secara real-time.",
      button: "Pelajari Fitur"
    },

    workflow: {
        subtitle: "Alur Sistem",
        title: "Bagaimana AIS ITS Bekerja?",
        description:
            "Automatic Identification System (AIS) bekerja dengan mengirimkan data kapal secara otomatis. AIS ITS kemudian menerima, memproses, dan menyajikan informasi tersebut agar mudah dipantau oleh pengguna.",

        steps: [
            {
            number: "01",
            icon: "🚢",
            title: "Kapal Mengirim Data",
            description:
                "Transponder AIS di kapal mengirimkan informasi seperti posisi, kecepatan, arah, dan identitas kapal."
            },
            {
            number: "02",
            icon: "📡",
            title: "Sinyal Diterima",
            description:
                "Data AIS diterima oleh stasiun pantai maupun satelit yang menangkap sinyal dari kapal."
            },
            {
            number: "03",
            icon: "☁️",
            title: "Data Diproses",
            description:
                "Server AIS ITS mengolah data yang diterima untuk analisis, penyimpanan, dan pemantauan."
            },
            {
            number: "04",
            icon: "💻",
            title: "Informasi Ditampilkan",
            description:
                "Pengguna dapat melihat posisi kapal, riwayat perjalanan, dan informasi penting lainnya melalui sistem."
            }
        ]
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      features: "Features",
      contact: "Contact"
    },

    hero: {
      title: "ITS Automatic Identification System",
      subtitle:
        "Maritime technology solution for real-time vessel monitoring.",
      button: "Explore Features"
    },

    workflow: {
        subtitle: "System Flow",
        title: "How Does AIS ITS Work?",
        description:
            "The Automatic Identification System (AIS) automatically transmits vessel information. AIS ITS receives, processes, and presents the data for users.",

        steps: [
            {
            number: "01",
            icon: "🚢",
            title: "Vessel Sends Data",
            description:
                "The AIS transponder transmits the vessel's position, speed, course, and identity."
            },
            {
            number: "02",
            icon: "📡",
            title: "Signal is Received",
            description:
                "The AIS signal is received by coastal stations or satellites."
            },
            {
            number: "03",
            icon: "☁️",
            title: "Data is Processed",
            description:
                "AIS ITS servers process, analyze, and store the received data."
            },
            {
            number: "04",
            icon: "💻",
            title: "Information is Displayed",
            description:
                "Users can monitor vessel positions, routes, and other important information."
            }
        ]
    },

  }
}