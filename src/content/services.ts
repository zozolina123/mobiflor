import type { Locale } from "@/i18n/config";
import type { ProjectSlug } from "./project-images";

type Localized<T = string> = Record<Locale, T>;

export type Service = {
  slug: string;
  /** Short name used on cards, breadcrumbs and in structured data. */
  name: Localized;
  /** Card text on the home page. */
  card: Localized;
  /** Page heading, targeting "<service> Suceava" searches. */
  h1: Localized;
  /** Meta description, kept under ~155 characters. */
  description: Localized;
  intro: Localized<string[]>;
  offerings: Localized<string[]>;
  /** Real projects shown on the page, best match first. */
  projects: ProjectSlug[];
};

/*
 * Copy describes only what MOBI FLOR makes and what the project photos show.
 * Avoid adding promises (lead times, warranties, free visits) until the owner confirms them.
 */
const content: Service[] = [
  {
    slug: "bucatarii-la-comanda-suceava",
    name: { ro: "Bucătării la comandă", en: "Custom kitchens" },
    card: {
      ro: "Bucătării în L, în U sau cu insulă, cu electrocasnice încorporate, coloane înalte și iluminare sub corpuri.",
      en: "L-shaped, U-shaped and island kitchens with built-in appliances, tall units and under-cabinet lighting.",
    },
    h1: { ro: "Bucătării la comandă în Suceava", en: "Custom kitchens in Suceava" },
    description: {
      ro: "Bucătării la comandă în Suceava: în L, în U sau cu insulă, cu electrocasnice încorporate și iluminare LED. Proiectate, realizate și montate de MOBI FLOR.",
      en: "Custom kitchens in Suceava: L-shaped, U-shaped or with an island, built-in appliances and LED lighting. Designed, made and installed by MOBI FLOR.",
    },
    intro: {
      ro: [
        "O bucătărie la comandă pornește de la spațiul real: pereții, ferestrele, instalațiile și felul în care gătești. Măsurăm totul, propunem o organizare care folosește fiecare colț și realizăm corpurile exact pe dimensiunile camerei.",
        "Am realizat bucătării albe fără mânere, bucătării cu fronturi frezate verde salvie, combinații de alb și stejar sau fronturi greige cu coloane negre. Le montăm la locul lor, cu electrocasnicele încorporate.",
      ],
      en: [
        "A custom kitchen starts from the real room: the walls, windows, services and the way you cook. We measure everything, propose a layout that uses every corner and build the units to the exact dimensions of the room.",
        "We have made handleless white kitchens, sage green shaker kitchens, white-and-oak combinations and greige fronts with black tall units. We install them in place, with the appliances built in.",
      ],
    },
    offerings: {
      ro: [
        "Bucătării în L, în U sau cu insulă",
        "Corpuri suspendate până la tavan",
        "Coloane înalte pentru cuptor, frigider și cămară",
        "Electrocasnice încorporate",
        "Iluminare LED sub corpuri și în vitrine",
        "Fronturi mate, lucioase, frezate sau fără mânere",
      ],
      en: [
        "L-shaped, U-shaped and island kitchens",
        "Wall units up to the ceiling",
        "Tall units for the oven, fridge and pantry",
        "Built-in appliances",
        "LED lighting under units and in display cabinets",
        "Matte, gloss, shaker or handleless fronts",
      ],
    },
    projects: [
      "bucatarie-insula-led",
      "apartament-bucatarie-verde-birou-hol",
      "bucatarie-insula-stejar",
      "bucatarie-greige-coloane-negre",
      "selectie-bucatarii",
      "casa-dressing-walk-in-bucatarie",
    ],
  },
  {
    slug: "dressing-la-comanda-suceava",
    name: { ro: "Dressinguri & dulapuri", en: "Wardrobes & dressing rooms" },
    card: {
      ro: "Dressinguri walk-in, dulapuri cu uși glisante din sticlă, iluminare LED și sisteme de organizare la interior.",
      en: "Walk-in dressing rooms, glass sliding-door wardrobes, LED lighting and interior storage systems.",
    },
    h1: { ro: "Dressinguri și dulapuri la comandă în Suceava", en: "Custom wardrobes and dressing rooms in Suceava" },
    description: {
      ro: "Dressinguri walk-in și dulapuri la comandă în Suceava: uși glisante din sticlă, iluminare LED, dulapuri sub pantă de mansardă. Realizate de MOBI FLOR.",
      en: "Custom walk-in dressing rooms and wardrobes in Suceava: glass sliding doors, LED lighting, wardrobes under attic slopes. Made by MOBI FLOR.",
    },
    intro: {
      ro: [
        "Un dulap făcut pe măsură folosește tot spațiul disponibil, de la podea la tavan, inclusiv nișele și pantele de mansardă pe care mobilierul standard le lasă goale.",
        "Organizarea interioară se stabilește după ce ai de depozitat: bare de haine, inclusiv rabatabile pentru zona înaltă, sertare, rafturi și suporturi pentru încălțăminte.",
      ],
      en: [
        "A made-to-measure wardrobe uses all the available space, from floor to ceiling, including alcoves and attic slopes that standard furniture leaves empty.",
        "The interior layout is planned around what you need to store: hanging rails, including pull-down rails for the high section, drawers, shelves and shoe racks.",
      ],
    },
    offerings: {
      ro: [
        "Dressinguri walk-in",
        "Dulapuri încorporate, de la podea la tavan",
        "Uși glisante, inclusiv din sticlă",
        "Dulapuri sub panta mansardei",
        "Iluminare LED la interior",
        "Bare rabatabile, sertare și suporturi pentru încălțăminte",
      ],
      en: [
        "Walk-in dressing rooms",
        "Built-in, floor-to-ceiling wardrobes",
        "Sliding doors, including glass",
        "Wardrobes under attic slopes",
        "Interior LED lighting",
        "Pull-down rails, drawers and shoe racks",
      ],
    },
    projects: [
      "dressing-organizare-interioara",
      "casa-dressing-walk-in-bucatarie",
      "dulap-mansarda",
      "dormitor-dulapuri-pat-tapitat",
      "apartament-bucatarie-verde-birou-hol",
    ],
  },
  {
    slug: "dormitoare-la-comanda-suceava",
    name: { ro: "Dormitoare", en: "Bedrooms" },
    card: {
      ro: "Dulapuri care încadrează patul, panouri decorative și mobilier asortat pentru un dormitor ordonat.",
      en: "Wardrobes framing the bed, decorative panels and matching furniture for a calm, tidy bedroom.",
    },
    h1: { ro: "Mobilă de dormitor la comandă în Suceava", en: "Custom bedroom furniture in Suceava" },
    description: {
      ro: "Mobilă de dormitor la comandă în Suceava: dulapuri care încadrează patul, panouri cu lambriu, noptiere integrate și dulapuri de mansardă. MOBI FLOR.",
      en: "Custom bedroom furniture in Suceava: wardrobes framing the bed, slatted panels, built-in nightstands and attic wardrobes. MOBI FLOR.",
    },
    intro: {
      ro: [
        "Mobilierul de dormitor făcut pe comandă poate transforma peretele din spatele patului în spațiu de depozitare: dulapuri înalte pe laterale, un corp suspendat deasupra și noptiere integrate.",
        "Finisajele se aleg ca dormitorul să rămână liniștit și unitar, de la fronturi mate până la panouri decorative cu lambriu.",
      ],
      en: [
        "Custom bedroom furniture can turn the wall behind the bed into storage: tall wardrobes at the sides, an overhead unit above and built-in nightstands.",
        "Finishes are chosen to keep the bedroom calm and consistent, from matte fronts to slatted decorative panels.",
      ],
    },
    offerings: {
      ro: [
        "Dulapuri care încadrează patul",
        "Corpuri suspendate deasupra patului",
        "Noptiere integrate",
        "Panouri decorative cu lambriu",
        "Dulapuri pentru mansardă",
      ],
      en: [
        "Wardrobes framing the bed",
        "Overhead units above the bed",
        "Built-in nightstands",
        "Slatted decorative panels",
        "Attic wardrobes",
      ],
    },
    projects: ["dormitor-dulapuri-pat-tapitat", "dulap-mansarda", "dressing-organizare-interioara"],
  },
  {
    slug: "lambriuri-si-separatoare-suceava",
    name: { ro: "Lambriuri & separatoare", en: "Wall panelling & dividers" },
    card: {
      ro: "Placări cu lambriu, pereți decorativi și separatoare de spațiu care dau caracter unei camere.",
      en: "Slatted wall panelling, feature walls and room dividers that give a space character.",
    },
    h1: { ro: "Lambriuri și separatoare de spațiu în Suceava", en: "Wall panelling and room dividers in Suceava" },
    description: {
      ro: "Lambriuri decorative, pereți placați cu lemn și separatoare din șipci, la comandă în Suceava. Pentru locuințe și spații comerciale. MOBI FLOR.",
      en: "Custom slatted wall panelling, timber-clad walls and slat room dividers in Suceava, for homes and commercial spaces. MOBI FLOR.",
    },
    intro: {
      ro: [
        "Un perete placat cu lambriu sau un separator din șipci schimbă complet o cameră: aduce căldura lemnului, delimitează zonele și poate ascunde instalații sau uși.",
        "Realizăm placări și separatoare pentru living, dormitor sau hol, dar și placări de perete cu iluminare LED integrată pentru spații mari.",
      ],
      en: [
        "A slatted feature wall or a slat divider completely changes a room: it brings the warmth of wood, defines zones and can hide services or doors.",
        "We make panelling and dividers for living rooms, bedrooms and hallways, as well as wall panelling with integrated LED lighting for large spaces.",
      ],
    },
    offerings: {
      ro: [
        "Pereți placați cu lambriu",
        "Separatoare de spațiu din șipci",
        "Panouri decorative în spatele patului sau al televizorului",
        "Placări cu iluminare LED integrată",
        "Mobilier asortat",
      ],
      en: [
        "Slat-clad feature walls",
        "Slat room dividers",
        "Decorative panels behind the bed or TV",
        "Panelling with integrated LED lighting",
        "Matching furniture",
      ],
    },
    projects: ["lambriuri-separatoare", "amenajare-placari-lemn-led", "dormitor-dulapuri-pat-tapitat"],
  },
  {
    slug: "mobilier-birou-si-hol-suceava",
    name: { ro: "Birou & hol", en: "Office & hallway" },
    card: {
      ro: "Birouri pentru acasă, biblioteci, mobilier de hol cu dulapuri glisante și console.",
      en: "Home offices, bookcases, hallway furniture with sliding wardrobes and consoles.",
    },
    h1: { ro: "Mobilier de birou și hol la comandă în Suceava", en: "Custom office and hallway furniture in Suceava" },
    description: {
      ro: "Birouri pentru acasă, biblioteci și mobilier de hol la comandă în Suceava: console, dulapuri glisante, corpuri suspendate. Realizate de MOBI FLOR.",
      en: "Custom home offices, bookcases and hallway furniture in Suceava: consoles, sliding wardrobes and wall units. Made by MOBI FLOR.",
    },
    intro: {
      ro: [
        "Un birou făcut pe măsură se potrivește exact în nișa sau peretele disponibil, cu loc pentru două persoane, rafturi și corpuri suspendate pentru documente.",
        "Holul este prima impresie a casei: o consolă, un dulap cu uși glisante și un loc pentru încălțăminte păstrează intrarea ordonată.",
      ],
      en: [
        "A made-to-measure desk fits exactly into the available alcove or wall, with room for two people, shelving and wall units for paperwork.",
        "The hallway is the first impression of a home: a console, a sliding-door wardrobe and a place for shoes keep the entrance tidy.",
      ],
    },
    offerings: {
      ro: [
        "Birouri pentru una sau două persoane",
        "Biblioteci și rafturi",
        "Corpuri suspendate deasupra biroului",
        "Console și mobilier de hol",
        "Dulapuri de hol cu uși glisante",
      ],
      en: [
        "Desks for one or two people",
        "Bookcases and shelving",
        "Wall units above the desk",
        "Consoles and hallway furniture",
        "Hallway wardrobes with sliding doors",
      ],
    },
    projects: ["apartament-bucatarie-verde-birou-hol", "lambriuri-separatoare"],
  },
  {
    slug: "amenajari-comerciale-suceava",
    name: { ro: "Amenajări comerciale", en: "Commercial fit-outs" },
    card: {
      ro: "Rafturi de expunere, placări și mobilier pentru magazine și spații comerciale.",
      en: "Display shelving, wall panelling and furniture for shops and commercial spaces.",
    },
    h1: { ro: "Mobilier comercial la comandă în Suceava", en: "Custom commercial furniture in Suceava" },
    description: {
      ro: "Mobilier comercial la comandă în Suceava: rafturi de expunere, vitrine iluminate și placări din lemn pentru magazine și spații comerciale. MOBI FLOR.",
      en: "Custom commercial furniture in Suceava: display shelving, illuminated cabinets and timber panelling for shops and commercial spaces. MOBI FLOR.",
    },
    intro: {
      ro: [
        "Într-un spațiu comercial, mobilierul trebuie să pună produsele în valoare și să reziste la folosire zilnică. Realizăm rafturi de expunere și corpuri pe toată lungimea peretelui, după planul spațiului.",
        "Pentru expunere folosim și vitrine cu uși din sticlă și rafturi iluminate LED, iar pentru spațiile mari, placări de perete cu decor de lemn și iluminare integrată.",
      ],
      en: [
        "In a commercial space, furniture has to show products at their best and stand up to daily use. We make display shelving and units along the full length of the wall, following the floor plan.",
        "For display we also make glass-door cabinets with LED-lit shelves, and for large spaces, timber-effect wall panelling with integrated lighting.",
      ],
    },
    offerings: {
      ro: [
        "Rafturi de expunere pentru magazine",
        "Vitrine cu uși din sticlă și rafturi iluminate",
        "Placări de perete cu decor de lemn",
        "Iluminare LED integrată",
        "Compartimente de depozitare",
      ],
      en: [
        "Display shelving for shops",
        "Glass-door cabinets with lit shelves",
        "Timber-effect wall panelling",
        "Integrated LED lighting",
        "Storage cubbies",
      ],
    },
    projects: ["amenajare-magazin", "vitrine-iluminate", "amenajare-placari-lemn-led"],
  },
];

export const services = content;
export const getService = (slug: string) => services.find((s) => s.slug === slug);
