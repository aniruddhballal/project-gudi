export type HomeHeroSlide = {
  image: string;
  href: string;
  title: string;
  description: string;
};

export type HomePerson = {
  image: string;
  name: string;
  role?: string;
  description?: string;
};

export const homeContent = {
  siteTitle: "Akhila Bharath Sri Vasavi Penugonda Temple Trust",
  description:
    "The Trust was formed exclusively to develop the only Punya Kshetra for Arya Vysyas and to spread global awareness of Goddess Vasavi Mata’s significance, Story and Birth Place.",
  heroSlides: [
    {
      image: "/legacy/home/hero/1.jpg",
      href: "/overview",
      title: "Vasavi Penugonda Trust",
      description: "A place of devotion, history, and community.",
    },
    {
      image: "/legacy/home/hero/vasavi5.jpg",
      href: "/vasavi-dham",
      title: "Vasavidham",
      description:
        "Details of the world’s tallest 90 ft. Panchaloha idol of Matha Vasavi.",
    },
    {
      image: "/legacy/home/hero/3.jpg",
      href: "/story",
      title: "Story of Vasavi Kanyakaparameshwari",
      description: "The divine story of Goddess Vasavi Kanyakaparameshwari.",
    },
    {
      image: "/legacy/home/hero/vasaviFull.jpg",
      href: "/donations",
      title: "Seva details",
      description: "Donate to Sevas to help bring Vasavi Dham to life.",
    },
    {
      image: "/legacy/home/hero/vasaviFull1.jpg",
      href: "/trustees",
      title: "Trustees",
      description: "Details of the Vasavi Penugonda Trust’s office bearers.",
    },
  ] satisfies HomeHeroSlide[],
  aims: [
    { text: "To develop Penugonda on par with Kasi, Tirumala, Annavaram, Bhadrachalam, Simhachalam etc.", emphasis: "To develop Penugonda" },
    { text: "To provide accommodation, free food, free Hostels and Hospitals.", emphasis: "To provide accommodation, free food, free Hostels and Hospitals" },
    { text: "To build Vasavi Rishi Gothra Suvarna Mandir.", emphasis: "To build Vasavi Rishi Gothra Suvarna Mandir" },
    { text: "To install the world’s tallest 90 ft. tall Panchaloha idol of Matha Vasavi in the sanctum sanctorum of Vasavi Rishi Gothra Suvarna Mandir.", emphasis: "To install the world’s tallest 90 ft. tall Panchaloha idol" },
    { text: "To preach and spread the principles of non-violence, love, peace and sacrifice to the world.", emphasis: "To preach and spread the principles of non-violence, love, peace and sacrifice" },
    { text: "To inspire Vysyas spread all over the world to visit Penugonda at least once during their lifetime.", emphasis: "To inspire Vysyas spread all over the world" },
    { text: "To finalise the history of Penugonda and pooja vidhanas, Astothara / Sahasra Namavali of Vasavi and adopt the same in all Vasavi Temples worldwide.", emphasis: "To finalise the history of Penugonda" },
    { text: "To start Veda Patasala, Guru Peetam, educational institutions up to deemed university, an old age home, and a widow rehabilitation centre.", emphasis: "To start Veda Patasala, Guru Peetam" },
    { text: "To perform free marriages and set up libraries for in-depth study of Vasavi charithra.", emphasis: "To perform free marriages and set up libraries" },
  ],
  president: {
    image: "/legacy/home/president.jpg",
    title: "President’s Message to Devotees",
    kannada: [
      "ನನ್ನ ನಲ್ಮೆಯ ವಾಸವಿ ಭಕ್ತಾದಿಗಳೆ!",
      "ಜಾಗನ್ಮಾತೆ ಆದಿಶಕ್ತಿ ಸ್ವರೂಪಿಣಿ ಅಹಿಂಸಾ ತತ್ವವನ್ನು ವಿಶ್ವಕ್ಕೆ ಪ್ರಪ್ರಥಮವಾಗಿ ಬೋಧಿಸಿದ ತಾಯಿ ಶ್ರೀ ಮದ್ ವಾಸವಿ ಕನ್ಯಕಾಪ್ರಮೆಶ್ವರಿ ಜನ್ಮ ತಾಳಿ 102 ಗೊತ್ರಜರೊಂದಿಗೆ ಅಗ್ನಿಪ್ರವೇಶ ಮಾಡಿ ತನ್ಮೂಲಕ ಯುದ್ಧವನ್ನು ನಿಲ್ಲಿಸಿದ ಆದರ್ಶನಿಯಳು ಪ್ರಾಥಸ್ಮರಣೀಯು ಆದ ವಾಸವಿ ಕನ್ಯಕಾಪರಮೇಶ್ವರಿಯು ಅಹಿಂಸಾ ತತ್ವವನ್ನು ವಿಶ್ವಕ್ಕೆ ಪ್ರಪ್ರಥಮವಾಗಿ ಬೋಧಿಸಿದರು, ತಮ್ಮ ಮನೆಗಳಲ್ಲಿ ನಡೆಯೋ ಶುಭಾ ಕಾರ್ಯಗಳಾದ - ಉಪನಯನ, 60ವರ್ಷದ ಶಾಂತಿ, ಮದುವೆ ಮುಂತಾದ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಪುಣ್ಯಕ್ಷೇತ್ರದಲ್ಲಿ ಮಾಡಿ ಮಾತೆಯ ಆಶೀರ್ವಾದ ಪಡೆಯಲು ಕೊರುತ್ತಿದ್ದೇನೆ.",
      "ಎಲ್ಲಾ ಅನುಕೂಲಗಳನ್ನೂ ಹೊಂದಿರುವ ವಾಸವಿ ಶಂತಿಧಾಮದಲ್ಲಿ ತಾವು ಶುಭ ಕಾರ್ಯಗಳನ್ನು ಸುಸೂತ್ರವಾಗಿ ನಡೆಸಲು ನಮ್ಮ ಸಿಬ್ಬಂದಿಯು ತಮ್ಮೊಂದಿಗೆ ಸಹಕಾರ ನೀಡುತ್ತದೆ. ಮುಂದಿನ ದಿನಗಳಲ್ಲಿ ಪವಿತ್ರ ಕ್ಷೇತ್ರವಾಗಲಿರುವ ಈ ಪುಣ್ಯ ಸ್ಥಳವನ್ನು ನಿರ್ಮಾಣಮಾಡಿ ಇದನ್ನು ಲೋಕಾರ್ಪಣೆ ಮಾಡುವ ಸಮಯ ಈಗ ಬಂದಿದೆ. ತಾವೆಲ್ಲರೂ ಪೆನುಗೊಂದೆಗೆ ಬಂದು ವಾಸವಿ ಮಾತೆಯ ಆಶೀರ್ವಾದ ಪಡೆಯಲು ಕೊರುತ್ತಿದ್ದೇನೆ.",
      "ಪೆನುಗೊಂದೆಗೆ ಬಂದು ವಾಸವಿ ಮಾತೆಯ ಆಶೀರ್ವಾದ ಪಡೆಯಲು ಕೊರುತ್ತಿದ್ದೇನೆ. ಜೈ ವಾಸವಿ!!!",
      "ಡಾ. ಪಿ. ಎನ್ ಗೋವಿಂದರಾಜುಲು, ಅಧ್ಯಕ್ಷರು, ಅಖಿಲ ಭಾರತ ಶ್ರೀ ವಾಸವಿ ಪೆನುಗೊಂಡ.",
    ],
    english: [
      "Dear Vasavi devotees!",
      "It gives me great pleasure to invite you all to the birthplace of Shree Madd Vasavi Kanyakaparameshwari, the incarnation of Aadi Paraashakti. She entered into sacred fire along with 102 Gothrajas to mark the beginning of non-violence on this earth. She is the deity of all Arya Vysyas worldwide, and I invite you all to visit Penugonda Kshetram at least once in two years.",
      "Upanayanams and marriages can be performed comfortably at Penugonda, and the blessings of Matha Vasavi are very essential for newly married couples. 60th, 70th, and 80th year birthdays, centenary celebrations, and family get-togethers can also be performed at Penugonda Kshetram.",
      "Keep watching our website frequently so that you can update your knowledge about Penugonda Kshetram. Once again, I invite you all to visit Penugonda Kshetram and receive the blessings of Goddess Kanyaka Parameshwari. Jai Vasavi!!!",
      "Dr. Govindaraajulu, President, Akhila Bharata Vasavi Penugonda Trust",
    ],
  },
  majorLinks: [
    { label: "Vasavidham", href: "/vasavi-dham" },
    { label: "Gallery", href: "/gallery/photos" },
    { label: "Donation", href: "/donations" },
    { label: "Contact Us", href: "/contact" },
  ],
  event: {
    title: "Upcoming Events",
    name: "19.07.2024 to 21.02.2024 - Guru Pournima Celebrations",
    bulletinHref: "/legacy/home/documents/bulletin-7-2021.pdf",
  },
  greatSouls: [
    {
      image: "/legacy/home/people/im1.jpg",
      name: "LATE S. RAMA MURTHY, BANGALORE",
      role: "Founder President, Vysya Ratna, Vasavi Seva Ratna",
      description:
        "The inspiration for Vasavi Shanti Dham and a major driving force behind this was Vysya Ratna, Vasavi Seva Ratna Late Sri S Rama Murthy. Founder President of Akhila Bharat Vasavi Penugonda Trust and Proprietor of Murthy Glass and Plywoods, Bangalore. The project was originally conceived by his beloved wife Smt. S Subhashini.",
    },
    {
      image: "/legacy/home/people/im2.jpg",
      name: "Dr. P.N. Govindarajulu",
      role: "The Man behind the Mission",
      description:
        "Working tirelessly to bring Vasavi Shanti Dham to fruition is Dr. P N Govindarajulu, President of the Trust and previously General Secretary. He has served as National Vice President of the Indian Medical Association and is also currently the President of Malleswaram Arya Vysya Sangha.",
    },
    {
      image: "/legacy/home/people/im3.jpg",
      name: "Sri Konijeti Rosaiah",
      role: "Former Chief Minister of Andhra Pradesh and Former Governor of Tamil Nadu",
    },
    {
      image: "/legacy/home/people/im4.jpg",
      name: "Sri D H Shankara Murthy",
      role: "Former Chairman Karnataka Legislative Assembly",
    },
    { image: "/legacy/home/people/im5.jpg", name: "Sri G Mallikarjuna Rao", role: "Chairman, GMR Group" },
    { image: "/legacy/home/people/im6.jpg", name: "Sri K R Pradeep", role: "Former Chairman, Lakshmi Vilas Bank" },
    { image: "/legacy/home/people/im7.jpg", name: "Dr. Ramesh Makam", role: "AV Hospital, Bangalore" },
    { image: "/legacy/home/people/im8.jpg", name: "Dr. Saraswati Ramesh", role: "AV Hospital, Bangalore" },
    { image: "/legacy/home/people/im9.jpg", name: "Sri B K Manjunath", role: "Chairman Lakshmi Vilas Bank" },
    { image: "/legacy/home/people/im10.jpg", name: "Sri Kotla Prasad Rao" },
    { image: "/legacy/home/people/im12.jpg", name: "Sri Vasanad Premnath Gopal" },
    { image: "/legacy/home/people/im13.jpg", name: "Sri D V Manjunath", role: "Chairman and CEO EMVEE Solar" },
    { image: "/legacy/home/people/im14.jpg", name: "Sri Satish", role: "Architect of The Temple & Chairman, Technical Committee" },
    { image: "/legacy/home/people/im15.jpg", name: "Sri Nagendra Kumar", role: "Structural Engineer" },
    { image: "/legacy/home/people/im16.jpg", name: "Sri K S V Raja", role: "Spl Class Contractor" },
  ] satisfies HomePerson[],
  gallery: [2, 3, 4, 5, 6, 8, 9, 10].map((number) => ({
    image: `/legacy/home/gallery/${number}.jpg`,
    alt: `Recent temple photo ${number}`,
  })),
  contact: [
    {
      name: "Trust Head Office",
      lines: [
        "No. 19,20 & 20/1, Badaganadu Sangha Building",
        "Girls School Street, Kumara Park West, Bangalore – 560 020",
        "Phone: 080 - 23360555",
        "Mobile: 9164001400 - Harish",
      ],
    },
    {
      name: "Vasavi Shanthi Dham",
      lines: [
        "Vasavi Shanti Dham, Penugonda – 534 320",
        "W.G. District, Andhra Pradesh",
        "Phone: 08819 – 246252 / 248686",
        "Mobile: 9912018818 - Penugonda (Janardhan)",
        "Mobile: 7899996868 - Penugonda (Harish)",
      ],
    },
  ],
  email: "vasavipenugonda@gmail.com",
} as const;


