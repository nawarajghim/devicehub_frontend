import { useFetchDevices } from "../hooks/apiHooks";

const Home = () => {
  const { devices, loading, error } = useFetchDevices();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (!devices) {
    return <div>No devices found</div>;
  }
  return (
    <div>
      <h2 className="h2-title">Device Hub</h2>
      <hr className="line"></hr>
      <div className="home-container">
        <div className="home-intro">
          {/*<img className="home-img" src="/src/assets/nokia1.jpg" alt="logo" />*/}
          <div className="home-text">
            <h1>Welcome to Device Hub</h1>
            <p>
              Device hub projektin ideana on kehittää hallinta paneeli joka
              hallitsee IoT-laitteita. Projekti on osana Nokian Garage
              projektia. Projekti on tehty yhteistyössä Nokian ja Metropolian
              opiskelijoiden kanssa.
            </p>
          </div>
          {/*<img className="home-img" src="/src/assets/nokia-logo.png" alt="logo" />*/}
        </div>
        <img
          className="home-img1"
          src="/src/assets/nokia1.jpg"
          alt="logonokia"
        />
        <img
          className="home-img2"
          src="/src/assets/meta.png"
          alt="logometropolia"
        />
        <div className="home-boxes">
          {devices.map((device, index) => {
            const starClass = `star${(index % 4) + 1}`;
            return (
              <div className="box" key={device.name}>
                <div className={`home-iconi ${starClass}`}>
                  <img
                    className="home-star"
                    src="/src/assets/vector.png"
                    alt="star"
                  />
                </div>
                <img
                  className="home-dots"
                  src="/src/assets/dotvertical.png"
                  alt="dots"
                />
                <p>{device.name}</p>
                <p>{device.location}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
