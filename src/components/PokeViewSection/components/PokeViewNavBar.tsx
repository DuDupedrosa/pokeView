import React from 'react';

interface PokeViewNavBarProps {
  PokeOptions: Array<{
    name?: string;
    id?: string;
  }>;
  selectedPokemon(pokemonId: string): void;
}

const PokeViewNavBar = ({
  PokeOptions,
  selectedPokemon,
}: PokeViewNavBarProps) => {
  function handleClickSelectedPokemon(pokemonId: string | undefined) {
    if (pokemonId) {
      selectedPokemon(pokemonId);
    }
  }

  return (
    <div>
      <ul className="flex pl-2 md:pl-12 pr-12 md:grid gap-5 max-w-xs md:max-w-max md:max-h-104 max-[769px]:overflow-x-scroll md:overflow-y-scroll pb-4">
        {PokeOptions.map((item, i) => {
          return (
            <li
              onClick={() => handleClickSelectedPokemon(item.id)}
              className="hover:border-solid border-4 border-transparent hover:border-sky-600 transition-all rounded-full  max-w-full p-1 md:p-4 grid place-items-center odd:bg-pink-700 even:bg-gray-900 font-poppins text-gray-50 text-base md:text-xl font-bold cursor-pointer ease-in-out shrink-0"
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PokeViewNavBar;
