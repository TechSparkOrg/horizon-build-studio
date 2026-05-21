export interface StaticProject {
  readonly title: string;
  category: string;
  location: string;
  img: string;
  alt: string;
  status: string;
  completion: number;
  budget: number | null;
  shortDescription: string;
  slug: string;
}

const P = (partial: { title: string; category: string; location: string; img: string }): StaticProject => ({
  alt: "",
  status: "planning",
  completion: 0,
  budget: null,
  shortDescription: "",
  slug: partial.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""),
  ...partial,
});

export const projects: StaticProject[] = [
  P({ title: "Sunrise Residential Complex", category: "Buildings", location: "Lalitpur", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80" }),
  P({ title: "Araniko Highway Maintenance", category: "Road Works", location: "Bhaktapur", img: "https://images.unsplash.com/photo-1545972154-9bb223aac798?auto=format&fit=crop&w=900&q=80" }),
  P({ title: "New Baneshwor Office Tower", category: "Buildings", location: "Kathmandu", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80" }),
  P({ title: "Boutique Hotel Interiors", category: "Interiors", location: "Thamel", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80" }),
  P({ title: "Patan Heritage Renovation", category: "Renovation", location: "Patan", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80" }),
  P({ title: "Bagmati Bridge Upgrade", category: "Road Works", location: "Kathmandu", img: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=900&q=80" }),
];

export const filters: string[] = [
  "All",
  "Buildings",
  "Road Works",
  "Interiors",
  "Renovation",
];
