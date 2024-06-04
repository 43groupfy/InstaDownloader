import React, { useEffect, useState } from "react";
import Loader from "react-js-loader";
function App() {
  const [backendData, setBackendData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [resData, setResData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //For dev mode
    fetch("/api")
      //For deploy mode
      // fetch("https://safe-dusk-18400-bc6e0d3dfe3f.herokuapp.com/api")
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
    const regexInsta = /instagram\.com/;
    if (
      inputValue == "" ||
      inputValue == null ||
      inputValue == undefined ||
      !regexInsta.test(inputValue)
    ) {
      setLoading(false);
      setResData("Please enter a valid URL");
      return;
    }

    e.preventDefault();
    setResData(null);

    if (inputValue != "" && inputValue != null && inputValue != undefined) {
      //For dev mode
      fetch("/api/data", {
      //For deploy mode
      // fetch("https://safe-dusk-18400-bc6e0d3dfe3f.herokuapp.com/api/data", {
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
          if (data.data == 500) {
            console.log(data.data);
            setResData(404);
          }
          if (data.data == 404) {
            setResData(404);
            console.log(404);
          } else {
            setResData(data[0]);
          }
        })
        .catch((error) => {
          setLoading(false);
          setResData(
            "An error occurred while fetching data. Please try again later."
          );
          console.error("An error occurred:", error);
        });
    } else {
      console.log("Invalid Input");
    }
  };
  useEffect(() => {
    if (resData !== null) {
      // console.log(resData);
    }
  }, [resData]);
  return (
    <>
      <div className="flex items-start justify-center h-screen text-gray-100 bg-dark bg-zinc-900">
        <div className="container px-4 py-8 mx-auto">
          <form onSubmit={handleSubmit}>
            <h1 className=" text-[1.5rem] font-semibold  mb-4">
              Welcome to Insta Downloader! 🎉
            </h1>
            <label htmlFor="videoUrl" className="block mb-2">
              <br />
              Pease enter the URL of the Instagram Reel, Story, or Post :
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="videoUrl"
              value={inputValue}
              className="w-full px-4 py-2 text-gray-100 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-clifford"
            />
            <button
              type="submit"
              className="px-6 py-2 mt-4 font-bold rounded-md bg-zinc-100 text-zinc-900"
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
              <div className="mt-5">Invalid URL</div>
            ) : resData === 500 ? (
              <>
                <div className="mt-5">API is down</div>
              </>
            ) : resData != null &&
              resData != 500 &&
              resData != 404 &&
              resData != undefined &&
              resData != "Please enter a valid URL" ? (
              <div className="flex flex-col items-center gap-5">
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
            ) : resData == 500 ? (
              <>
                <div className="mt-5">Sorry, The API is down 😥</div>
              </>
            ) : (
              <div className="mt-5">{resData}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
