export type Reference = {
  refrenceId: string;
  title: string;
  link: string;
};

export type Claim = {
  claimId: string;
  title: string;
  date: string;
  description: string;
  rating: string;
  refrences: Array<Reference>;
};

export type Company = {
  logo: string;
  name: string;
  description: string;
  companyId: string;
  tags?: Array<string>;
  rating: 1 | 2 | 3;
  claims: Array<Claim>;
};

export type User = {
  username: string;
  userId: string;
  userRating: string;
  userSubmissions: Array<string>; //array of claimIDs that we can retrieve from the database
};

export const Tags = {
  Technology: "Technology",
  Automotive: "Automotive",
  Pharmaceuticals: "Pharmaceuticals",
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

interface IOfflineInterface {
  companies: Array<Company>;
}

// used for testing while I don't have internet
export const offlineData: IOfflineInterface = {
  companies: [
    {
      claims: [
        {
          claimId: "1234",
          date: "10th oct 2024",
          description: "they sent food to israel",
          rating: "1",
          refrences: [{ title: "sad", link: "lol", refrenceId: "1234" }],
          title: "iiiiiii",
        },
        {
          claimId: "1234",
          date: "12th oct 2024",
          description: "they sent food to israel sifwjewifmwim",
          rating: "1",
          refrences: [{ title: "sad", link: "lol", refrenceId: "1234" }],
          title: "they sent food to israel sifwjewifmwimadasdadsadqasdadad",
        },
        {
          claimId: "1234",
          date: "16th oct 2024",
          description: "they sent food to israel adsaodjkoajd ",
          rating: "1",
          refrences: [{ title: "sad", link: "lol", refrenceId: "1234" }],
          title: "they look at us like we are less",
        },
      ],
      companyId: "123",
      description: "Fast Food Company",
      logo: require("./assets/macdonalds.png"),
      name: "macdonalds",
      rating: 1,
      tags: ["fast food"],
    },
    {
      claims: [
        {
          claimId: "1234",
          date: "10th oct 2024",
          description: "they sent food to israel",
          rating: "1",
          refrences: [{ title: "sad", link: "lol", refrenceId: "1234" }],
          title: "iiiiiii",
        },
        {
          claimId: "1234",
          date: "12th oct 2024",
          description: "they sent food to israel sifwjewifmwim",
          rating: "1",
          refrences: [{ title: "sad", link: "lol", refrenceId: "1234" }],
          title: "they sent food to israel sifwjewifmwimadasdadsadqasdadad",
        },
        {
          claimId: "1234",
          date: "16th oct 2024",
          description: "they sent food to israel adsaodjkoajd ",
          rating: "1",
          refrences: [{ title: "sad", link: "lol", refrenceId: "1234" }],
          title: "they look at us like we are less",
        },
      ],
      companyId: "123",
      description: "Beverages Company",
      logo: require("./assets/macdonalds.png"),
      name: "CocaCola",
      rating: 1,
      tags: ["fast food"],
    },
  ],
};
