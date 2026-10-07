export type NewsletterDocument = {
  title: string;
  category: string;
  description?: string;
  href: string;
  local: boolean;
};

export const newsletterContent = {
  title: "News Letter",
  documents: [
    {
      title: "List of Eligible Candidates ABSVPT (R) - PT",
      category: "NewsLetter",
      href: "/legacy/newsletter/documents/eligible-candidates-pt.pdf",
      local: true,
    },
    {
      title: "List of eligible Candidate list ABSVPTT(R) - TT",
      category: "NewsLetter",
      href: "/legacy/newsletter/documents/eligible-candidates-tt.pdf",
      local: true,
    },
    {
      title: "Penugonda Trust Election Details",
      category: "NewsLetter",
      href: "/legacy/newsletter/documents/trust-election-2025.pdf",
      local: true,
    },
    {
      title: "June 2022 Bulletin",
      category: "NewsLetter",
      description: "June 2022 Bulletin",
      href: "/legacy/newsletter/documents/bulletin-june-2022.pdf",
      local: true,
    },
    {
      title: "Vasavi Jayanti 2022 Telugu",
      category: "NewsLetter",
      href: "/legacy/newsletter/documents/vasavi-jayanti-2022-telugu.pdf",
      local: true,
    },
    {
      title: "Vasavi Jayanti 2022",
      category: "NewsLetter",
      href: "/legacy/newsletter/documents/vasavi-jayanti-2022.pdf",
      local: true,
    },
    {
      title: "Dec 2021 bulletin",
      category: "NewsLetter",
      href: "/legacy/newsletter/documents/bulletin-dec-2021.pdf",
      local: true,
    },
    {
      title: "Oct Nov 2021 bulletin",
      category: "NewsLetter",
      href: "/legacy/newsletter/documents/bulletin-oct-nov-2021.pdf",
      local: true,
    },
    {
      title: "Jan 2021 bulletin",
      category: "NewsLetter",
      href: "/legacy/newsletter/documents/bulletin-jan-2021.pdf",
      local: true,
    },
    {
      title: "Pratisthapana Information in Kannada",
      category: "Pratisthapana Information",
      description: "Kannada Invite of Pratisthapana Program",
      href: "https://madzz-dev-bucket.s3.amazonaws.com/1543912106KanPamplet.pdf",
      local: false,
    },
    {
      title: "Pratisthapana Program and Seva In Depth Information",
      category: "Pratisthapana Information",
      href: "https://madzz-dev-bucket.s3.amazonaws.com/1543911816PratisthapanarogramInfo.pdf",
      local: false,
    },
    {
      title: "Train Services to Penugonda",
      category: "Pratisthapana Information",
      href: "https://madzz-dev-bucket.s3.amazonaws.com/1543911619List_of_Trains_to_reach_Penugonda.pdf",
      local: false,
    },
    {
      title: "Lodging Information at Penugonda",
      category: "Pratishapana Information",
      href: "https://madzz-dev-bucket.s3.amazonaws.com/1543911504Pratisthapana_Lodging_Info.pdf",
      local: false,
    },
    {
      title: "Pratistapana Programmes",
      category: "News Letter",
      description: "Pratistapana dates & Sevas",
      href: "https://madzz-dev-bucket.s3.amazonaws.com/1538580276KanPamplet.pdf",
      local: false,
    },
    {
      title: "Second Bulletin",
      category: "Newsletters",
      description: "This Bulletin contains updates on the programs, details about Guru Purnima Celebrations and other relevant information.",
      href: "https://madzz-dev-bucket.s3.amazonaws.com/1535448274Vasavi_Patrika_Issue_2_New-B.pdf",
      local: false,
    },
    {
      title: "First Edition of the Bulletin",
      category: "Newsletter",
      description: "This Bulletin is our first issue containing status of various programs at Vasavi Shanti Dham.",
      href: "https://madzz-dev-bucket.s3.amazonaws.com/1535448183Vasavi_Patrika_Issue_1_New-B.pdf",
      local: false,
    },
  ] satisfies NewsletterDocument[],
  announcement: {
    title: "We are thrilled to announce the upcoming Pratisthapana Program for the 90 Feet Pancha Loha Idol of Vasavi Matha",
    date: "2012-05-01 12:30:00",
  },
} as const;
