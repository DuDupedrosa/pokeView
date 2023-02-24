import axios from 'axios';
import React from 'react';
import PokeViewCard from './components/PokeViewCard';
import PokeViewNavBar from './components/PokeViewNavBar';
import SearchPokemon from './components/SearchPokemon';
import { MdCatchingPokemon } from 'react-icons/md';
import PokeBollImage from '../../assets/pokeball.png';
import Image from 'next/image';
import {
  alertDefaultToast,
  errorDefaultToast,
  errorDefaultToastMessage,
} from '@/helper/Toast/DefaultToasts';

const PokeViewSection = () => {
  const [pokensOptions, setPokensOptions] = React.useState<Array<object>>([]);
  const [pokemonCardImage, setPokemonCardImage] = React.useState<string>('');
  const [searchPokemonLoading, setSearchPokemonLoading] =
    React.useState<boolean>(false);
  const [cleanInputSearchPokemon, setCleanInputSearchPokemon] =
    React.useState(false);

  async function getAllPokens() {
    setSearchPokemonLoading(true);

    await axios
      .get(`https://api.pokemontcg.io/v2/cards`, {
        headers: {
          'X-Api-Key': 'b40eeef8-0303-48f0-acb2-0de88e385e69',
        },
      })
      .then((response) => {
        setPokensOptions(response.data.data);
        setPokemonCardImage(response.data.data[0].images.large);
      })
      .catch((err) => {
        errorDefaultToast(errorDefaultToastMessage);
      });
    setSearchPokemonLoading(false);
  }

  async function handleSelectedPokemon(pokemonId: string | null) {
    setSearchPokemonLoading(true);
    setCleanInputSearchPokemon(false);

    await axios
      .get(`https://api.pokemontcg.io/v2/cards/${pokemonId}`, {
        headers: {
          'X-Api-Key': 'b40eeef8-0303-48f0-acb2-0de88e385e69',
        },
      })
      .then((response) => {
        setCleanInputSearchPokemon(true);
        setPokemonCardImage(response.data.data.images.large);
      })
      .catch((err) => {
        errorDefaultToast(errorDefaultToastMessage);
      });
    setSearchPokemonLoading(false);
  }

  async function searchPokemon(pokemonName: string) {
    setSearchPokemonLoading(true);
    setCleanInputSearchPokemon(false);

    await axios
      .get(`https://api.pokemontcg.io/v2/cards?q=!name:${pokemonName}`, {
        headers: {
          'X-Api-Key': 'b40eeef8-0303-48f0-acb2-0de88e385e69',
        },
      })
      .then((response) => {
        setCleanInputSearchPokemon(true);

        if (response.data.data.length) {
          setPokemonCardImage(response.data.data[0].images.large);
        } else {
          alertDefaultToast(
            'Ops! Parece que o pokemon que você buscou, não existe!'
          );
        }
      })
      .catch((err) => {
        errorDefaultToast(errorDefaultToastMessage);
      });
    setSearchPokemonLoading(false);
  }

  React.useEffect(() => {
    getAllPokens();
  }, []);

  return (
    <div className="grid place-items-center mt-24">
      <div>
        <SearchPokemon
          cleanInputSearchPokemon={cleanInputSearchPokemon}
          searchLoading={searchPokemonLoading}
          searchPokemon={(pokemonName) => searchPokemon(pokemonName)}
        />
      </div>
      {!searchPokemonLoading && (
        <div className="flex flex-col md:flex-row gap-5 md:gap-12 pb-5 items-center mt-5 md:mt-16">
          <div>
            <PokeViewNavBar
              selectedPokemon={(pokemonId) => handleSelectedPokemon(pokemonId)}
              PokeOptions={pokensOptions}
            />
          </div>
          {pokemonCardImage && (
            <div>
              <PokeViewCard CardImage={pokemonCardImage} />
            </div>
          )}
        </div>
      )}
      {searchPokemonLoading && (
        <div className="grid place-items-center mt-8">
          <Image
            src={PokeBollImage}
            alt="Pokebola"
            className="animate-spin"
            width="132"
            height="132"
          />
          <p className="font-poppins text-lg md:text-xl text-white font-semibold mt-2">
            Estamos buscando seu pokemon!😉
          </p>
        </div>
      )}
    </div>
  );
};

export default PokeViewSection;
