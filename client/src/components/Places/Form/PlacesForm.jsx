import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { BsPeople } from 'react-icons/bs';
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import PhotosUploader from "../../ImagePhoto/PhotosUploader";
import Perks from "./Perks";
import AccountNavbar from "../../Navbar/AccountNavbar/AccountNavbar";
import { createPlace, getPlaceById, updatePlaces } from "../../../services/api/places";

const PlacesForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (!id) return;

    getPlaceById(id)
      .then(response => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      });
  }, [id]);


  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4 text-left">{text}</h2>
    );
  }

  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm text-left">{text}</p>
    );
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(e) {
    e.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price
    };

    if (id) {
      // Update Place
      await updatePlaces(id, placeData);
      setRedirect(true);
    } else {
      // New Place
      await createPlace(placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />
  }

  return (
    <div>
      <AccountNavbar />

      <form onSubmit={savePlace}>
        {preInput("Title", "Title for your place, should be short and catchy as in advertisement")}
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title, for example: my lovely apt" />
        {preInput("Address", "Address to this place")}
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />

        {preInput("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "Description of the place")}
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        {preInput("Perks", "Select all the perks of your place")}
        <div className="grid mt-4 gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput("Extra info", "house rules, etc")}
        <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />

        {preInput("Check in&out times", "Add check in and out times, remember to have some time window for cleaning the room beet guests")}

        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1 items-center">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              Check in time
            </h3>
            <input type="text" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 items-center">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              Check out time
            </h3>
            <input type="text" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>
          <div>
            <div className="flex justify-center">
              <h3 className="mt-2 -mb-1 flex items-center">
                <BsPeople className="mr-2" />
                Max number of guests
              </h3>
            </div>
            <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 items-center">
              <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
              Price per night
            </h3>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>

        <button className="bg-primary text-white py-2 my-4 w-full rounded-full">Save</button>
      </form>
    </div>
  );
};

export default PlacesForm;