export type Reference = {
  refrenceId: string;
  title: string;
  link: string;
};

export type Claim = {
  claimId: string;
  claimContent: string;
  claimRefrences: Array<Reference>;
};

export interface CompanyProfile {
  logo: string;
  companyId: string;
  score: number;
  claims: Array<Claim>;
}
