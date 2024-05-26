import React, { useEffect, useState } from "react";
import Loader from "react-js-loader";
function App() {
  const [backendData, setBackendData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [resData, setResData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //For dev mode
    // fetch("/api")
    //For deploy mode
    fetch("https://safe-dusk-18400-bc6e0d3dfe3f.herokuapp.com/api")
      .then((res) => res.json())
      .then((data) => setBackendData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    setResData(null);

    if (inputValue != "" && inputValue != null && inputValue != undefined) {
      //For dev mode
      // fetch("/api/data", {
      //For deploy mode
      fetch("https://safe-dusk-18400-bc6e0d3dfe3f.herokuapp.com/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: inputValue }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          console.log(data);
          if (data.data == 404) {
            setResData(404);
            console.log(404);
          } else {
            setResData(data[0]);
          }
        });
    } else {
      console.log("Invalid Input");
    }
  };
  useEffect(() => {
    if (resData !== null) {
      console.log(resData);
    }
  }, [resData]);
  return (
    <>
      <div className="bg-dark text-gray-100 bg-zinc-900 flex justify-center items-start h-screen">
        <div className="container mx-auto py-8 px-4">
          <form onSubmit={handleSubmit}>
            <label htmlFor="videoUrl" className="block mb-2">
              Enter Insta Reel URL here
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="videoUrl"
              value={inputValue}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-clifford"
            />
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-zinc-100 rounded-md text-zinc-900 font-bold"
            >
              Submit
            </button>
          </form>
          <div>
            {loading ? (
              <Loader
                type="ekvalayzer"
                bgColor="#bdcb95"
                color="#c0ff00"
                title="Fetching..."
                size={100}
              />
            ) : null}
            {resData === null ? null : resData === 404 ? (
              <div>Invalid URL</div>
            ) : (
              <div className="flex  items-center flex-col gap-5">
                <img
                  src={resData.thumb}
                  alt="Image"
                  className="h-[40vh] rounded-md"
                />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={resData.link}
                  className="inline-block  rounded-md mt-4 px-6 py-2 bg-[#16a34a] text-zinc-100 font-bold"
                >
                  Download
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
