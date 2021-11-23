import { useEffect, useState } from "react";

function Activity() {
  const [activity, setActivity] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    handler();
  }, []);

  const handler = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://www.boredapi.com/api/activity/");
      const data = await response.json();
      setActivity(data.activity);
      setLoading(false);
    } catch (err) {
      setErrorState({ error: true, message: err.message });
    }
  }

  return (
    <div className="activity-component">
      {errorState.error ? (
        <h2>{errorState.message}</h2>
      ) : (
        <>
          <h2>suggestions:</h2>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <>
              <h3>{activity}</h3>
              <button onClick={handler}>new suggestion</button>
            </>
          )}
        </>
      )}
    </div >
  );
};

export default Activity;