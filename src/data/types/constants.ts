export type Incident = {
  id: string;
  title: string;
  description: string;
  date: string;
  rating: string;
  websites: Array<string>;
};

export type Company = {
  id: string;
  logo: string;
  name: string;
  description: string;
  status: 1 | 2 | 3;
  website?:string;
  tags?: Array<string>;
  incidents: Array<Incident>;
};

// export type User = UserCredential & {
//   BoycottDays?: number;
// };

// export const ReputationLevels = [
//   {
//     name: "Newbie",
//     points: 0,
//     badge: "Newbie Badge",
//   },
//   {
//     name: "Contributor",
//     points: 100,
//     badge: "Contributor Badge",
//   },
//   {
//     name: "Expert",
//     points: 500,
//     badge: "Expert Badge",
//   },
//   {
//     name: "Master",
//     points: 1000,
//     badge: "Master Badge",
//   },
// ];

// export const Tags = {
//   Technology: "Technology",
//   Automotive: "Automotive",
//   Pharmaceuticals: "Pharmaceuticals",
//   Cosmetics: "Cosmetics",
//   FoodAndBeverages: "Food and Beverages",
//   Entertainment: "Entertainment",
//   FashionAndApparel: "Fashion and Apparel",
//   FinanceAndBanking: "Finance and Banking",
//   Retail: "Retail",
//   Telecommunications: "Telecommunications",
//   TravelAndHospitality: "Travel and Hospitality",
//   SportsAndFitness: "Sports and Fitness",
//   Other: "Other",
// };
