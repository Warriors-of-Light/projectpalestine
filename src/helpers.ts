import { ReputationLevels } from "./constants";

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