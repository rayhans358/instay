import { useEffect, useState } from "react";
import { BsBuildingX, BsPeople } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { getAllBookings } from "../../services/api/booking";
import AccountNavbar from "../../components/Navbar/AccountNavbar/AccountNavbar";
import PlaceImage from "../../components/ImagePhoto/PlaceImage";
import { Link } from "react-router-dom";
import BookingDates from "../../components/Bookings/Dates/BookingDates";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getAllBookings()
      .then((response) => {
        setBookings(response.data);
      });
  }, []);

  return (
    <div>
      <AccountNavbar />

      <div>
        {bookings?.length > 0 ? (
          bookings?.map((booking, index) => (
            <Link to={`/account/bookings/detail/${booking._id}`} key={index} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden my-4">
              <div className="w-48">
                <PlaceImage place={booking?.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl text-justify">{booking?.place?.title}</h2>
                <div className="border border-black my-2"></div>
                <div className="text-xl">
                  <BookingDates booking={booking} className="mt-4 mb-2" />
                  <div className="items-center flex my-2">
                    <BsPeople className="mr-2" />
                    Guests : {booking?.numberOfGuests}
                  </div>
                  <div className="flex gap-1 items-center my-2">
                    <FontAwesomeIcon icon={faCreditCard} />
                    Total price:${booking?.price}
                  </div>
                </div>
              </div>
            </Link>
          ))) : (
          <div className="flex items-center justify-center gap-2">
            <BsBuildingX size={30} />
            <p className="text-3xl">Booking not found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;