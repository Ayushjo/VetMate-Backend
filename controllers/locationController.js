import axios from "axios"


export const getNearbyVets = async(req,res)=>{
    const {lat,lng} = req.body

    if(!lat || !lng){
        res.status(404).json({message:"Not latitude and longitude given."})
    }else{
        try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
              {
                params: {
                  location: `${lat},${lng}`,
                  radius: 10000,
                  keyword: "veterinary clinic",
                  type: "veterinary_care",
                  key: process.env.GOOGLE_MAPS_API_KEY,
                },
              }
            );
            console.log(response.data);
            

            const results  = response.data.results.map((place)=>({
                name:place.name,
                address:place.vicinity,
                rating:place.rating,
                open_now:place.opening_hours?.open_now ?? "Unknown",
                location:place.geometry.location
            }))

            res.status(200).json({results,message:"Nearby vets fetched"})
            
        } catch (error) {
            res.status(400).json({message:error.message})
            
        }
    }
}