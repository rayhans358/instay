import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPlaces } from "../../services/api/places";
import Image from "../../components/ImagePhoto/Image";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getAllPlaces()
      .then((response) => {
        setPlaces(response.data);
      });
  }, []);

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map((place, index) =>
        <Link to={`/place/detail/${place._id}`} key={index}>
          <div className="bg-gray-500 rounded-2xl flex">
            {place.photos?.[0] && (
              <Image className="rounded-2xl object-cover aspect-square" src={place.photos[0]} alt={place.title} />
            )}
          </div>
          <h2 className="mt-2 font-bold truncate text-justify">{place.address}</h2>
          <h3 className="mt-1 text-sm truncate text-gray-500 text-justify">{place.title}</h3>
          <h3 className="mt-1 text-sm truncate text-gray-500 text-justify">{place.maxGuests} guests maximum</h3>
          <div className="mt-1 text-justify text-gray-500">
            <span className="font-bold text-black">${place.price}</span> night
          </div>
        </Link>
      )}
    </div>
  );
};

export default Home;