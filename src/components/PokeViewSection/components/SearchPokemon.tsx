import React from 'react';
import { FcSearch } from 'react-icons/fc';
import { GoAlert } from 'react-icons/go';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface SearchPokemonProps {
  searchPokemon(pokemonName: string): void;
  searchLoading: boolean;
  cleanInputSearchPokemon: boolean;
}

const SearchPokemon = ({
  searchPokemon,
  searchLoading,
  cleanInputSearchPokemon,
}: SearchPokemonProps) => {
  const [pokemonName, setPokemonName] = React.useState<string>('');
  const [requiredMessage, setRequiredMessage] = React.useState<boolean>(false);

  function handleSubmitSearchPokemon(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (pokemonName) {
      searchPokemon(pokemonName);
    } else {
      setRequiredMessage(true);
    }
  }

  React.useEffect(() => {
    if (cleanInputSearchPokemon) {
      setPokemonName('');
    }
  }, [cleanInputSearchPokemon]);

  return (
    <div className="h-32">
      <h1 className="font-poppins text-2xl text-white font-semibold mb-5 text-center">
        Busque seu Pokemon
      </h1>
      <form
        className="flex gap-2"
        onSubmit={(e) => handleSubmitSearchPokemon(e)}
      >
        <input
          onClick={() => {
            setRequiredMessage(false);
          }}
          onChange={(e) => setPokemonName(e.target.value)}
          value={pokemonName}
          type="text"
          placeholder="Meu pokemon"
          className="font-roboto text-base bg-gray-900 text-white p-2 border-solid rounded border-2 border-transparent hover:border-white transition-all"
          disabled={searchLoading}
        />
        <button
          disabled={searchLoading}
          className={`cursor-pointer rounded bg-gray-900 grid place-items-center w-20 border-2 border-solid border-transparent hover:border-white transition-all ${
            searchLoading && 'cursor-wait'
          }`}
        >
          {searchLoading ? (
            <AiOutlineLoading3Quarters
              size="24px"
              className="animate-spin"
              color="#ffffff"
            />
          ) : (
            <FcSearch size="24px" />
          )}
        </button>
      </form>
      {requiredMessage && (
        <span className="transition-all animate-alertError mt-2 text-red-500 font-roboto text-sm font-normal -tracking-tighter flex items-center gap-2">
          <GoAlert color="red" size="16px" />
          Campo obrigatório!
        </span>
      )}
    </div>
  );
};

export default SearchPokemon;
