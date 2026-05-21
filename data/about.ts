export interface ExtraBlock {
  type: "text" | "image" | "3dmodel";
  title?: string;
  body?: string;
  src?: string;
  alt?: string;
}

export const about = {
  label: "About Us",
  heading: "Horizon Nepal Engineering Research & Construction — Built for Generations",
  description:
    "With decades of combined leadership in construction, architecture, and civil infrastructure, Horizon Nepal Engineering Research & Construction Pvt. Ltd. stands as a trusted partner in shaping Nepal's built environment. From private residences to community-defining civic projects, we bring precision, integrity, and innovation to every structure we touch.",

  stats: [
    { value: "30+", label: "Years of Collective Experience" },
    { value: "200+", label: "Projects Completed" },
    { value: "50+", label: "Expert Team Members" },
    { value: "15+", label: "Districts Served" },
  ],

  story: {
    title: "Our Story",
    paragraphs: [
      "Founded on the belief that great buildings begin with great relationships, Horizon Nepal Engineering Research & Construction Pvt. Ltd. brings together architects, engineers, and project managers who share a single obsession — quality. Every project, whether a mountain-road repair or a luxury residence, receives the same rigorous attention to detail.",
      "We invest in the latest 3D modelling, structural analysis, and project-management tools to deliver on time and on budget. Our collaborative approach means clients are never left guessing — from the first sketch to the final handover, you are part of every decision.",
    ],
  },

  model3D: {
    src: "/glb/house.glb",
    title: "Interactive 3D Model",
    description:
      "Rotate, zoom, and explore our architectural designs in real time. Every model is built to exact specifications before construction begins.",
  },

  values: [
    {
      title: "Quality Craftsmanship",
      body: "We use only the best materials and employ skilled artisans who take pride in their work. Every joint, finish, and fixture meets our exacting standards.",
    },
    {
      title: "Innovative Design",
      body: "Our architects push boundaries with sustainable, context-sensitive designs that respond to Nepal's unique terrain, climate, and culture.",
    },
    {
      title: "Integrity & Transparency",
      body: "Fixed-price contracts, weekly progress reports, and open communication channels — no hidden costs, no surprises, just honest work.",
    },
    {
      title: "Client-Centric Approach",
      body: "Your vision drives everything we do. We listen first, design second, and build third — always with your goals at the centre of the process.",
    },
  ],

  cta: {
    label: "Explore Our Works",
    href: "/#works",
  },

  extraBlocks: [] as ExtraBlock[],
};
