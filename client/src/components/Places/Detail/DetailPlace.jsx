import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsPeople } from "react-icons/bs";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { getPlaceById } from "../../../services/api/places";
import BookingWidget from "../../Bookings/Widget/BookingWidget";
import PlaceGallery from "../../ImagePhoto/PlaceGallery";
import AddressLink from "../../Utils/AddressLink";

const DetailPlace = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) return;

    getPlaceById(id)
      .then(response => {
        setPlace(response.data);
      });
  }, [id]);

  if (!place) return `Detail place not found`;

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl text-justify">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="my-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="text-justify text-large">
          <div className="leading-6">
            <h2 className="font-semibold text-2xl mb-1">Description</h2>
            <p>{place.description}</p>
          </div>
          <div className="my-4 leading-8">
            <div className="items-center flex">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              Check-in : {place.checkIn}
            </div>
            <div className="items-center flex">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              Check-out : {place.checkOut}
            </div>
            <div className="items-center flex">
              <BsPeople className="mr-2" />
              Maximum guests : {place.maxGuests}
            </div>
          </div>
          <div className="-mx-8 px-8 py-8 leading-7">
            <div className="text-justify my-4">
              <h2 className="font-semibold text-2xl">Extra Info</h2>
              <p>{place.extraInfo}</p>
            </div>
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>

    </div>
  );
};

export default DetailPlace;