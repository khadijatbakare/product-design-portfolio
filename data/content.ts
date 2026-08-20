export interface MediaAsset {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly placeholder?: string;
}
export type AvailabilityStatus = "open" | "selective" | "closed";
export type VolumeContents =
  | "work"
  | "notes"
  | "about"
  | "resume"
  | "playground";
export type ModalView = VolumeContents | "contact";
export type VolumeId = "vol-01" | "vol-02" | "vol-03" | "vol-04";

export interface Volume {
  readonly id: string;
  readonly volume: string;
  readonly spine: string;
  readonly subtitle: string;
  readonly readTime: string;
  readonly contents: VolumeContents;
  readonly heading: string;
  readonly description: string;
  readonly width: number;
  readonly height: number;
  readonly color: string;
  readonly textColor: string;
  readonly typography: "mono" | "serif" | "italic" | "sans";
  readonly texture: "dots" | "gradient" | "coarse-dots" | "paper";
  readonly accent: "lines" | "numeral" | "stitch" | "ribbon";
}
export type ProjectCategory =
  | "Design System"
  | "Product Architecture"
  | "Zero to One"
  | "Product Design";
export interface Metric {
  readonly value: string;
  readonly label: string;
  readonly source: string;
  readonly verified: boolean;
}
export interface SystemDecision {
  readonly id: string;
  readonly decision: string;
  readonly rationale: string;
  readonly tradeoff: string;
}
export interface VisualAsset {
  readonly id: string;
  readonly media: MediaAsset;
  readonly caption: string;
  readonly spec?: string;
}
export interface PlaygroundPiece {
  readonly id: string;
  readonly title: string;
  readonly note: string;
  readonly media: MediaAsset;
  readonly span: "square" | "tall" | "wide";
}
export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly role: string;
  readonly timeline: string;
  readonly team: string;
  readonly platform: string;
  readonly summary: string;
  readonly problem: readonly string[];
  readonly solution: readonly string[];
  readonly constraints: readonly string[];
  readonly metrics: readonly Metric[];
  readonly systemDecisions: readonly SystemDecision[];
  readonly visualAssets: readonly VisualAsset[];
  readonly reflection: string;
  readonly volumeId: string;
}
export interface Hobby {
  readonly id: "books" | "gym" | "cooking" | "bambi";
  readonly label: string;
  readonly headline: string;
  readonly caption: string;
  readonly media: MediaAsset;
  readonly span: "square" | "tall" | "wide";
}
export interface AboutMe {
  readonly kicker: string;
  readonly headline: readonly string[];
  readonly emphasis: string;
  readonly intro: string;
  readonly story: readonly string[];
  readonly principles: readonly {
    readonly id: string;
    readonly title: string;
    readonly body: string;
  }[];
  readonly hobbies: readonly Hobby[];
  readonly portrait: MediaAsset;
}
export interface SiteIdentity {
  readonly name: string;
  readonly email: string;
}
export interface ResumeEntry {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly location: string;
  readonly summary: string;
  readonly highlights: readonly string[];
}
export interface EducationEntry {
  readonly id: string;
  readonly school: string;
  readonly qualification: string;
  readonly period: string;
}
export type Proficiency = "expert" | "strong" | "working";
export interface DesignSystemSkill {
  readonly id: string;
  readonly label: string;
  readonly proficiency: Proficiency;
  readonly note: string;
}
export interface Resume {
  readonly label: string;
  readonly headline: string;
  readonly summary: string;
  readonly downloadLabel: string;
  readonly experience: readonly ResumeEntry[];
  readonly education: readonly EducationEntry[];
  readonly coreSkills: readonly string[];
  readonly designSystemSkills: readonly DesignSystemSkill[];
  readonly tools: readonly string[];
}
export interface LedgerEntry {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly kind: "external" | "mail" | "file";
  readonly stamp: string;
}
export interface CheckoutSlip {
  readonly cardNumber: string;
  readonly title: string;
  readonly classification: string;
  readonly columns: readonly [string, string];
  readonly availability: {
    readonly status: AvailabilityStatus;
    readonly stamp: string;
    readonly label: string;
  };
  readonly ledger: readonly LedgerEntry[];
  readonly notice: string;
  readonly footnote: string;
}
export interface LibraryCopy {
  readonly eyebrow: string;
  readonly instruction: string;
  readonly back: string;
  readonly open: string;
  readonly shelfPlate: string;
  readonly volumeCount: string;
}

export const libraryCopy: LibraryCopy = {
  eyebrow: "PRODUCT DESIGNER · FOUNDING DESIGNER",
  instruction: "Pull a volume from the shelf",
  back: "Back to shelf",
  open: "Start reading",
  shelfPlate: "Khadijat — Folio Index",
  volumeCount: "4 Volumes",
};

export const volumes: readonly Volume[] = [
  {
    id: "vol-01",
    volume: "VOL. 01",
    spine: "SELECTED WORK",
    subtitle: "All product and systems case studies",
    readTime: "12 min read",
    contents: "work",
    heading: "Selected work, filed in one place.",
    description:
      "Design systems, product architecture, and zero-to-one work — each project opens as its own annotated scrapbook spread.",
    width: 66,
    height: 310,
    color: "#22252A",
    textColor: "#D8DCE5",
    typography: "mono",
    texture: "dots",
    accent: "lines",
  },
  {
    id: "vol-02",
    volume: "VOL. 02",
    spine: "field notes & life",
    subtitle: "Books, gym, cooking, Bambi",
    readTime: "4 min read",
    contents: "notes",
    heading: "Things I keep close when I am off the clock.",
    description:
      "A loose scrapbook of books, training, food, home, and Bambi — no forced lesson attached.",
    width: 50,
    height: 275,
    color: "#6E3727",
    textColor: "#E0B7A8",
    typography: "italic",
    texture: "coarse-dots",
    accent: "stitch",
  },
  {
    id: "vol-03",
    volume: "VOL. 03",
    spine: "AUTHOR & COLOPHON",
    subtitle: "About, experience & résumé",
    readTime: "3 min read",
    contents: "resume",
    heading: "Engineer by training. Designer by practice.",
    description:
      "My path into product design, the principles I work by, and a practical record of my experience.",
    width: 46,
    height: 260,
    color: "#DCD3C1",
    textColor: "#1A1A1A",
    typography: "sans",
    texture: "paper",
    accent: "ribbon",
  },
  {
    id: "vol-04",
    volume: "VOL. 04",
    spine: "SKETCHBOOKS & LOOSE LEAVES",
    subtitle: "Screens, visual studies, and unfinished ideas",
    readTime: "Browse freely",
    contents: "playground",
    heading: "Screens, studies, and ideas worth keeping.",
    description:
      "A visual drawer for interface studies, isolated screens, experiments, and work that does not need a full case study.",
    width: 54,
    height: 282,
    color: "#314A55",
    textColor: "#DCE8E8",
    typography: "serif",
    texture: "gradient",
    accent: "numeral",
  },
];

export const playground: readonly PlaygroundPiece[] = [];

export const projects: readonly Project[] = [
  {
    slug: "atlas",
    volumeId: "vol-01",
    title: "Giving a growing product one shared language",
    category: "Design System",
    role: "Lead product designer",
    timeline: "8 months",
    team: "3 designers, 8 engineers, product leads",
    platform: "Web + mobile",
    summary:
      "A component library, token architecture, and documentation site built while the product shipped every two weeks.",
    problem: [
      "The product had expanded quickly across several teams. Each team solved its own immediate needs, so people relearned familiar interactions from one area to the next and engineers maintained several versions of the same pattern.",
      "The inconsistency was easy to see. The harder problem was structural: there was no shared model for how the product should behave, so every new screen restarted a decision that had already been made three times.",
    ],
    solution: [
      "Built a semantic token architecture, a layered component model, and documentation that gave designers and engineers one shared reference.",
      "Introduced the system incrementally so teams could adopt it without interrupting the product’s two-week shipping rhythm.",
    ],
    constraints: [
      "The product could not stop shipping — nothing could require a coordinated freeze.",
      "Two design tools and one codebase had to stay in sync without a full-time systems team.",
      "Regulated surfaces meant some copy and states could not change without review.",
    ],
    systemDecisions: [
      {
        id: "atlas-semantic-tokens",
        decision:
          "Semantic tokens only. No component may reference a raw colour.",
        rationale:
          "A component bound to a hex value has to be reopened for every theme, brand, or contrast change. Binding to intent instead of value means themes become data.",
        tradeoff:
          "Slower to author, and it forces a naming argument early — but the argument happens once instead of at every new surface.",
      },
      {
        id: "atlas-shared-model",
        decision:
          "One shared interaction model, with defined extension points.",
        rationale:
          "Teams served different user groups and worried that standardisation would remove flexibility they genuinely needed.",
        tradeoff:
          "Teams could reuse the same foundation without forcing every workflow into an identical shape — but a shared model reduced local freedom, so extension points had to be explicit and governed.",
      },
      {
        id: "atlas-two-layer-components",
        decision:
          "Two-layer components: a private base, and the public component built on it.",
        rationale:
          "States and sizing live in the base; the public component only exposes what a consumer should choose. Fixing a state fixes every variant at once.",
        tradeoff:
          "Twice the components to maintain, and the indirection is invisible to consumers — so the pattern needs documenting or the next maintainer will flatten it.",
      },
    ],
    metrics: [],
    visualAssets: [
      {
        id: "atlas-audit",
        media: {
          src: "/assets/systems-audit.svg",
          alt: "Audit board showing button inconsistencies across the product",
          width: 1600,
          height: 1000,
          placeholder: "#CBD6FF",
        },
        caption:
          "Every button in the product, before. The audit that made the case.",
        spec: "AUDIT BOARD · 12 VARIANTS ACROSS 4 SURFACES",
      },
      {
        id: "atlas-layers",
        media: {
          src: "/assets/systems-layers.svg",
          alt: "Three-layer token architecture",
          width: 1600,
          height: 1000,
          placeholder: "#D8E0FF",
        },
        caption: "Three layers. Teams compose from the middle one.",
        spec: "PRIMITIVES → SEMANTIC → COMPONENT",
      },
      {
        id: "atlas-component",
        media: {
          src: "/assets/systems-component.svg",
          alt: "Component states and sizes across base and public layers",
          width: 1600,
          height: 1000,
          placeholder: "#E4E8F6",
        },
        caption: "One component, all the way down — every state, every size.",
        spec: "BASE + PUBLIC LAYER · 48 VARIANTS",
      },
    ],
    reflection:
      "Governance conversations should have started alongside the audit, not after the first components shipped. Beginning earlier would have made ownership clearer and saved a round of avoidable revision.",
  },
  {
    slug: "northstar",
    volumeId: "vol-01",
    title: "Turning an early idea into a product people could trust",
    category: "Zero to One",
    role: "Founding product designer",
    timeline: "Concept to launch",
    team: "Founders, product, engineering",
    platform: "Responsive web",
    summary:
      "A product model, a focused core journey, and the visual foundation the team went on to build from.",
    problem: [
      "The team saw an opportunity to make an intimidating financial task feel manageable, but early concepts mixed education, account activity, and transactions with no clear hierarchy.",
      "Before designing screens, I worked with the founders to define who the product was for, which decisions it needed to support, and the smallest experience that could earn trust.",
    ],
    solution: [
      "Concept testing showed people did not want another dense financial dashboard. They wanted a plain-language view of where they stood, and one obvious next action.",
    ],
    constraints: [
      "The proposition and technical scope were evolving together.",
      "Financial decisions required unusually clear states and language.",
      "A small team needed patterns it could reuse quickly.",
    ],
    systemDecisions: [
      {
        id: "northstar-journey-first",
        decision: "Design the journey before the dashboard.",
        rationale:
          "The dashboard was the most tangible idea in the room, but it depended on product decisions nobody had made yet. Building it first would have locked those decisions in by accident.",
        tradeoff:
          "We delayed the visually impressive artefact to resolve the less visible product logic — a hard thing to sell to a team that wants to see progress.",
      },
    ],
    metrics: [],
    visualAssets: [
      {
        id: "northstar-flow",
        media: {
          src: "/assets/northstar-flow.svg",
          alt: "Northstar product flow",
          width: 1600,
          height: 1000,
          placeholder: "#FFB99F",
        },
        caption: "Context and control remain visible throughout the core flow.",
        spec: "CORE FLOW · RESPONSIVE WEB · 7 STATES",
      },
    ],
    reflection:
      "Starting with the journey exposed product questions that a dashboard concept would have hidden. The slower first step made the rest of the product faster to design.",
  },
];

export const siteIdentity: SiteIdentity = {
  name: "Khadijat",
  email: "Bakarek008@gmail.com",
};
export const aboutMe: AboutMe = {
  kicker: "About",
  headline: ["Engineer by training.", "Designer by practice."],
  emphasis: "Designer by practice.",
  intro: "I design clear, coherent products from complex ideas.",
  story: [
    "I started out in mechanical engineering.",
    "Four years of it taught me one thing that stuck: how to take something complicated, break it into parts, and work out which part is actually causing the problem. I liked that a lot. I liked the machines less.",
    "[TODO — the turn. One or two sentences on the project, class, or person that made design look like the more interesting version of the same work. The most valuable paragraph on the page, and the only one I can’t write for you.]",
    "I moved into product design and it clicked faster than I expected. Same instinct — understand the system, find the constraints, work out where it’s failing — pointed at software and the people using it. The difference is that the constraint isn’t always physical. Sometimes it’s a regulator. Sometimes it’s someone with thirty seconds and no patience.",
    "These days I work in fintech, mostly on products for people that banks tend to keep waiting. My work sits in two places: architecture — deciding what a product is made of and how the pieces relate, usually before there’s a single screen — and the design system that stops a growing product from drifting into inconsistency.",
    "The engineering degree shows up less as a metaphor and more as a set of habits. I want to know why something works before I redraw it. I write things down. And I’m suspicious of designs that only work when everything goes right, which is why an unglamorous share of my time goes to error states, empty states, and the paths nobody wants to think about.",
  ],
  principles: [
    {
      id: "whole-system",
      title: "See the whole system",
      body: "Map the product, people, and dependencies before narrowing in on screens.",
    },
    {
      id: "visible-decisions",
      title: "Make decisions visible",
      body: "Use flows and prototypes to help teams evaluate trade-offs together.",
    },
    {
      id: "design-forward",
      title: "Design for what comes next",
      body: "Solve the immediate experience without creating tomorrow’s limitation.",
    },
  ],
  hobbies: [
    {
      id: "books",
      label: "BOOKS",
      headline: "I buy books faster than I read them.",
      caption:
        "Physical only — I’ve tried e-readers and it never sticks. Currently halfway through [title], and three others I’ve temporarily abandoned.",
      span: "tall",
      media: {
        src: "/assets/books.jpg",
        alt: "Personal book collection",
        width: 1200,
        height: 1600,
        placeholder: "#9c4f35",
      },
    },
    {
      id: "gym",
      label: "TRAINING",
      headline: "Weight training, most mornings.",
      caption: "It’s the one hour in the day nobody can put a meeting on.",
      span: "square",
      media: {
        src: "/assets/training.jpg",
        alt: "Weight training",
        width: 1200,
        height: 1200,
        placeholder: "#7f8581",
      },
    },
    {
      id: "cooking",
      label: "COOKING",
      headline: "I cook most nights.",
      caption:
        "Better at improvising than following the recipe, which has gone badly maybe twice.",
      span: "wide",
      media: {
        src: "/assets/cooking.jpg",
        alt: "Food being prepared",
        width: 1600,
        height: 1000,
        placeholder: "#d8a16c",
      },
    },
    {
      id: "bambi",
      label: "BAMBI",
      headline: "This is Bambi.",
      caption: "She sits on the desk, not next to it.",
      span: "square",
      media: {
        src: "/assets/bambi.jpg",
        alt: "Bambi the cat",
        width: 1200,
        height: 1200,
        placeholder: "#c5b39b",
      },
    },
  ],
  portrait: {
    src: "/assets/portrait.jpg",
    alt: "Portrait of Khadijat",
    width: 1200,
    height: 1500,
    placeholder: "#bcb6a8",
  },
};

export const resume: Resume = {
  label: "Résumé",
  headline: "Experience & capabilities.",
  summary:
    "Product designer working across product architecture, zero-to-one journeys, and the systems that help growing teams ship coherently.",
  downloadLabel: "Download Resume PDF ↗",
  experience: [
    {
      id: "founding-product-designer",
      company: "Company / Product",
      role: "Founding Product Designer",
      period: "2023 — Present",
      location: "Lagos, Nigeria",
      summary: "Led product design from early definition through launch.",
      highlights: [
        "Defined product architecture and end-to-end journeys.",
        "Established reusable foundations and contribution practices.",
      ],
    },
  ],
  education: [
    {
      id: "mechanical-engineering",
      school: "University",
      qualification: "B.Eng. Mechanical Engineering",
      period: "Completed",
    },
  ],
  coreSkills: [
    "Product architecture",
    "Zero-to-one design",
    "Interaction design",
    "Product strategy",
  ],
  designSystemSkills: [
    {
      id: "tokens-foundations",
      label: "Tokens and foundations",
      proficiency: "expert",
      note: "Semantic architecture, theming, and accessible foundations.",
    },
    {
      id: "component-apis",
      label: "Component APIs",
      proficiency: "expert",
      note: "Reusable patterns with deliberate extension points.",
    },
    {
      id: "governance",
      label: "Governance",
      proficiency: "strong",
      note: "Contribution, review, adoption, and ownership practices.",
    },
    {
      id: "documentation",
      label: "Documentation",
      proficiency: "strong",
      note: "Guidance that explains decisions, usage, and trade-offs.",
    },
  ],
  tools: ["Figma", "FigJam", "Prototyping", "Design tokens"],
};
export const checkoutSlip: CheckoutSlip = {
  cardNumber: "No. 001",
  classification: "745.2 BAK",
  title: "BAKARE, KHADIJAT — Selected Works",
  columns: ["BORROWER", "DATE"],
  availability: {
    status: "open",
    stamp: "AUGUST 2026 — AVAILABLE FOR WORK",
    label:
      "Open to select opportunities — full-time or a small number of projects.",
  },
  ledger: [
    {
      id: "email",
      label: "Email",
      href: `mailto:${siteIdentity.email}`,
      kind: "mail",
      stamp: "ANY TIME",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/khadijatbakare/",
      kind: "external",
      stamp: "WEEKDAYS",
    },
    {
      id: "medium",
      label: "Medium",
      href: "https://khadijatbakare.medium.com/",
      kind: "external",
      stamp: "WEEKENDS",
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/khadijatbakare",
      kind: "external",
      stamp: "OPEN LATE",
    },
  ],
  notice: "This volume may be borrowed indefinitely. Please return with notes.",
  footnote: "Set in Manrope, Newsreader and DM Mono. Built by hand.",
};

export const getProjectsByVolume = (volumeId: string) =>
  projects.filter((project) => project.volumeId === volumeId);
export const getVolume = (volumeId: string) =>
  volumes.find((volume) => volume.id === volumeId);
