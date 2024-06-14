/* eslint-disable react/prop-types */
import Image from "./Image";

const PlaceImage = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return '';
  }

  if (!className) {
    className = 'object-cover aspect-square';
  }

  return (
    <Image className={className} src={place.photos[index]} alt={place.title} />
  );
};

export default PlaceImage;