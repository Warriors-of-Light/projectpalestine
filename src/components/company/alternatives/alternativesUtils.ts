import { Alternative } from '@/constants';


export const filterAlternativesByCountry = (
    alternatives: Alternative[],
    selectedCountry: string
  ): Alternative[] => {
    return alternatives.filter((alternative) =>
      alternative.countries.map((country) => country.toLowerCase()).includes(selectedCountry.toLowerCase())
    );
  };

//Next step: Add alternative function

