import DeviceClassList from "../components/DeviceClasses";
import DeviceDataList from "../components/DeviceData";
import DeviceList from "../components/DeviceList";

const Devices = () => {
  return (
    <div>
      <h2>Device Hub</h2>
      <p>this is devices page</p>
      <DeviceList />
      <DeviceClassList />
      <DeviceDataList />
    </div>
  );
};

export default Devices;
