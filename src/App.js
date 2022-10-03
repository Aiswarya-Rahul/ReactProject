import "./App.css";
import { useEffect } from "react";
import Owner from "./components/Owner/Owner";
import Header from "./components/Layout/Header";
import usePetFilter from "./hook/usePetFilter";

function App() {
  // destructure required variables and function from custom hook
  const { petsWithFemale, petsWithMale, fetchPetsandOwnersHandler } =
    usePetFilter();

  useEffect(() => {
    try {
      fetchPetsandOwnersHandler();
    } catch (error) {
      throw new Error("Could not fetch pet data");
    }
  }, []);

  return (
    <div className="App">
      <Header />
      {petsWithFemale.length > 0 && (
        <Owner gender="Female" pets={petsWithFemale} />
      )}
      {petsWithMale.length > 0 && <Owner gender="Male" pets={petsWithMale} />}
      {petsWithFemale.length === 0 && petsWithMale.length === 0 && (
        <label>No Pets to display!</label>
      )}
    </div>
  );
}

export default App;
