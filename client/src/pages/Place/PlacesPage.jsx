import { Link } from "react-router-dom";
import AccountNavbar from "../../components/Navbar/AccountNavbar/AccountNavbar";
import { useEffect, useState } from "react";
import { getUserPlaces } from "../../services/api/places";
import PlaceImage from "../../components/ImagePhoto/PlaceImage";
import { BsBuildingX } from "react-icons/bs";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getUserPlaces()
      .then(({ data }) => {
        setPlaces(data);
      });
  }, []);

  return (
    <div>
      <AccountNavbar />

      <div className="text-center">
        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={"/account/places/new"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add new places
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 ? (
          places.map((place, index) => (
            <Link to={`/account/places/edit/${place._id}`} key={index} className="bg-gray-100 p-4 rounded-2xl flex gap-4 my-5 cursor-pointer">
              <div className="flex w-32 h-32 rounded-2xl overflow-hidden bg-gray-300 flex-shrink-0">
                <PlaceImage place={place} />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-black">{place.title}</h2>
                <p className="text-sm mt-2 text-justify">{place.description}</p>
              </div>
            </Link>
          ))) : (
          <div className="flex items-center justify-center gap-2">
            <BsBuildingX size={30} />
            <p className="text-3xl">Place not found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesPage;