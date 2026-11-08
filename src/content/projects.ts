import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/config";
import { projectImages, type ProjectSlug } from "./project-images";

/*
 * Real MOBI FLOR projects. Photos are imported by scripts/import-photos.mjs.
 * Order here = order on the site. `alt` has one entry per photo, in the order of the photos.
 */

import { categories, type Category } from "./categories";

export { categories, type Category };

type Localized<T = string> = Record<Locale, T>;

type ProjectContent = {
  slug: ProjectSlug;
  category: Category;
  title: Localized;
  summary: Localized;
  description: Localized;
  /** Features visible in the photos. Add town, dimensions and timeline here when known. */
  highlights: Localized<string[]>;
  alt: Localized<string[]>;
};

export type Project = ProjectContent & { images: StaticImageData[]; cover: StaticImageData };

const content: ProjectContent[] = [
  {
    slug: "bucatarie-insula-led",
    category: "kitchen",
    title: { ro: "Bucătărie albă cu insulă iluminată", en: "White kitchen with an illuminated island" },
    summary: { ro: "Fronturi albe mate, blat negru, insulă cu LED", en: "Matte white fronts, black worktop, LED island" },
    description: {
      ro: "Bucătărie în L cu fronturi albe fără mânere, blat și placare negre și o insulă cu model geometric iluminat LED, care devine piesa centrală a spațiului. Corpurile suspendate merg până la tavan, iar coloanele înalte integrează electrocasnicele.",
      en: "An L-shaped kitchen with handleless white fronts, a black worktop and backsplash, and an island with a geometric LED pattern that becomes the centrepiece of the room. Wall units run up to the ceiling and tall units house the built-in appliances.",
    },
    highlights: {
      ro: ["Fronturi albe mate, fără mânere", "Corpuri suspendate până la tavan", "Blat și placare negre cu aspect de marmură", "Insulă cu model geometric iluminat LED", "Coloane înalte pentru cuptor și electrocasnice", "Iluminare LED sub corpurile suspendate"],
      en: ["Handleless matte white fronts", "Wall units running up to the ceiling", "Black marble-effect worktop and backsplash", "Island with a geometric LED pattern", "Tall units for the oven and appliances", "LED lighting under the wall units"],
    },
    alt: {
      ro: [
        "Insulă de bucătărie cu model geometric iluminat LED și blat negru",
        "Bucătărie albă în L cu blat negru și insulă iluminată",
        "Bucătărie albă la comandă cu corpuri suspendate până la tavan",
      ],
      en: [
        "Kitchen island with a geometric LED pattern and a black top",
        "White L-shaped kitchen with a black worktop and lit island",
        "White custom kitchen with wall units up to the ceiling",
      ],
    },
  },
  {
    slug: "apartament-bucatarie-verde-birou-hol",
    category: "kitchen",
    title: { ro: "Apartament: bucătărie verde, birou și hol", en: "Apartment: green kitchen, office and hallway" },
    summary: { ro: "Fronturi frezate verde salvie, birou și hol", en: "Sage shaker fronts, home office and hallway" },
    description: {
      ro: "Mobilier pentru un apartament întreg: bucătărie cu fronturi frezate verde salvie, vitrină cu sticlă și blat cu aspect de lemn, un birou pentru două persoane cu bibliotecă integrată și mobilier de hol cu consolă și dulap cu uși glisante.",
      en: "Furniture for a whole apartment: a kitchen with sage green shaker fronts, a glass display cabinet and a wood-effect worktop, a two-person home office with built-in shelving, and hallway furniture with a console and sliding-door wardrobe.",
    },
    highlights: {
      ro: ["Bucătărie cu fronturi frezate verde salvie", "Vitrină cu uși din sticlă și rafturi iluminate", "Blat cu aspect de lemn și iluminare sub corpuri", "Birou pentru două persoane cu bibliotecă", "Corpuri suspendate albe deasupra biroului", "Mobilier de hol cu consolă și dulap cu uși glisante"],
      en: ["Kitchen with sage green shaker fronts", "Glass-door display cabinet with lit shelves", "Wood-effect worktop with under-cabinet lighting", "Two-person desk with built-in shelving", "White wall units above the desk", "Hallway console and sliding-door wardrobe"],
    },
    alt: {
      ro: [
        "Bucătărie cu fronturi frezate verde salvie și vitrină cu sticlă",
        "Detaliu de bucătărie verde cu plită și iluminare sub corpuri",
        "Bucătărie verde văzută din hol, cu aplică de perete",
        "Birou pentru două persoane cu bibliotecă și corpuri suspendate albe",
        "Mobilier de hol cu consolă albă și dulap cu uși glisante",
      ],
      en: [
        "Kitchen with sage green shaker fronts and a glass display cabinet",
        "Green kitchen detail with hob and under-cabinet lighting",
        "Green kitchen seen from the hallway, with a wall light",
        "Two-person home office with shelving and white wall units",
        "Hallway furniture with a white console and sliding-door wardrobe",
      ],
    },
  },
  {
    slug: "bucatarie-insula-stejar",
    category: "kitchen",
    title: { ro: "Bucătărie cu insulă, stejar și alb", en: "Oak and white island kitchen" },
    summary: { ro: "Insulă cu blat din stejar, spoturi încastrate", en: "Oak-topped island, recessed spotlights" },
    description: {
      ro: "Bucătărie deschisă care combină fronturile albe cu decorul de stejar, cu o insulă generoasă, corpuri înalte și o nișă cu rafturi pentru sticle, luminată de spoturi încastrate.",
      en: "An open kitchen combining white fronts with an oak finish, with a generous island, tall units and a bottle-rack niche, lit by recessed spotlights.",
    },
    highlights: {
      ro: ["Insulă generoasă cu blat cu decor de stejar", "Combinație de fronturi albe și stejar", "Coloane înalte cu electrocasnice încorporate", "Nișă cu rafturi pentru sticle", "Spoturi încastrate deasupra zonei de lucru"],
      en: ["Generous island with an oak-effect top", "White and oak fronts combined", "Tall units with built-in appliances", "Bottle-rack niche", "Recessed spotlights over the work area"],
    },
    alt: {
      ro: [
        "Bucătărie cu insulă din stejar și fronturi albe",
        "Insulă de bucătărie lungă cu blat din stejar",
        "Bucătărie stejar și alb cu spoturi încastrate",
        "Bucătărie cu insulă văzută dinspre ușa de terasă",
      ],
      en: [
        "Kitchen with an oak island and white fronts",
        "Long kitchen island with an oak top",
        "Oak and white kitchen with recessed spotlights",
        "Island kitchen seen from the patio door",
      ],
    },
  },
  {
    slug: "bucatarie-greige-coloane-negre",
    category: "kitchen",
    title: { ro: "Bucătărie greige cu coloane negre", en: "Greige kitchen with black tall units" },
    summary: { ro: "Fronturi fără mânere, coloane negre pentru electrocasnice", en: "Handleless fronts, black appliance towers" },
    description: {
      ro: "Bucătărie în L cu fronturi greige fără mânere, corpuri suspendate cu front canelat și coloane negre pentru cuptor și frigider. Fotografiile sunt făcute la final de montaj, înainte de predare.",
      en: "An L-shaped kitchen with handleless greige fronts, fluted wall units and black tall units for the oven and fridge. The photos were taken at the end of installation, before handover.",
    },
    highlights: {
      ro: ["Bucătărie în L cu fronturi greige fără mânere", "Corpuri suspendate cu front canelat", "Coloane negre pentru cuptor și frigider", "Blat negru", "Montaj cu podeaua protejată pe toată durata lucrului"],
      en: ["L-shaped kitchen with handleless greige fronts", "Fluted wall units", "Black tall units for the oven and fridge", "Black worktop", "Floor kept protected throughout the installation"],
    },
    alt: {
      ro: [
        "Bucătărie greige cu coloane negre pentru cuptor și frigider",
        "Bucătărie greige în L cu blat negru, la finalul montajului",
        "Bucătărie greige cu corpuri suspendate cu front canelat",
        "Bucătărie greige fără mânere cu blat negru",
        "Colț de bucătărie greige cu coloană neagră pentru electrocasnice",
      ],
      en: [
        "Greige kitchen with black tall units for the oven and fridge",
        "Greige L-shaped kitchen with a black worktop, at the end of installation",
        "Greige kitchen with fluted wall units",
        "Handleless greige kitchen with a black worktop",
        "Greige kitchen corner with a black appliance tower",
      ],
    },
  },
  {
    slug: "selectie-bucatarii",
    category: "kitchen",
    title: { ro: "Selecție de bucătării", en: "A selection of kitchens" },
    summary: { ro: "Bucătării compacte și mobilier pentru spălătorie", en: "Compact kitchens and laundry units" },
    description: {
      ro: "O selecție de bucătării realizate pentru diferite spații și stiluri, de la fronturi gri cu iluminare LED la bucătării crem sau roz, plus coloane pentru mașina de spălat și depozitare.",
      en: "A selection of kitchens made for different spaces and styles, from grey fronts with LED lighting to cream and pink kitchens, plus tall units for the washing machine and storage.",
    },
    highlights: {
      ro: ["Bucătărie gri cu iluminare LED și placare cu aspect de marmură", "Bucătărie crem cu blat gri", "Bucătărie în L cu fronturi roz", "Bucătărie albă cu loc pentru mașina de spălat", "Coloane înalte pentru spălătorie și depozitare"],
      en: ["Grey kitchen with LED lighting and a marble-effect backsplash", "Cream kitchen with a grey worktop", "L-shaped kitchen with pink fronts", "White kitchen with space for a washing machine", "Tall laundry and storage units"],
    },
    alt: {
      ro: [
        "Bucătărie gri cu iluminare LED și placare cu aspect de marmură",
        "Bucătărie crem cu blat gri",
        "Bucătărie în L cu fronturi roz",
        "Bucătărie albă cu loc pentru mașina de spălat",
        "Coloane înalte albe cu nișă pentru mașina de spălat",
      ],
      en: [
        "Grey kitchen with LED lighting and a marble-effect backsplash",
        "Cream kitchen with a grey worktop",
        "L-shaped kitchen with pink fronts",
        "White kitchen with space for the washing machine",
        "Tall white units with a washing machine niche",
      ],
    },
  },
  {
    slug: "dressing-organizare-interioara",
    category: "wardrobe",
    title: { ro: "Dressing cu organizare interioară", en: "Wardrobe with a fitted interior" },
    summary: { ro: "Sertare, bară de haine rabatabilă, suport pentru încălțăminte", en: "Drawers, pull-down hanging rail, shoe rack" },
    description: {
      ro: "Dressing gândit pe dinăuntru: sertare, rafturi, suport pentru încălțăminte și bare de haine rabatabile, care aduc la îndemână și zona înaltă a dulapului.",
      en: "A wardrobe planned from the inside out: drawers, shelves, a shoe rack and pull-down hanging rails that bring the high section within easy reach.",
    },
    highlights: {
      ro: ["Bare de haine rabatabile pentru zona înaltă", "Sertare și rafturi la interior", "Suport pentru încălțăminte", "Corpuri albe cu mânere negre"],
      en: ["Pull-down hanging rails for the high section", "Drawers and shelves inside", "Shoe rack", "White units with black handles"],
    },
    alt: {
      ro: [
        "Interior de dressing cu sertare și bare de haine rabatabile",
        "Corp de dressing cu sertare și suport pentru încălțăminte",
      ],
      en: [
        "Wardrobe interior with drawers and pull-down hanging rails",
        "Wardrobe unit with drawers and a shoe rack",
      ],
    },
  },
  {
    slug: "dormitor-dulapuri-pat-tapitat",
    category: "wardrobe",
    title: { ro: "Dormitor cu dulapuri care încadrează patul", en: "Bedroom with wardrobes framing the bed" },
    summary: { ro: "Dulapuri înalte, panou cu lambriu, pat tapițat", en: "Tall wardrobes, slatted panel, upholstered bed" },
    description: {
      ro: "Dormitor cu dulapuri înalte de o parte și de alta a patului, legate printr-un corp suspendat, cu panou decorativ cu lambriu și noptiere integrate. Patul tapițat completează ansamblul.",
      en: "A bedroom with tall wardrobes on either side of the bed, joined by an overhead unit, with a slatted decorative panel and integrated nightstands. The upholstered bed completes the set.",
    },
    highlights: {
      ro: ["Dulapuri înalte de o parte și de alta a patului", "Corp suspendat deasupra patului", "Panou decorativ cu lambriu", "Noptiere integrate", "Pat tapițat asortat"],
      en: ["Tall wardrobes on either side of the bed", "Overhead unit above the bed", "Slatted decorative panel", "Built-in nightstands", "Matching upholstered bed"],
    },
    alt: {
      ro: [
        "Dormitor cu dulapuri înalte de o parte și de alta a patului",
        "Dulapuri de dormitor cu panou cu lambriu în spatele patului",
        "Dormitor cu dulapuri crem și pat tapițat",
        "Dormitor văzut din colț, cu dulapuri și noptiere integrate",
      ],
      en: [
        "Bedroom with tall wardrobes on either side of the bed",
        "Bedroom wardrobes with a slatted panel behind the bed",
        "Bedroom with cream wardrobes and an upholstered bed",
        "Bedroom seen from the corner, with wardrobes and built-in nightstands",
      ],
    },
  },
  {
    slug: "casa-dressing-walk-in-bucatarie",
    category: "wardrobe",
    title: { ro: "Casă: dressing walk-in, dulapuri și bucătărie", en: "House: walk-in dressing room, wardrobes and kitchen" },
    summary: { ro: "Dressing walk-in, perete de dulapuri, bucătărie albă", en: "Walk-in dressing room, wardrobe wall, white kitchen" },
    description: {
      ro: "Mobilier pentru o casă: un dressing walk-in cu rafturi și sertare pe ambele laturi, un perete întreg de dulapuri cu spoturi încastrate și o bucătărie albă cu blat cu aspect de lemn.",
      en: "Furniture for a house: a walk-in dressing room with shelving and drawers on both sides, a full wall of wardrobes with recessed spotlights, and a white kitchen with a wood-effect worktop.",
    },
    highlights: {
      ro: ["Dressing walk-in cu rafturi pe ambele laturi", "Sertare și bare de haine", "Perete întreg de dulapuri cu spoturi încastrate", "Bucătărie albă cu blat cu aspect de lemn"],
      en: ["Walk-in dressing room with shelving on both sides", "Drawers and hanging rails", "Full wall of wardrobes with recessed spotlights", "White kitchen with a wood-effect worktop"],
    },
    alt: {
      ro: [
        "Perete întreg de dulapuri albe cu sertare și spoturi încastrate",
        "Dressing walk-in cu rafturi pe ambele laturi",
        "Bucătărie albă cu blat cu aspect de lemn",
        "Rafturi de dressing walk-in până la tavan",
      ],
      en: [
        "Full wall of white wardrobes with drawers and recessed spotlights",
        "Walk-in dressing room with shelving on both sides",
        "White kitchen with a wood-effect worktop",
        "Floor-to-ceiling walk-in dressing room shelving",
      ],
    },
  },
  {
    slug: "dulap-mansarda",
    category: "wardrobe",
    title: { ro: "Dulap sub panta mansardei", en: "Wardrobe under an attic slope" },
    summary: { ro: "Dulap pe măsura unui tavan înclinat", en: "Wardrobe shaped to a sloped ceiling" },
    description: {
      ro: "Dulap realizat pe măsura unui tavan înclinat de mansardă, care folosește tot spațiul de sub pantă, cu rafturi, sertare și bare de haine.",
      en: "A wardrobe made to fit a sloped attic ceiling, using all the space under the slope, with shelves, drawers and hanging rails.",
    },
    highlights: {
      ro: ["Dulap realizat pe forma pantei de mansardă", "Rafturi și sertare la interior", "Bare de haine", "Uși pe toată înălțimea disponibilă"],
      en: ["Wardrobe shaped to the attic slope", "Shelves and drawers inside", "Hanging rails", "Doors using the full available height"],
    },
    alt: {
      ro: ["Dulap deschis sub panta mansardei, cu rafturi și sertare", "Dulap închis sub tavan înclinat de mansardă"],
      en: ["Open wardrobe under an attic slope, with shelves and drawers", "Closed wardrobe under a sloped attic ceiling"],
    },
  },
  {
    slug: "lambriuri-separatoare",
    category: "living",
    title: { ro: "Lambriuri și separatoare de spațiu", en: "Wall panelling and room dividers" },
    summary: { ro: "Pereți cu lambriu, separatoare, mobilier de living", en: "Slatted walls, dividers, living room furniture" },
    description: {
      ro: "Placări cu lambriu pe perete, separatoare de spațiu din șipci și mobilier de living cu dulapuri, folosite pentru a delimita zonele și a da căldură camerei.",
      en: "Slatted wall panelling, slat room dividers and living room furniture with wardrobes, used to define zones and bring warmth to a room.",
    },
    highlights: {
      ro: ["Pereți placați cu lambriu de lemn", "Separator de spațiu din șipci de lemn", "Separator alb din șipci", "Dulap de living asortat"],
      en: ["Walls clad in timber slat panelling", "Timber slat room divider", "White slatted divider", "Matching living room wardrobe"],
    },
    alt: {
      ro: [
        "Living cu separator din șipci de lemn și perete turcoaz",
        "Perete placat cu lambriu de lemn",
        "Separator de spațiu alb din șipci",
        "Dulap crem lângă separator din șipci de lemn",
      ],
      en: [
        "Living room with a timber slat divider and a turquoise wall",
        "Wall clad in timber slat panelling",
        "White slatted room divider",
        "Cream wardrobe next to a timber slat divider",
      ],
    },
  },
  {
    slug: "amenajare-placari-lemn-led",
    category: "commercial",
    title: { ro: "Amenajare cu placări din lemn și LED", en: "Fit-out with timber panelling and LED" },
    summary: { ro: "Placări cu lemn, iluminare LED, compartimente de depozitare", en: "Timber panelling, LED lighting, storage cubbies" },
    description: {
      ro: "Amenajare pentru un spațiu mare: placări de perete cu decor de lemn și iluminare LED integrată, uși și compartimente de depozitare asortate pe toată lungimea sălii.",
      en: "A fit-out for a large space: timber-effect wall panelling with integrated LED lighting, matching doors and storage cubbies along the full length of the room.",
    },
    highlights: {
      ro: ["Placări de perete cu decor de lemn", "Iluminare LED integrată în placări", "Uși și vitrine asortate", "Compartimente de depozitare pe toată lungimea sălii"],
      en: ["Timber-effect wall panelling", "LED lighting built into the panelling", "Matching doors and glazed cabinets", "Storage cubbies along the full length of the room"],
    },
    alt: {
      ro: [
        "Placări de perete cu decor de lemn și iluminare LED",
        "Sală mare cu placări din lemn și compartimente de depozitare",
        "Placare cu lemn și LED în jurul unui stâlp",
        "Perete placat cu lemn, uși și compartimente asortate",
        "Sală cu placări din lemn de-a lungul pereților",
        "Vedere de ansamblu asupra sălii cu placări din lemn",
      ],
      en: [
        "Timber-effect wall panelling with LED lighting",
        "Large room with timber panelling and storage cubbies",
        "Timber and LED cladding around a pillar",
        "Timber-clad wall with matching doors and cubbies",
        "Room with timber panelling along the walls",
        "Overview of the room with timber panelling",
      ],
    },
  },
  {
    slug: "vitrine-iluminate",
    category: "living",
    title: { ro: "Vitrine iluminate pentru o colecție", en: "Illuminated display cabinets for a collection" },
    summary: { ro: "Vitrine înalte cu rafturi iluminate LED", en: "Tall cabinets with LED-lit shelves" },
    description: {
      ro: "Vitrine de la podea la tavan, cu uși din sticlă cu ramă neagră și rafturi iluminate LED pe toată înălțimea, realizate pentru expunerea unei colecții de machete auto.",
      en: "Floor-to-ceiling display cabinets with black-framed glass doors and LED-lit shelves along their full height, made to show off a collection of scale model cars.",
    },
    highlights: {
      ro: ["Vitrine de la podea la tavan", "Uși din sticlă cu ramă neagră", "Rafturi iluminate LED pe toată înălțimea", "Gândite pentru expunerea unei colecții"],
      en: ["Floor-to-ceiling display cabinets", "Black-framed glass doors", "LED-lit shelves along the full height", "Designed to display a collection"],
    },
    alt: {
      ro: [
        "Vitrine înalte cu rafturi iluminate LED și colecție de machete auto",
        "Perete de rafturi iluminate LED, înainte de așezarea colecției",
        "Vitrine cu ramă neagră și rafturi iluminate",
        "Rafturi de expunere iluminate LED, văzute din lateral",
      ],
      en: [
        "Tall display cabinets with LED-lit shelves and a scale model car collection",
        "Wall of LED-lit shelves, before the collection was placed",
        "Black-framed display cabinets with lit shelves",
        "LED-lit display shelves seen from the side",
      ],
    },
  },
  {
    slug: "amenajare-magazin",
    category: "commercial",
    title: { ro: "Amenajare magazin", en: "Shop fit-out" },
    summary: { ro: "Rafturi de expunere din lemn, în timpul montajului", en: "Timber display shelving, during installation" },
    description: {
      ro: "Mobilier de expunere pentru un magazin: rafturi și corpuri cu decor de lemn pe toată lungimea peretelui, fotografiate în timpul montajului.",
      en: "Display furniture for a shop: timber-effect shelving and units along the full length of the wall, photographed during installation.",
    },
    highlights: {
      ro: ["Rafturi de expunere cu decor de lemn", "Mobilier pe toată lungimea peretelui", "Montaj la fața locului"],
      en: ["Timber-effect display shelving", "Furniture along the full length of the wall", "Installed on site"],
    },
    alt: {
      ro: ["Rafturi de expunere din lemn într-un magazin, în timpul montajului"],
      en: ["Timber display shelving in a shop, during installation"],
    },
  },
];

export const projects: Project[] = content.map((p) => {
  const images = projectImages[p.slug];
  // Alt texts are matched to photos by position, so counts must agree (fails the build otherwise).
  for (const lang of ["ro", "en"] as const) {
    if (p.alt[lang].length !== images.length) {
      throw new Error(`${p.slug}: ${images.length} photos but ${p.alt[lang].length} ${lang} alt texts`);
    }
  }
  return { ...p, images, cover: images[0] };
});

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Shortcuts to individual photos used in page sections. */
export const photo = (slug: ProjectSlug, index = 0) => projectImages[slug][index];
