import { useEffect, useState } from "react";

function Quote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
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
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      const randomNum = Math.floor(Math.random() * data.length);
      setQuote(data[randomNum].text);
      setAuthor(data[randomNum].author);
      setLoading(false);
    } catch (err) {
      setErrorState({ error: true, message: err.message });
    }
  }

  return (
    <div className="quote-component">
      {errorState.error ? (
        <h2>{errorState.message}</h2>
      ) : (
        <>
          <h2>quote:</h2>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <>
              <h3>{quote}</h3>
              <p>-{author}</p>
              <button onClick={handler}>new quote</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Quote;