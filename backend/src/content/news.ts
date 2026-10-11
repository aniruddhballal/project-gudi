export type NewsItem = {
  id: number;
  title: string;
  date: string;
  summary: string;
  details: readonly string[];
  image: string | null;
  sourceImage?: string;
  href?: string;
};

export const newsContent = {
  title: "Latest News",
  items: [
    {
      id: 1,
      title: "Vasavi Jayanthi Held With great fanfare",
      date: "2012-05-01",
      summary: "4630th Birthday of Vasavi Mata Celebrated",
      details: [],
      image: null,
      sourceImage: "https://vasavi-bucket.s3.amazonaws.com/1472912441c_0068.jpg",
    },
    {
      id: 3,
      title: "Successful Completion of Vasavi Nija Pada Ratha Yatra Karnataka",
      date: "2014-12-28",
      summary: "An event was held to commemorate the successful completion of Sri Vasavi Nija Pada Ratha Yatra at Tumkur, Karnataka.",
      details: ["The event was graced by Sri Siva Kumar Swamiji of the famed Siddaganga Matt, Tumkur."],
      image: null,
      sourceImage: "https://vasavi-bucket.s3.amazonaws.com/1472911098m_2736.jpg",
    },
    {
      id: 4,
      title: "Vasavi Nija Pada Ratha Yatra Inauguration at Penugonda",
      date: "2015-01-21",
      summary: "A grand ceremony was held to inaugurate the commencement of Vasavi Nija Pada Ratha Yatra at Penugonda.",
      details: ["The ceremony was graced by Sri Siddha Raghava Rao, Sri Manikyala Rao, Sri S Rama Murthy and Dr. P N Govindarajulu."],
      image: null,
      sourceImage: "https://vasavi-bucket.s3.amazonaws.com/1472911081m_2922.jpg",
    },
    {
      id: 5,
      title: "Sahasra Galarchana and Vasavi Nija Pada Ratha Yatra Kick-off",
      date: "2014-08-17",
      summary: "A grand event was held at Bangalore to kick-off the Karnataka tour of Vasavi Nija Pada Ratha Yatra.",
      details: ["The event was inaugurated by Sri G M Rao."],
      image: null,
      sourceImage: "https://vasavi-bucket.s3.amazonaws.com/1472912472m_1798.jpg",
    },
    {
      id: 6,
      title: "Vasavi Nija Padam Installed",
      date: "2016-08-27",
      summary: "Holy Feet of the 90 Ft Pancha Loha Idol of Goddess Vasavi were installed at Penugonda.",
      details: [
        "Vasavi Nija Pada Installation was performed with great fanfare at Penugonda. The occasion saw Chandi Homam and several other homams attended by over 5000 devotees.",
        "The occasion was graced by Sri D H Shankara Murthy, Chairman of Karnataka Legislative Council, Sri Manikyala Rao, Minister for Endowments, Andhra Pradesh Government, Sri S Rama Murthy, Founder President, Sri R P Ravi Shankar, President of Karnataka Arya Vysya Maha Sabha, Dr P N Govindarajulu, President of Akhila Bharat Sri Vasavi Penugonda Trust, executive committee members, donors, members of the press, and thousands of devotees.",
      ],
      image: null,
      sourceImage: "https://madzz-dev-bucket.s3.amazonaws.com/15439129571472997457f8949e.jpg",
    },
    {
      id: 14,
      title: "90 Feet Idol Pratisthapana Program",
      date: "2019-02-15",
      summary: "We are thrilled to announce the upcoming Pratisthapana Program for the 90 Feet Pancha Loha Idol of Vasavi Matha.",
      details: [],
      image: null,
      sourceImage: "https://madzz-dev-bucket.s3.amazonaws.com/1543913097PratisthapanaInviteKannada.jpg",
    },
    {
      id: 15,
      title: "Lodging Information at Penugonda",
      date: "2018-12-04",
      summary: "Devotees can check this list of lodges around Penugonda to avail accommodation for the upcoming Pratisthapana Program.",
      details: [],
      image: null,
      sourceImage: "https://madzz-dev-bucket.s3.amazonaws.com/1543913199Lodges_List_for_Penugonda.jpg",
    },
    {
      id: 16,
      title: "Reaching Penugonda by Train",
      date: "2018-12-04",
      summary: "Devotees can check this list and the detailed list on the Newsletter section to view trains running between Bangalore and towns around Penugonda.",
      details: [],
      image: null,
      sourceImage: "https://madzz-dev-bucket.s3.amazonaws.com/1543913286List_of_Trains_to_reach_Penugonda_1.jpg",
    },
    {
      id: 17,
      title: "PROJECTS COMPLETED AT VASAVI SHANTHIDHAM",
      date: "2022-04-07",
      summary: "Devotees can check out the new completed projects at Vasavi Shanthidham, Penugonda.",
      details: [],
      image: null,
      href: "/legacy/overview/documents/projects-completed.pdf",
    },
    {
      id: 18,
      title: "Vasavi Jayanti 2022",
      date: "2018-12-04",
      summary: "Vasavi Jayanti 2022 Tamil",
      details: [],
      image: "/legacy/news/vasavi-jayanti-tamil.jpeg",
      href: "/legacy/news/vasavi-jayanti-tamil.jpeg",
    },
  ] satisfies NewsItem[],
} as const;


