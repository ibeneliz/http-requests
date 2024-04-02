import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import { fetchAvailablePlaces } from "../components/http.js";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  
  useEffect(() => {
    async function fetchPlaces(){
      setIsFetching(true);
      try{
        const places = await fetchAvailablePlaces();
        console.log("plAaces");
        console.log(places);
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places,position.coords.latitude,position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
        });
      }catch(error){
        setError({message : error.message || "Could not fetch places, please try again later."});
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  if(error){
    <Error title="An error occured!" message={error.message} />
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
