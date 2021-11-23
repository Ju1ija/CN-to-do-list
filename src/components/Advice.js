import { useEffect, useState } from "react";

function Advice() {
  const [advice, setAdvice] = useState("");
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
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice(data.slip.advice);
      setLoading(false);
    } catch (err) {
      setErrorState({ error: true, message: err.message });
    }
  }

  return (
    <div className="advice-component">
      {errorState.error ? (
        <h2>{errorState.message}</h2>
      ) : (
        <>
          <h2>advice:</h2>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <>
              <h3>{advice}</h3>
              <button onClick={handler}>new advice</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Advice;