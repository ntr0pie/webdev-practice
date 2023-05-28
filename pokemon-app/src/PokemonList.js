import React from 'react'

export default function PokemonList({pokemonList}) {
  return (
    <div>
        {
            pokemonList.map(temp => (
                <div key={temp}>{temp}</div>
                ))
        }
    </div>
  )
}
