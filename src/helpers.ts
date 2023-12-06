import { ReputationLevels } from "./constants";
//import { Alternative } from './constants';

export  function getCurrentReputationLevel(userPoints : number) {
    for (let i = ReputationLevels.length - 1; i >= 0; i--) {
      if (userPoints >= ReputationLevels[i].points) {
        return ReputationLevels[i];
      }
    }
    return null; // User has not reached any level
  }

export function awardUser(){
    //function to award users with badges, with reputation points, etc...
}


// export const getAlternativesForCountry = (
//   allAlternatives: Alternative[] | undefined,
//   selectedCountry: string
// ): Alternative[] => {
//   if (!allAlternatives || !selectedCountry) {
//     return [];
//   }

//   return allAlternatives.filter((alternative) => alternative.country === selectedCountry);
// };