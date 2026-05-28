export interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "media" | "repeater";
  repeaterFields?: { key: string; label: string; type: "text" | "textarea" }[];
}

export interface CodeSectionDef {
  label: string;
  fields: FieldDef[];
}

export const SECTIONS: Record<string, CodeSectionDef> = {
  hero: {
    label: "Hero",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "h1", label: "Heading", type: "textarea" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "cta", label: "CTA Button", type: "text" },
      { key: "cta2", label: "CTA 2 Button", type: "text" },
      { key: "trustText", label: "Trust Strip Text", type: "text" },
      { key: "cardTitle", label: "Card Title", type: "text" },
      { key: "cardLocation", label: "Card Location", type: "text" },
      { key: "cardStatus", label: "Card Status", type: "text" },
      { key: "bgImage", label: "Background Image", type: "media" },
      { key: "modelPath", label: "3D Model", type: "media" },
    ],
  },
  services: {
    label: "Services",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "h2", label: "Heading", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "explore", label: "Explore Label", type: "text" },
      { key: "cards", label: "Service Cards", type: "repeater", repeaterFields: [
        { key: "icon", label: "Icon Name", type: "text" },
        { key: "title", label: "Title", type: "text" },
        { key: "body", label: "Body", type: "textarea" },
      ]},
      { key: "sandModelPath", label: "Sand 3D Model", type: "media" },
    ],
  },
  process: {
    label: "Process",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "h2", label: "Heading", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "simpleSteps", label: "Simple Steps Text", type: "text" },
      { key: "steps", label: "Steps", type: "repeater", repeaterFields: [
        { key: "title", label: "Title", type: "text" },
        { key: "body", label: "Body", type: "textarea" },
      ]},
    ],
  },
  portfolio: {
    label: "Portfolio",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "h2", label: "Heading", type: "text" },
      { key: "viewAll", label: "View All Label", type: "text" },
      { key: "viewProject", label: "View Project Label", type: "text" },
    ],
  },
  news: {
    label: "News",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "h2", label: "Heading", type: "text" },
      { key: "readMore", label: "Read More Label", type: "text" },
      { key: "viewAll", label: "View All Label", type: "text" },
      { key: "bridgeModelPath", label: "Bridge 3D Model", type: "media" },
    ],
  },
  quotes: {
    label: "Quote Banner",
    fields: [
      { key: "bgImage", label: "Background Image", type: "media" },
      { key: "quotes", label: "Quotes", type: "repeater", repeaterFields: [
        { key: "text", label: "Quote Text", type: "textarea" },
        { key: "attr", label: "Attribution", type: "text" },
      ]},
    ],
  },
  testimonials: {
    label: "Testimonials",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "h2", label: "Heading", type: "text" },
      { key: "prev", label: "Previous Label", type: "text" },
      { key: "next", label: "Next Label", type: "text" },
      { key: "testimonials", label: "Testimonials", type: "repeater", repeaterFields: [
        { key: "name", label: "Name", type: "text" },
        { key: "role", label: "Role", type: "text" },
        { key: "quote", label: "Quote", type: "textarea" },
        { key: "initials", label: "Initials", type: "text" },
      ]},
    ],
  },
  faq: {
    label: "FAQ",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "h2", label: "Heading", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "ask", label: "Ask Label", type: "text" },
      { key: "viewAll", label: "View All Label", type: "text" },
      { key: "stopModelPath", label: "Stop Sign 3D Model", type: "media" },
    ],
  },
};
