import React from "react";
import { useFetchRuuviTagData } from "../hooks/apiHooks";

const RuuviTagData: React.FC = () => {
  const { ruuviTagData, loading, error } = useFetchRuuviTagData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Gather data for each unique mac and display it
  const macs = new Set(ruuviTagData.map((ruuvi) => ruuvi.data.mac));
  const macData = Array.from(macs).map((mac) => {
    const data = ruuviTagData.filter((ruuvi) => ruuvi.data.mac === mac);
    return {
      mac: mac,
      data: data,
    };
  });

  return (
    <div>
      <h2>RuuviTag Data</h2>
      <ul>
        {macData.map((macItem) => (
          <li key={macItem.mac}>
            <h3>{macItem.mac}</h3>
            <ul>
              {macItem.data.map((data, index) => (
                <li key={`${macItem.mac}-${index}`}>
                  {" "}
                  {/* Ensure unique key by combining mac and index */}
                  <div>
                    Data:
                    <ul>
                      {Object.entries(data.data).map(([key, value]) => (
                        <li key={`${macItem.mac}-${key}-${index}`}>
                          {" "}
                          {/* Ensure unique key with mac, key, and index */}
                          {key}: {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RuuviTagData;
