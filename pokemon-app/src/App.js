import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";

function App() {
  // States
  const [pokemonList, setPokemonList] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  // Effects
  useEffect(() => {
    setLoading(true)
    let cancel
    const axiosOptions = {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }
    axios.get(currentPageUrl, axiosOptions).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      const tempList = res.data.results
      setPokemonList(tempList.map(temp => temp.name))
    })
    // TODO later
    // return () => cancel.cancel()
  }, [currentPageUrl])

  // Pagination Handler
  function goToNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."
  return (
    <>
      <PokemonList pokemonList={pokemonList}/>
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null} 
        goToPrevPage={prevPageUrl ? goToPrevPage : null} />
    </>
  )

}
export default App;
