import { useState } from "react";
const usePetFilter = () => {
  const ownerAndPetsURL = process.env.REACT_APP_OWNER_PETS_URL;
  const [petsWithFemale, setPetsWithFemale] = useState([]);
  const [petsWithMale, setPetsWithMale] = useState([]);
  const [petType] = useState("cat");
  /**fetches the data from the api and performs the business logic */
  const fetchPetsandOwnersHandler = async () => {
    const response = await fetch(ownerAndPetsURL);
    if (!response.ok) {
      throw new Error("Fetching pet list failed");
    }
    const data = await response.json();
    transformPetAndOwnerData(data);
  };
  /**filters the fetched pet data to femaleOwnedPets and maleOwnedPets array  */
  const transformPetAndOwnerData = (petsAndOwners) => {
    const femaleOwnedPets = [];
    const maleOwnedPets = [];

    if (null != petsAndOwners && petsAndOwners.length > 0) {
      petsAndOwners.forEach(
        (owner) =>
          owner.pets != null &&
          (isFemale(owner) ? femaleOwnedPets : maleOwnedPets).push(
            ...owner.pets
          )
      );
      /** sort pets owned by Female and update the state: petsWithFemale */
      if (femaleOwnedPets.length > 0) {
        setPetsWithFemale(getSortedPetsForThePetType(femaleOwnedPets));
      }

      /**sort pets owned by Male and update the state: petsWithMale*/
      if (maleOwnedPets.length > 0) {
        setPetsWithMale(getSortedPetsForThePetType(maleOwnedPets));
      }
    }
  };
  /**Checks if the gender is female*/
  const isFemale = (owner) => {
    return owner.gender.toLowerCase() === "female";
  };
  const getSortedPetsForThePetType = (ownedPets) => {
    const pets = [];
    ownedPets.forEach((pet) => {
      if (pet.type !== null && pet.type.toLowerCase() === petType) {
        pets.push(pet.name);
      }
    });
    return pets.sort();
  };

  return { petsWithFemale, petsWithMale, fetchPetsandOwnersHandler };
};
export default usePetFilter;
