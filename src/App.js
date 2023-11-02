import Routes from "./Routes";
import "./App.css";
import Text from "./components/Text";
import EnhancedTable from "./components/Table";
import Dialog from "./components/Dialog";
import React from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

const URL_API_POKEMONS = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=1";
 export const URL_API_TYPE_POKEMONS = "https://pokeapi.co/api/v2/type/";

function App() {
  const [tableRows, setTableRows] = React.useState([]);
  const [pokemonTypesOptions, setPokemonTypesOptions] = React.useState([]);

   const fetchPokemons = async () => {
     const resAllPokemons = await axios.get(URL_API_POKEMONS);
     const resTypePokemons = await axios.get(URL_API_TYPE_POKEMONS);

     const pokemonsPromises = resAllPokemons.data.results.map(
       async (pokemon) => {
         const { url } = pokemon;

         const { weight, height, id, name, types, sprites } = await (await axios.get(url)).data;

         return {
           id,
           name,
           types,
           weight,
           height,
           sprites,
         };
       }
     );

     const pokemons = await Promise.all(pokemonsPromises);


     setTableRows(pokemons);
     setPokemonTypesOptions(resTypePokemons.data.results);
   };

   React.useEffect(() => {
     fetchPokemons();
   }, []);


  const handleUpdatePokemonRow = ({ id_pokemon, fields }) => {
    const { my_name, my_description, my_types, my_teammates, my_sprite } =
      fields;
  };

  return (
    <div className="App">
      <Routes
        tableRows={tableRows}
        pokemonTypesOptions={pokemonTypesOptions}
        handleUpdatePokemonRow={handleUpdatePokemonRow}
      />
      <Outlet />
    </div>
  );
}

export default App;
