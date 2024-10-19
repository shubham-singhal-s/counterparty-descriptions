let counterparties = [
  {
    name: "Global Energy Corporation",
    shortname: "GLBNRGCO",
    description:
      "A multinational energy company with extensive operations in oil, gas, and renewable energy sectors. Monitored for geopolitical risks and commodity price volatility.",
  },
  {
    name: "Tech Innovators Inc.",
    shortname: "TECHINNO",
    description:
      "A fast-growing technology firm specializing in cloud computing and AI solutions. Assessed for high R&D expenditures and dependency on innovation cycles.",
  },
  {
    name: "National Retail Group",
    shortname: "NATRGRP",
    description:
      "A leading retail conglomerate with nationwide outlets. Evaluated for consumer spending trends and inventory management risks.",
  },
  {
    name: "Pacific Infrastructure LLC",
    shortname: "PACIFINF",
    description:
      "A construction and infrastructure company focusing on large-scale projects. Monitored for long project timelines and public sector contracts.",
  },
  {
    name: "Continental Bank Group",
    shortname: "CONTBNKG",
    description:
      "A diversified financial services group offering commercial and investment banking. Reviewed for credit exposure and regulatory compliance in multiple jurisdictions.",
  },
  {
    name: "Global Pharma Holdings",
    shortname: "GLBPHARM",
    description:
      "A pharmaceutical company with a strong international presence. Assessed for product pipeline risks and regulatory approvals in various markets.",
  },
  {
    name: "Oceanic Shipping Co.",
    shortname: "OCEASHIP",
    description:
      "A major shipping company with global trade routes. Monitored for fuel price fluctuations and international trade regulations.",
  },
  {
    name: "Metro Property Developers",
    shortname: "METRODEV",
    description:
      "A real estate development firm focused on commercial properties. Evaluated for market demand fluctuations and real estate financing risks.",
  },
  {
    name: "Eastern Metals Inc.",
    shortname: "EASTMETL",
    description:
      "A mining and metals company with operations across multiple continents. Assessed for commodity price risks and environmental regulations.",
  },
  {
    name: "Global Telecom Solutions",
    shortname: "GLBTELCO",
    description:
      "A telecommunications provider with a strong presence in emerging markets. Reviewed for currency exchange risks and regulatory challenges.",
  },
  {
    name: "Atlantic Aerospace Ltd.",
    shortname: "ATLAERO",
    description: null,
  },
  {
    name: "Summit Insurance Corp.",
    shortname: "SUMINSCO",
    description: null,
  },
  {
    name: "Urban Transit Systems",
    shortname: "URBTRANS",
    description: null,
  },
  {
    name: "NorthStar Energy Partners",
    shortname: "NORTHENP",
    description: null,
  },
  {
    name: "Liberty Media Holdings",
    shortname: "LIBMEDIA",
    description: null,
  },
];

export const list = () => {
  return counterparties;
};

export const getCounterparty = async (shortname: string) => {
  return counterparties.find((c) => c.shortname === shortname);
};

export const update = (cpty: any) => {
  counterparties = counterparties.map((c) =>
    c.shortname === cpty.shortname ? cpty : c
  );
};
