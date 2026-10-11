export type DonationOption = {
  key: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export const donationsContent = {
  title: "Donations",
  intro:
    "Support the work of Vasavi Shanthidham Penugonda through Annadanam, Go Shala care, or the E-Hundi for the development of the sacred kshetram.",
  options: [
    {
      key: "annadanam",
      title: "Annadanam",
      description:
        "We humbly request that devotees consider donating to the noble cause of Annadanam on special occasions such as their birthdays, anniversaries, or in memory of loved ones. Your contribution will help ensure that the devotees are offered a warm and nourishing meal to anyone in need, spreading love and kindness to all who come its way.",
      image: "/legacy/donations/annadanam.jpeg",
      href: "/donations/annadanam",
    },
    {
      key: "goshala",
      title: "Go Shala",
      description:
        "Introducing the Go Shala initiative at Vasavi Shanthidhama Penugonda, where we honor the divine presence of cows as suggested by the Vedas. According to Vedic teachings, all gods reside within each fraction of a cow, endowing these gentle creatures with the sanctity of the entire universe.",
      image: "/legacy/donations/goshala1.jpeg",
      href: "/donations/goshala",
    },
    {
      key: "ehundi",
      title: "E-Hundi",
      description:
        "Introducing the E-Hundi for donations to the Sri Vasavi Shanthi Dhama Penugonda Kshetram! Your generous contributions to this E-Hundi will directly contribute to the developmental activities of the Punyakshetra Construction.",
      image: "/legacy/donations/hundi.jpg",
      href: "/donations/e-hundi",
    },
  ] satisfies DonationOption[],
} as const;


