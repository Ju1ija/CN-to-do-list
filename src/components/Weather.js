import { useEffect, useState } from "react";

function Weather() {
  const [temperature, setTemperature] = useState("");
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    locationHandler();
  }, []);

  const locationHandler = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(position => handler(position.coords.latitude, position.coords.longitude));
  }

  const handler = async (lat, lon) => {
    try {
      const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`);
      const data = await response.json();
      setTemperature(data.main.temp.toFixed(1));
      setWeather(data.weather[0].main);
      setLocation(data.name);
      setLoading(false);
    } catch (err) {
      setErrorState({ error: true, message: err.message });
    }
  }

  return (
    <div className="weather-component">
      {errorState.error ? (
        <h2>{errorState.message}</h2>
      ) : (
        <>
          <h2>current weather:</h2>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <>
              <h3>{temperature} &#176;C {weather}</h3>
              <p><i class="material-icons">place</i> {location}</p>
              <button onClick={locationHandler}>refresh</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;