/* eslint-disable react/prop-types */
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiDotsGrid } from '@mdi/js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from './Image';

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-6">
          <div>
            <h2 className="text-3xl text-justify mr-48">Photos of {place.title}</h2>
            <button className="fixed flex gap-2 py-2 px-4 rounded-2xl shadow shadow-black border border-black items-center right-12 top-8 bg-white text-black" onClick={() => setShowAllPhotos(false)}>
              <FontAwesomeIcon icon={faXmark} />
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 && place?.photos?.map((photo, index) => (
            <div key={index} className="flex justify-center items-center">
              <Image src={photo} alt="" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_2fr] rounded-3xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <Image onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover h-80 w-full" src={place.photos[0]} alt={place.title} />
            </div>
          )}
        </div>
        <div className="flex grid-cols-2 gap-2">
          <div className="grid">
            {place.photos?.[1] && (
              <Image onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover h-40 w-72" src={place.photos[1]} alt={place.title} />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <Image onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2 h-40 w-72" src={place.photos[2]} alt={place.title} />
              )}
            </div>
          </div>
          <div className="grid">
            {place.photos?.[3] && (
              <Image onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover h-40 w-72" src={place.photos[3]} alt={place.title} />
            )}
            <div className="overflow-hidden">
              {place.photos?.[4] && (
                <Image onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2 h-40 w-72" src={place.photos[4]} alt={place.title} />
              )}
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setShowAllPhotos(true)} className="absolute flex gap-2 bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 border border-black">
        <Icon path={mdiDotsGrid} size={1} />
        Show all photos
      </button>
    </div>
  );
};

export default PlaceGallery;