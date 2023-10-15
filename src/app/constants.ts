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
