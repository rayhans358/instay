/* eslint-disable react/prop-types */
import { BsGeoAlt } from "react-icons/bs";

const AddressLink = ({ children, className = null }) => {
  if (!className) {
    className = "my-3 block";
  }
  className += " flex gap-1 my-3 block font-semibold underline text-justify items-center";

  return (
    <a href={`https://maps.google.com/?q=${children}`} target="_blank" className={className}>
      <BsGeoAlt />
      {children}
    </a>
  );
};

export default AddressLink;