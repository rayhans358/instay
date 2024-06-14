import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faCar, faPaw, faWifi, faTv, faSnowflake, faPumpSoap, faTriangleExclamation, faBanSmoking, faSmoking, faFireExtinguisher, faKey, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons';
import { GiCctvCamera } from "react-icons/gi";
import { BiSolidFridge } from "react-icons/bi";
import { BsPersonWorkspace } from "react-icons/bs";

const Perks = ({ selected, onChange }) => {
  function handleClickPerks(e) {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter(selectedName => selectedName !== name)]);
    }
  }

  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("entrance")} name="entrance" onChange={handleClickPerks} />
        <FontAwesomeIcon icon={faDoorClosed} />
        <span>Private entrance</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("parking")} name="parking" onChange={handleClickPerks} />
        <FontAwesomeIcon icon={faCar} />
        <span>Free parking on premises</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("pets")} name="pets" onChange={handleClickPerks} />
        <FontAwesomeIcon icon={faPaw} />
        <span>Pets allowed</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("wifi")} name="wifi" onChange={handleClickPerks} />
        <FontAwesomeIcon icon={faWifi} />
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("tv")} name="tv" onChange={handleClickPerks} />
        <FontAwesomeIcon icon={faTv} />
        <span>Tv</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("ac")} name="ac" onChange={handleClickPerks} />
        <FontAwesomeIcon icon={faSnowflake} />
        <span>Air conditioning</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("toilet")} name="toilet" onChange={handleClickPerks} />
        <FontAwesomeIcon icon={faPumpSoap} />
        <span>Personal care products</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("exclamation")} name="exclamation" onChange={handleClickPerks} />
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <span>Smoke alarm</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("banSmoking")} name="banSmoking" onChange={handleClickPerks} />
        <FontAwesomeIcon icon={faBanSmoking} />
        <span>No smoking</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("smoking")} name="smoking" onChange={handleClickPerks} />
        <FontAwesomeIcon icon={faSmoking} />
        <span>Free smoking</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("extinguisher")} name="extinguisher" onChange={handleClickPerks} />
        <FontAwesomeIcon icon={faFireExtinguisher} />
        <span>Fire extinguisher</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("camera")} name="camera" onChange={handleClickPerks} />
        <GiCctvCamera />
        <span>Security cameras</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("self")} name="self" onChange={handleClickPerks} />
        <FontAwesomeIcon icon={faKey} />
        <span>Self check-in</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("refrigerator")} name="refrigerator" onChange={handleClickPerks} />
        <BiSolidFridge />
        <span>Refrigerator</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("heating")} name="heating" onChange={handleClickPerks} />
        <FontAwesomeIcon icon={faTemperatureThreeQuarters} />
        <span>Heating</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("workspace")} name="workspace" onChange={handleClickPerks} />
        <BsPersonWorkspace />
        <span>Dedicated workspace</span>
      </label>
    </>
  );
};

Perks.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Perks;