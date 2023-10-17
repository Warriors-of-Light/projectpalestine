export type Reference = {
  refrenceId: string;
  title: string;
  link: string;
};

export type Claim = {
  claimId: string;
  title: string;
  description: string;
  rating: string;
  refrences: Array<Reference>;
};

export interface CompanyProfile {
  logo: string;
  companyId: string;
  score: number;
  claims: Array<Claim>;
}

export type User = {
  username: string;
  userId: string;
  userRating: string;
  userSubmissions: Array<string>; //array of claimIDs that we can retrieve from the database
};
