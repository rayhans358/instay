import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../../services/api/booking";
import AddressLink from "../../Utils/AddressLink";
import PlaceGallery from "../../ImagePhoto/PlaceGallery";
import BookingDates from "../Dates/BookingDates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";

const DetailBooking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      getBookingById(id)
        .then(response => {
          setBooking(response.data);
        });
    }
  }, [id]);

  if (!booking) return `Detail booking not found`;

  return (
    <div className="my-8">
      <h1 className="text-3xl text-justify">{booking?.place?.title}</h1>
      <AddressLink className="my-2 block">{booking?.place?.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-justify mb-4">Your booking information</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary text-white p-4 rounded-2xl">
          <div className="flex gap-1 items-center">
            <FontAwesomeIcon icon={faCreditCard} />
            Total price:
          </div>
          <div className="text-2xl">${booking?.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking?.place} />
    </div>
  );
};

export default DetailBooking;