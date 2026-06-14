export const SITE_URL = 'https://kolbovskiy.club';
export const MAIN_SITE_URL = 'https://kolbovskiy.com';
export const PICS_SITE_URL = 'https://kolbovskiy.pics';

export const KOLBOVSKIY_PERSON_ID = 'https://kolbovskiy.com/#person';
export const KOLBOVSKIY_DIGITAL_BODY_ID = 'https://kolbovskiy.com/#digital-body';
export const KOLBOVSKIY_MAIN_WEBSITE_ID = 'https://kolbovskiy.com/#website';
export const KOLBOVSKIY_PICS_WEBSITE_ID = 'https://kolbovskiy.pics/#website';
export const KOLBOVSKIY_CLUB_WEBSITE_ID = 'https://kolbovskiy.club/#website';

export const KOLBOVSKIY_SAME_AS = [
  'https://kolbovskiy.com/',
  'https://kolbovskiy.pics/',
  'https://kolbovskiy.club/',
  'https://t.me/klb_clb'
];

export const kolbovskiyPerson = {
  '@type': 'Person',
  '@id': KOLBOVSKIY_PERSON_ID,
  name: 'Nikita Kolbovskiy',
  alternateName: ['Никита Колбовский', 'Kolbovskiy'],
  url: `${MAIN_SITE_URL}/`,
  sameAs: KOLBOVSKIY_SAME_AS
};

export const kolbovskiyMainWebsite = {
  '@type': 'WebSite',
  '@id': KOLBOVSKIY_MAIN_WEBSITE_ID,
  name: 'kolbovskiy.com',
  url: `${MAIN_SITE_URL}/`,
  inLanguage: ['en', 'ru'],
  description: 'Main portfolio and central identity site of Nikita Kolbovskiy.',
  creator: { '@id': KOLBOVSKIY_PERSON_ID },
  publisher: { '@id': KOLBOVSKIY_PERSON_ID }
};

export const kolbovskiyPicsWebsite = {
  '@type': 'WebSite',
  '@id': KOLBOVSKIY_PICS_WEBSITE_ID,
  name: 'kolbovskiy.pics',
  url: `${PICS_SITE_URL}/`,
  inLanguage: ['en', 'ru'],
  description: 'Architectural visualization and image portfolio by Nikita Kolbovskiy.',
  creator: { '@id': KOLBOVSKIY_PERSON_ID },
  publisher: { '@id': KOLBOVSKIY_PERSON_ID },
  isPartOf: { '@id': KOLBOVSKIY_DIGITAL_BODY_ID }
};

export const kolbovskiyDigitalBody = {
  '@type': 'CreativeWorkSeries',
  '@id': KOLBOVSKIY_DIGITAL_BODY_ID,
  name: 'Kolbovskiy',
  alternateName: ['Nikita Kolbovskiy', 'Никита Колбовский'],
  url: `${MAIN_SITE_URL}/`,
  creator: { '@id': KOLBOVSKIY_PERSON_ID },
  mainEntity: { '@id': KOLBOVSKIY_PERSON_ID },
  hasPart: [
    { '@id': KOLBOVSKIY_MAIN_WEBSITE_ID },
    { '@id': KOLBOVSKIY_PICS_WEBSITE_ID },
    { '@id': KOLBOVSKIY_CLUB_WEBSITE_ID }
  ]
};

export const kolbovskiyClubWebsite = {
  '@type': ['WebSite', 'Blog'],
  '@id': KOLBOVSKIY_CLUB_WEBSITE_ID,
  name: 'kolbovskiy.club',
  alternateName: ['KLB CLB', 'Колбовский клуб'],
  url: `${SITE_URL}/`,
  inLanguage: 'ru',
  description: 'Авторское издание Никиты Колбовского о реальном мире: технологиях, рынках, власти, культуре, архитектуре, путешествиях и сбоях системы.',
  genre: ['author media', 'public archive', 'journal'],
  creator: { '@id': KOLBOVSKIY_PERSON_ID },
  publisher: { '@id': KOLBOVSKIY_PERSON_ID },
  isPartOf: { '@id': KOLBOVSKIY_DIGITAL_BODY_ID },
  about: { '@id': KOLBOVSKIY_DIGITAL_BODY_ID },
  sameAs: ['https://t.me/klb_clb']
};

export const baseEntityGraph = [
  kolbovskiyPerson,
  kolbovskiyDigitalBody,
  kolbovskiyMainWebsite,
  kolbovskiyPicsWebsite,
  kolbovskiyClubWebsite
];

export const buildJsonLdGraph = (nodes = []) => {
  const normalizedNodes = Array.isArray(nodes) ? nodes : [nodes];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...baseEntityGraph,
      ...normalizedNodes.filter(Boolean)
    ]
  };
};
