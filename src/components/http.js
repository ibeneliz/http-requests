export async function fetchAvailablePlaces(){
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();
    if(!response.ok){
        throw new Error("Failed to fetch places");
    }
    return resData.places;
}

export async function updateUserPlaces(){
    await fetch('http://localhost:3000/user-places'), {
        method: 'PUT',
        body: JSON.stringify({ places }),
        headers: {
            'Content-Type' : 'application/json'
        }
    };
    const resData = await response.JSON();
    if(!response.ok){
        throw new Error("Failed to update places");
    }
    return resData.message;
}