/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import { createBooking } from "../../../services/api/booking";
import { UserContext } from "../../../services/context/UserContext";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  function handleGuests(e) {
    const guests = parseInt(e.target.value);
    if (guests > place.maxGuests) {
      alert(`Number of Guests can't be more than ${place.maxGuests} guests`);
    } else {
      setNumberOfGuests(guests);
    }
  }

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    if (!user) {
      return alert('You must log in first!');
    }

    const bookData = {
      checkIn, checkOut, numberOfGuests, name, phoneNumber,
      place: place._id,
      price: numberOfNights * place.price,
    };

    if (bookData?.name?.length === 0 && bookData?.phoneNumber?.length === 0) {
      return alert(`Name and Phone Number can't be empty`);
    } else if (bookData?.name?.length === 0) {
      return alert(`Name can't be empty`);
    } else if (bookData?.phoneNumber?.length === 0) {
      return alert(`Phone Number can't be empty`);
    } else if (bookData?.numberOfGuests?.length > place.maxGuests?.length) {
      return alert(`Number of Guests can't be more than ${place.maxGuests} guests`);
    }

    const response = await createBooking(bookData);
    const bookingId = response.data._id;
    alert("Create booking successful");
    setRedirect(`/account/bookings/detail/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div>
        <h1 className="text-justify">
          <span className="text-xl font-semibold">${place.price}</span> <span className="text-gray-500">night</span>
        </h1>
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex items-center justify-center space-between">
          <div className="py-4 px-4 items-center justify-center w-full">
            <label className="text-sm"><h4 className="text-justify">CHECK IN</h4></label>
            <input
              type="date" value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-4 px-4 items-center justify-center w-full border-l">
            <label className="text-sm"><h4 className="text-justify">CHECK OUT</h4></label>
            <input
              type="date" value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="py-4 px-4 border-t">
          <label>Total Guests</label> <br />
          <input
            type="number" value={numberOfGuests}
            className="items-center justify-center"
            onChange={handleGuests}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-4 px-4 border-t">
            <label>Full Name :</label> <br />
            <input
              type="text" value={name}
              className="items-center justify-center"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Phone Number :</label> <br />
            <input
              type="tel" value={phoneNumber}
              className="items-center justify-center"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        )}
      </div>
      {numberOfNights > 0 && (
        <div className="pt-4 px-4">
          <h1 className="mb-2">Your details order</h1>
          <div className="justify-between flex">
            <div>
              ${place.price} X {numberOfNights} nights
            </div>
            <div>
              {numberOfNights > 0 && (
                <span>${numberOfNights * place.price}</span>
              )}
            </div>
          </div>
          <div className="justify-between flex">
            <div>
              {numberOfGuests} Guests
            </div>
            <div>
              -
            </div>
          </div>
          <div className="border my-3"></div>
          <div className="justify-between flex font-bold">
            <div>
              Total order
            </div>
            <div>
              ${numberOfNights * place.price}
            </div>
          </div>
        </div>
      )}
      <button onClick={bookThisPlace} className="bg-primary text-white py-3 mt-4 w-full rounded-xl">
        Book this place
      </button>
    </div>
  );
};

export default BookingWidget;