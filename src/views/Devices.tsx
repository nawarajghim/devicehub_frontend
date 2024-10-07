import DeviceClassList from "../components/DeviceClasses";
import DeviceDataList from "../components/DeviceData";
import DeviceList from "../components/DeviceList";

const Devices = () => {
  return (
    <>
    <div>
       <h2 className="h2-title">Device Hub</h2>
       <hr className="line"></hr>
       <h3 className="device-h3">Devices</h3>
    <div className="device-container">
      
      <div className="device-card device-info">
        <h4>Device name</h4>
        <h4 className="card-info">type</h4>
        <h4 className="card-info">location</h4>
        <h4 className="card-info">status</h4>
    </div>

    {/* device will show here */}

    <div className="device-card ">
        <p>Device 1</p>
        <p>x</p>
        <p>metropolia</p>
        <p>active</p>
        <button className="device-button">open</button>
    </div>
    <div className="device-card">
        <p>Device 2</p>
        <p>x</p>
        <p>metropolia</p>
        <p>active</p>
        <button className="device-button">open</button>
    </div>
    <hr className="line"></hr>
      <DeviceList />
      <DeviceClassList />
      <DeviceDataList />
    </div>






    </div>
    </>

  );
};

export default Devices;
