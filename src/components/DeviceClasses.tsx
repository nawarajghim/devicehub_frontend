import React, { useState } from "react";
import { useFetchDeviceClasses } from "../hooks/apiHooks";

const DeviceClassList: React.FC = () => {
  const { deviceClasses, loading, error } = useFetchDeviceClasses();
  const [selectedDeviceClass, setSelectedDeviceClass] = useState<string | null>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleDeviceClassClick = (deviceClassName: string) => {
    if (selectedDeviceClass === deviceClassName) {
      setSelectedDeviceClass(null);
    } else {
      setSelectedDeviceClass(deviceClassName);
    }
  };

  // Find the selected device class details
  const selectedDeviceClassDetails = deviceClasses.find(
    (deviceClass) => deviceClass.name === selectedDeviceClass
  );

  return (
    <div>
      {/* If no device class is selected, show the list of all device classes */}
      <h2>Device Classes</h2>
      {!selectedDeviceClass ? (
        <>
          <ul>
            {deviceClasses.map((deviceClass) => (
              <li
                key={deviceClass.name}
                onClick={() => handleDeviceClassClick(deviceClass.name)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedDeviceClass === deviceClass.name ? "bold" : "normal",
                }}
              >
                {deviceClass.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          {/* If a device class is selected, show its types */}
          <div>
            <h4>{selectedDeviceClass}</h4>
            {selectedDeviceClassDetails && (
              <ul>
                {selectedDeviceClassDetails.type.map((deviceType, index) => (
                  <li key={index}>{deviceType}</li>
                ))}
              </ul>
            )}
            <button onClick={() => setSelectedDeviceClass(null)} style={{ cursor: "pointer" }}>
              Show all classes
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeviceClassList;
