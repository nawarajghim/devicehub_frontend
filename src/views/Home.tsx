const Home = () => {
  return (
    <div>
      <h2 className="h2-title">Device Hub</h2>
      <hr className="line"></hr>

      {/* Your Home content here */}

      <div className="home-container">
      <div className="home-intro">
      {/*<img className="home-img" src="/src/assets/nokia1.jpg" alt="logo" />*/}
        <div className="home-text">
          
        <h1>Welcome to Device Hub</h1>
        <p>
          Here you can find all the devices that are connected to your network.
          You can easily manage them and keep track of their status.
        </p>
        </div>
        {/*<img className="home-img" src="/src/assets/nokia-logo.png" alt="logo" />*/}
        
      </div>
      <img className="home-img" src="/src/assets/nokia1.jpg" alt="logo" />
      <div className="home-boxes">
        <div className="box">
          <div className="home-iconi star1">
            <img className="home-star " src="/src/assets/vector.png" alt="star" />
          </div>
          <img className="home-dots" src="/src/assets/dotvertical.png" alt="star" />
          <p>Device 1</p>
          <p>location</p>
          </div>
        <div className="box">
        <div className="home-iconi star2">
            <img className="home-star " src="/src/assets/vector.png" alt="star" />
          </div>
          <img className="home-dots" src="/src/assets/dotvertical.png" alt="star" />
          <p>Device 2</p>
          <p>location</p>
        </div>
        <div className="box">
        <div className="home-iconi star3">
            <img className="home-star " src="/src/assets/vector.png" alt="star" />
          </div>
          <img className="home-dots" src="/src/assets/dotvertical.png" alt="star" />
          <p>Device 3</p>
          <p>location</p>
        </div>
        <div className="box">
        <div className="home-iconi star4">
            <img className="home-star " src="/src/assets/vector.png" alt="star" />
          </div>
          <img className="home-dots" src="/src/assets/dotvertical.png" alt="star" />
          <p>Device 4</p>
          <p>location</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
