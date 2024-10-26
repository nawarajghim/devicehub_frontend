const Home = () => {
  return (
    <div>
      <h2 className="h2-title">Device Hub</h2>
      <hr className="line"></hr>

      {/* Your Home content here */}

      <div className="home-container">
      <div className="home-intro">
        <h1>Welcome to Device Hub</h1>
        <p>
          Here you can find all the devices that are connected to your network.
          You can easily manage them and keep track of their status.
        </p>
      </div>
      <div className="home-boxes">
        <div className="box">Device 1</div>
        <div className="box">Device 2</div>
        <div className="box">Device 3</div>
        <div className="box">Device 4</div>
        <div className="box">Device 5</div>
        <div className="box">Device 6</div>
      </div>
    </div>






    </div>
  );
};

export default Home;
