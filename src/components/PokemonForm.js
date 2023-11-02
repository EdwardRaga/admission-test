import React, { useState, useEffect } from "react";
import { URL_API_TYPE_POKEMONS } from "../App";
import axios from "axios";
import Select from "./Select";
import Text from "./Text";
const URL_API_TO_GET_TEAMMATES_BY_TYPE = "https://pokeapi.co/api/v2/type";
function PokemonForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [types, setType] = useState([]);
  const [pokemonTypes, setPokemonTypes] = React.useState([]);
  const [allTeammates, setAllTeammates] = React.useState([]);
  const [teammates, setTeammates] = React.useState([]);
  const [isLoadingTeammates, setIsLoadingTeammates] = React.useState(true);

  useEffect(() => {
    fetch(`${URL_API_TYPE_POKEMONS}`)
      .then((response) => response.json(), null)
      .then((data) => setPokemonTypes(data.results), null);
  }, []);

  useEffect(() => {
    const fetchTeammates = async () => {
      if (types.length > 0) {
        setIsLoadingTeammates(true);
        const fetchPromises = types.map((type) =>
          axios
            .get(`${URL_API_TO_GET_TEAMMATES_BY_TYPE}/${type}`)
            .then((response) => response.data)
        );

        const results = await Promise.all(fetchPromises);
        const allTeammates = [].concat(
          ...results.map((result) => result.pokemon)
        );
        setAllTeammates(allTeammates);
        setIsLoadingTeammates(false);
      }
    };

    fetchTeammates();
  }, [types]);

  const onlyNameTeam = allTeammates.map((element) => element.pokemon);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Text
        onChange={setName}
        helperText={"Ingresar el nombre del Pokemon"}
        rows={0}
        multiline={false}
        label={"Nombre del pokemon:"}
      />
      <Text
        onChange={setDescription}
        helperText={"Ingresar descripción"}
        rows={5}
        multiline={true}
        label={"Descripción del cambio:"}
      />

      <Select onChange={setType} options={pokemonTypes} />

      {isLoadingTeammates ? (
        <p>Cargando compañeros de equipo...</p>
      ) : (
        <Select options={onlyNameTeam} onChange={setTeammates}/>
      )}

      <button type="submit">Update</button>
    </form>
  );
}

export default PokemonForm;