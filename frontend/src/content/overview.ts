export type OverviewVideo = {
  title: string;
  description: string;
  youtubeEmbed?: string;
  videoSrc?: string;
  thumbnail: string | null;
};

export const overviewContent = {
  title: "Overview of Activities",
  activity: {
    title: "Welcome to Kumbhabhisekham of Vasavi Rishi Gothra Suvarna Mandir and Pratisthapana of 90 Ft High Pancha Loha Idol.",
    donationHref: "https://www.instamojo.com/@vasavipenugonda/?ref=onb_tasks",
  },
  events: [
    {
      date: "15-Feb-2019 | 08-00 AM",
      title: "90 FT Idol Inauguration",
      location: "In Penugonda",
      description: "Participate in this historic event where The World's Tallest 90 Ft Pancha Loha Idol of Vasavi Mata will be consecrated.",
      image: null,
    },
    {
      date: "07-Nov-2018 | 08-00 AM",
      title: "Deepavali",
      location: "In Vasavi Dham, Penugonda",
      description: "Celebrate the victory of good over evil this Deepavali at Vasavi Dham under the presence of Goddess Vasavi.",
      image: null,
    },
    {
      date: "19-Oct-2018 | 09-00 AM",
      title: "Navrathri",
      location: "In Vasavi Dham, Penugonda",
      description: "Celebrate Sharan Navarathri at Vasavi Dham with Goddess Vasavi, the reincarnation of Goddess Adi Para Shakti.",
      image: null,
    },
  ],
  story: {
    eyebrow: "The Story of India’s Oldest Apostle of Non-Violence",
    title: "Story of Vasavi",
    paragraphs: [
      "Goddess Vasavi is an incarnation of Goddess Adi Parashakthi. She took birth to spread the principles of love and non-violence and help a cursed Gandharva prince (a Shapa Grastha Gandharva), who takes birth as King Vishnuvardhana, attain salvation. She devotes her life to be in service of Lord Shiva and vowed to remain celibate as a Gowrabalika. King Vishnuvardhana, who was served by her father as a tributary king, was captivated by her beauty and desired to marry her.",
      "Due to her fierce resistance to his desire, he decides to marry her even if that necessitated waging a war against her father. To prevent bloodshed and uphold the dignity and honour of women, Goddess Vasavi decides to offer herself to the sacred fire. She performs agni-pravesham along with families of the 102 Gotrajas, giving birth to the Arya Vysya Community and becoming a shining beacon of non-violence.",
      "This day is celebrated every year across the world as Vasavi Vishwa Roopam Day or Agni Pravesham Day during the month of February on Magha Shuddha Dwitiya.",
    ],
  },
  donation: {
    title: "Donate liberally to help construct Vasavi Dham, the One and Only spiritual destination in the World for Arya Vysyas.",
    image: "/legacy/overview/donation.png",
    href: "https://www.instamojo.com/@vasavipenugonda/?ref=onb_tasks",
  },
  map: {
    title: "Route Map",
    embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914254.3199778646!2d79.50030966062539!3d16.651143798827654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37c42ed235a7eb%3A0xd4e06cfa7356bbff!2sAKHILA+BHARATH+SRI+VASAVI+PENUGONDA+TRUST!5e0!3m2!1sen!2sin!4v1533833122474",
    directions: "https://goo.gl/maps/YHxyDqfuCA22",
  },
  videos: [
    {
      title: "Sri Vasavi Temple At Penugonda In Andhra Pradesh",
      description: "Take a virtual tour of the upcoming Vasavi Dham at Penugonda, the birthplace of Goddess Vasavi.",
      youtubeEmbed: "https://www.youtube.com/embed/nPP7G5i364Q",
      thumbnail: "/legacy/overview/video-virtual-tour.jpg",
    },
    {
      title: "See a model of the 90 Ft Pancha Loha Idol and the Upcoming 145 Ft high Rishi Gotra Mandir",
      description: "See a model of the 90 Ft Pancha Loha Idol and the upcoming Rishi Gotra Mandir.",
      youtubeEmbed: "https://www.youtube.com/embed/5Lu7M91WcYg",
      thumbnail: null,
    },
    {
      title: "Vasavi Penugonda Temple",
      description: "Vasavi Penugonda Temple.",
      videoSrc: "https://vasavipenugonda.com/videos/PenugondaVideo1.mp4",
      thumbnail: null,
    },
  ] satisfies OverviewVideo[],
  news: [
    {
      title: "PROJECTS COMPLETED AT VASAVI SHANTHIDHAM",
      description: "Devotees can check out the new completed projects.",
      href: "/legacy/overview/documents/projects-completed.pdf",
      image: null,
    },
    {
      title: "90 Feet Idol Pratisthapana Program",
      description: "We are thrilled to announce the upcoming Pratisthapana program.",
      href: "/news",
      image: null,
    },
    {
      title: "Lodging Information at Penugonda",
      description: "Devotees can check the list of lodges around Penugonda.",
      href: "/news",
      image: null,
    },
  ],
  about: {
    title: "About The Trust and Vasavi Dham",
    image: "/legacy/overview/about.jpg",
    text: "A Trust formed exclusively to develop the only Punya Kshetra for Arya Vysyas and to spread global awareness of Goddess Vasavi Mata’s significance, Story and Birth Place.",
  },
} as const;
