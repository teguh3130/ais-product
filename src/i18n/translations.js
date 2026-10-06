export const translations = {
  id: {
    nav: {
      1: 'Home',
      2: 'Tentang',
      3: 'Alur sistem',
      5: 'Fitur',
      6: 'Kontak',
    },

    hero: {
      title: 'Automatic Identification System ITS',
      subtitle:
        'Platform pemantauan dan riset maritim yang dikembangkan di ITS untuk mengubah data kapal menjadi informasi yang dapat ditindaklanjuti demi operasi maritim yang lebih aman',
      button: 'Lihat Cara Kerjanya',
    },

    vesselCard: {
      ariaLabel: 'Contoh antarmuka informasi kapal, data ilustratif',
      title: 'ANTARMUKA DATA AIS',
      badge: 'ILUSTRATIF',
      note: 'Contoh data kapal yang dapat dikelola AIS ITS',
      fields: {
        name: 'Nama Kapal',
        mmsi: 'MMSI',
        type: 'Jenis Kapal',
        speed: 'Kecepatan',
        course: 'Haluan',
        heading: 'Arah',
        destination: 'Tujuan',
        status: 'Status Navigasi',
      },
    },

    about: {
      subtitle: 'Tentang AISITS',
      label: 'MENGAPA AIS ITS',
      headline: 'Mengubah Data Maritim Menjadi Wawasan yang Bermakna',
      imageLabel: 'PEMANTAUAN MARITIM',
      cta: 'Lihat alur sistem',
      visualAlt: 'Operasi maritim AIS ITS',
      focus: {
        label: 'FOKUS KAMI',
        items: {
          safety: {
            title: 'Keselamatan Maritim',
            description: 'Mendukung pemantauan kapal dan kewaspadaan dini terhadap risiko.',
          },
          research: {
            title: 'Riset & Inovasi',
            description: 'Memungkinkan analisis berbasis AIS dan riset maritim.',
          },
          collaboration: {
            title: 'Kolaborasi',
            description: 'Membuka peluang riset dan kolaborasi.',
          },
        },
      },
      purpose: {
        label: 'TUJUAN KAMI',
        headline: 'Dari Data Maritim Menjadi',
        headlineAccent: 'Wawasan yang Bermakna',
      },
      description: {
        1: 'Lalu lintas maritim menghasilkan aliran informasi kapal secara terus-menerus. Mengubah informasi tersebut menjadi wawasan yang bermakna membantu pemantauan kapal, mengidentifikasi potensi risiko, dan memperkuat riset maritim',
        2: 'AIS ITS adalah platform pemantauan dan riset maritim yang dikembangkan di Institut Teknologi Sepuluh Nopember (ITS), dirancang untuk mengumpulkan, mengolah, dan memvisualisasikan data AIS untuk keselamatan, analisis, dan riset maritim',
      },
    },

    fitur: {
      label: 'KECERDASAN MARITIM',
      headline: 'Lihat AIS ITS beraksi.',
      support:
        'Jelajahi sistem yang dikembangkan untuk mengubah data kapal menjadi informasi maritim yang praktis',
      videoTitle: 'Video profil AIS ITS',
      explore: 'JELAJAHI AIS ITS',
      carouselLabel: 'Korsel fitur AIS ITS',
      prev: 'Fitur sebelumnya',
      next: 'Fitur berikutnya',
      progressLabel: 'Progres fitur',
      close: 'Tutup',
      items: [
        {
          title: 'Pemantauan Kapal Real-Time',
          description:
            'Menampilkan posisi, rute, dan pergerakan kapal secara real-time pada peta AIS untuk pemantauan maritim yang berkelanjutan.',
          points: [
            'Posisi kapal secara real-time',
            'Rute dan pergerakan kapal',
            'Pemantauan berkelanjutan di peta AIS',
          ],
        },
        {
          title: 'Sistem Peringatan Dini (EWS)',
          description:
            'Memberi tahu kapal yang mendekati area berbahaya, pipa bawah laut, platform lepas pantai, atau saat penurunan jangkar.',
          points: [
            'Peringatan area berbahaya',
            'Kedekatan pipa bawah laut dan platform lepas pantai',
            'Peringatan saat penurunan jangkar',
          ],
        },
        {
          title: 'Geofencing Maritim',
          description:
            'Membuat batas virtual di perairan yang dipantau dan menandai kapal yang masuk atau keluar dari zona tertentu.',
          points: [
            'Batas virtual di perairan yang dipantau',
            'Menandai kapal yang masuk atau keluar zona',
          ],
        },
        {
          title: 'Pelacakan Kapal',
          description:
            'Mengumpulkan data AIS dari sumber seperti AISHUB, IPSWITCH, dan LAPAN untuk menyimpan riwayat pergerakan kapal.',
          points: [
            'Data AIS dari AISHUB, IPSWITCH, dan LAPAN',
            'Riwayat pergerakan kapal tersimpan',
          ],
        },
        {
          title: 'Heatmap Kepadatan Kapal',
          description:
            'Memvisualisasikan kepadatan kapal di perairan yang dipantau untuk menunjukkan pola lalu lintas dan alur pelayaran yang padat.',
          points: ['Visualisasi kepadatan kapal', 'Pola lalu lintas dan alur pelayaran padat'],
        },
        {
          title: 'Pemantauan Kecepatan Kapal',
          description:
            'Memantau kecepatan dan riwayat kecepatan kapal untuk membantu menandai kapal yang bergerak di luar batas aman atau wajar.',
          points: [
            'Pemantauan kecepatan kapal',
            'Riwayat kecepatan kapal',
            'Menandai kecepatan di luar batas wajar',
          ],
        },
        {
          title: 'Intelijen Cuaca Maritim',
          description:
            'Menampilkan kondisi cuaca maritim seperti angin dan gelombang pada tampilan pemantauan untuk mendukung keputusan pelayaran yang lebih aman.',
          points: [
            'Informasi angin dan gelombang',
            'Terintegrasi pada tampilan pemantauan',
            'Mendukung keputusan pelayaran yang lebih aman',
          ],
        },
      ],
    },

    workflow: {
      subtitle: 'Alur Sistem',
      label: 'DARI SINYAL MENJADI WAWASAN',
      title: 'Bagaimana AIS ITS mengubah data kapal menjadi informasi maritim.',
      support: 'Dari sinyal kapal menjadi informasi maritim yang dapat ditindaklanjuti.',

      steps: [
        {
          number: '01',
          title: 'Data Kapal',
          description:
            'Transponder AIS di kapal mengirimkan informasi seperti posisi, kecepatan, arah, dan identitas kapal.',
        },
        {
          number: '02',
          title: 'Data Diterima',
          description:
            'Data AIS diterima oleh stasiun pantai maupun satelit yang menangkap sinyal dari kapal.',
        },
        {
          number: '03',
          title: 'Data Diolah',
          description:
            'Server AIS ITS mengolah data yang diterima untuk analisis, penyimpanan, dan pemantauan.',
        },
        {
          number: '04',
          title: 'Informasi Maritim',
          description:
            'Pengguna dapat melihat posisi kapal, riwayat perjalanan, dan informasi penting lainnya melalui sistem.',
        },
      ],
    },
    contact: {
      label: 'MARI TERHUBUNG',
      headline: 'Punya pertanyaan tentang AIS ITS?',
      support:
        'Baik Anda tertarik pada riset AIS, pemantauan kapal, kolaborasi, maupun ingin mengetahui lebih lanjut tentang sistem ini, kami akan senang mendengar dari Anda.',
      location: 'Kampus ITS, Surabaya',
      emailCta: 'Kirim Email ke AIS ITS',
    },
    footer: {
      explore: 'JELAJAHI',
      contact: 'KONTAK',
      backToTop: 'Kembali ke atas',
      deskripsi:
        'Solusi teknologi maritim berbasis Automatic Identification System untuk monitoring kapal, analisis data, dan penelitian maritim',
    },
  },

  en: {
    nav: {
      1: 'Home',
      2: 'About',
      3: 'Workflow',
      5: 'Features',
      6: 'Contact',
    },

    hero: {
      title: 'ITS Automatic Identification System',
      subtitle:
        'A maritime monitoring and research platform developed at ITS to transform vessel data into actionable information for safer maritime operations',
      button: 'See How It Works',
    },

    vesselCard: {
      ariaLabel: 'Example vessel information interface, illustrative data',
      title: 'AIS DATA INTERFACE',
      badge: 'ILLUSTRATIVE',
      note: 'Example of the vessel data AIS ITS can work with.',
      fields: {
        name: 'Vessel Name',
        mmsi: 'MMSI',
        type: 'Vessel Type',
        speed: 'Speed',
        course: 'Course',
        heading: 'Heading',
        destination: 'Destination',
        status: 'Navigation Status',
      },
    },

    about: {
      subtitle: 'About AISITS',
      label: 'WHY AIS ITS',
      headline: 'Turning Maritime Data Into Meaningful Insight',
      imageLabel: 'MARITIME MONITORING',
      cta: 'See the system flow',
      visualAlt: 'AIS ITS maritime operations',
      focus: {
        label: 'OUR FOCUS',
        items: {
          safety: {
            title: 'Maritime Safety',
            description: 'Supporting vessel monitoring and early risk awareness.',
          },
          research: {
            title: 'Research & Innovation',
            description: 'Enabling AIS-based analysis and maritime research.',
          },
          collaboration: {
            title: 'Collaboration',
            description: 'Creating opportunities for research and collaboration.',
          },
        },
      },
      purpose: {
        label: 'OUR PURPOSE',
        headline: 'From Maritime Data to',
        headlineAccent: 'Meaningful Insights',
      },
      description: {
        1: 'Maritime traffic generates continuous streams of vessel information. Turning that information into meaningful insight helps support vessel monitoring, identify potential risks, and strengthen maritime research.',
        2: 'AIS ITS is a maritime monitoring and research platform developed at Institut Teknologi Sepuluh Nopember (ITS), designed to collect, process, and visualize AIS data for maritime safety, analysis, and research.',
      },
    },

    fitur: {
      label: 'MARITIME INTELLIGENCE',
      headline: 'See AIS ITS in action.',
      support:
        'Explore the systems developed to turn vessel data into practical maritime information.',
      videoTitle: 'AIS ITS profile video',
      explore: 'EXPLORE AIS ITS',
      carouselLabel: 'AIS ITS feature carousel',
      prev: 'Previous feature',
      next: 'Next feature',
      progressLabel: 'Feature progress',
      close: 'Close',
      items: [
        {
          title: 'Real-Time Vessel Monitoring',
          description:
            'Displays live vessel positions, routes, and movement on the AIS map for continuous maritime monitoring.',
          points: [
            'Live vessel positions',
            'Routes and vessel movement',
            'Continuous monitoring on the AIS map',
          ],
        },
        {
          title: 'Early Warning System',
          description:
            'Alerts vessels approaching hazardous areas, subsea pipelines, offshore platforms, or during anchor deployment.',
          points: [
            'Hazard area alerts',
            'Subsea pipeline and offshore platform proximity',
            'Anchor deployment alerts',
          ],
        },
        {
          title: 'Maritime Geofencing',
          description:
            'Creates virtual boundaries around monitored waters and flags vessels that enter or leave a designated zone.',
          points: [
            'Virtual boundaries around monitored waters',
            'Flags vessels entering or leaving a zone',
          ],
        },
        {
          title: 'Vessel Tracking',
          description:
            'Collects AIS data from sources such as AISHUB, IPSWITCH, and LAPAN to store historical vessel movement.',
          points: [
            'AIS data from AISHUB, IPSWITCH, and LAPAN',
            'Stored historical vessel movement',
          ],
        },
        {
          title: 'Vessel Density Heatmap',
          description:
            'Visualizes vessel density across monitored waters to reveal traffic patterns and busy shipping lanes over time.',
          points: ['Vessel density visualization', 'Traffic patterns and busy shipping lanes'],
        },
        {
          title: 'Speed Monitoring',
          description:
            'Tracks vessel speed and speed history to help flag vessels moving outside safe or expected limits.',
          points: ['Vessel speed tracking', 'Speed history', 'Flags speeds outside safe limits'],
        },
        {
          title: 'Maritime Weather Intelligence',
          description:
            'Overlays maritime weather conditions such as wind and waves onto the monitoring view to support safer voyage decisions.',
          points: [
            'Wind and wave conditions',
            'Overlaid on the monitoring view',
            'Supports safer voyage decisions',
          ],
        },
      ],
    },

    workflow: {
      subtitle: 'System Flow',
      label: 'FROM SIGNAL TO INSIGHT',
      title: 'How AIS ITS turns vessel data into maritime information.',
      support: 'From vessel signals to actionable maritime information.',

      steps: [
        {
          title: 'Vessel Data',
          description:
            "The AIS transponder transmits the vessel's position, speed, course, and identity.",
        },
        {
          title: 'Data Received',
          description: 'The AIS signal is received by coastal stations or satellites.',
        },
        {
          title: 'Data Processed',
          description: 'AIS ITS servers process, analyze, and store the received data.',
        },
        {
          title: 'Maritime Information',
          description:
            'Users can monitor vessel positions, routes, and other important information.',
        },
      ],
    },

    contact: {
      label: "LET'S CONNECT",
      headline: 'Have a question about AIS ITS?',
      support:
        "Whether you're interested in AIS research, vessel monitoring, collaboration, or learning more about the system, we'd be glad to hear from you.",
      location: 'Kampus ITS, Surabaya',
      emailCta: 'Email AIS ITS',
    },
    footer: {
      explore: 'EXPLORE',
      contact: 'CONTACT',
      backToTop: 'Back to top',
      deskripsi:
        'Maritime technology solution based on the Automatic Identification System for vessel monitoring, data analysis, and maritime research.',
    },
  },
}
