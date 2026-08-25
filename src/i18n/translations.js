export const translations = {
    id: {
        nav: {
            home: "Home",
            about: "Tentang",
            gallery: "Galeri",
            features: "Fitur",
            contact: "Kontak"
        },

        hero: {
            title: "Automatic Identification System ITS",
            subtitle:
                "Solusi teknologi maritim untuk pemantauan kapal secara real-time.",
            button: "Pelajari Fitur"
        },

        about: {
            subtitle: "Tentang AISITS",
            description:
                "AISITS adalah sistem identifikasi otomatis dan perangkat keselamatan maritim yang dikembangkan oleh ITS untuk mencegah kecelakaan di laut. Sistem ini memanfaatkan teknologi AIS untuk memantau pergerakan kapal secara real-time, memberikan informasi penting kepada pengguna, dan meningkatkan keselamatan pelayaran. Fungsi Utama sistem ini adalah Menerima, menyimpan, dan memproses data AIS dari kapal dan platform lepas pantai (offshore platform) untuk mengamankan navigasi, melindungi pipa bawah laut (subsea pipeline), serta platform lepas pantai."
        },

        fitur: {
            title: {
                1: "Sistem Peringatan Dini (Early Warning System)",
                2: "Sistem Inspeksi Kapal (Ship Inspection System)",
                3: "Perekaman Pergerakan Kapal (Ship Movement Recording)"
            },
            description: {
                1: "Sistem peringatan dini untuk memberi tahu kapal jika mendekati area berbahaya, pipa bawah laut, platform lepas pantai, atau saat penurunan jangkar.",
                2: "Membantu pihak Syahbandar / Otoritas Pelabuhan (Port Authority) dalam menilai tingkat risiko kapal sebelum atau sesudah memasuki pelabuhan.",
                3: "Mengumpulkan data AIS dari berbagai sumber (AISHUB, IPSWITCH, LAPAN) untuk menyimpan riwayat pergerakan kapal (historical data)."
            }
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
            gallery: "Gallery",
            features: "Features",
            contact: "Contact"
        },

        hero: {
            title: "ITS Automatic Identification System",
            subtitle:
                "Maritime technology solution for real-time vessel monitoring.",
            button: "Explore Features"
        },

        about: {
            subtitle: "About AISITS",
            description:
                "AISITS is an automatic identification system and maritime safety device developed by ITS to prevent accidents at sea. This system utilizes AIS technology to monitor vessel movements in real-time, provide important information to users, and enhance maritime safety. The main function of this system is to receive, store, and process AIS data from vessels and offshore platforms to ensure navigation safety, protect subsea pipelines, and support offshore platforms."
        },

        fitur: {
            title: {
                1: "Early Warning System (EWS)",
                2: "Ship Inspection System",
                3: "Ship Movement Recording"
            },
            description: {
                1: "An early warning system that alerts vessels when approaching hazardous areas, subsea pipelines, offshore platforms, or during anchor deployment.",
                2: "Assists Port Authorities in assessing the risk level of vessels before or after entering the port.",
                3: "Collects AIS data from various sources (AISHUB, IPSWITCH, LAPAN) to store historical vessel movement data."
            }
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