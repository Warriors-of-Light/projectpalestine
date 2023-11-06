
import { UserCredential } from "firebase/auth";

export type Incident = {
  incidentId: string;
  title: string;
  date: string;
  description: string;
  rating: string;
  websites: Array<string>;
};

export type Company = {
  logo: string;
  name: string;
  description: string;
  companyId: string;
  tags?: Array<string>;
  rating: 1 | 2 | 3;
  incidents: Array<Incident>;
};

export type User = UserCredential & {
  BoycottDays?: number;
};

export const ReputationLevels = [
  {
    name: "Newbie",
    points: 0,
    badge: "Newbie Badge",
  },
  {
    name: "Contributor",
    points: 100,
    badge: "Contributor Badge",
  },
  {
    name: "Expert",
    points: 500,
    badge: "Expert Badge",
  },
  {
    name: "Master",
    points: 1000,
    badge: "Master Badge",
  },
];

export const Tags = {
  Technology: "Technology",
  Automotive: "Automotive",
  Pharmaceuticals: "Pharmaceuticals",
  Cosmetics: "Cosmetics",
  FoodAndBeverages: "Food and Beverages",
  Entertainment: "Entertainment",
  FashionAndApparel: "Fashion and Apparel",
  FinanceAndBanking: "Finance and Banking",
  Retail: "Retail",
  Telecommunications: "Telecommunications",
  TravelAndHospitality: "Travel and Hospitality",
  SportsAndFitness: "Sports and Fitness",
  Other: "Other",
};
