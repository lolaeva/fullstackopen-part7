import { useState } from "react";
import { useField, useCountry } from "./hooks";

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>;
  }

  const population_length = String(country.population).length;
  const final_population =
    population_length >= 7
      ? country.population / (1000000)
      : country.population / 1000;
  const unit = population_length >= 7 ? "mln" : "thousand";
  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>
        population {final_population} {unit}
      </div>
      <div>capital {country.capital}</div>
      <img src={country.flags.png} height="100" alt={`flag of ${country.name.common}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
