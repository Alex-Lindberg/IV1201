import { useState } from "react";
import "./App.css";

import { useQuery } from "react-query";
import { fetchTestData } from "./api";

export default () => {
  const [nameToFetch, setNameToFetch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("nameToFetch :>> ", nameToFetch);
  };

  const { isLoading, isError, data, error } = useQuery("test", fetchTestData);

  const TheData = () => {
    if (isLoading) {
      return <span>Loading...</span>;
    }
    if (isError) {
      return <span>Error: {error.message}</span>;
    }
    return <span>{data?.testData ?? "No data"}</span>;
  };

  return (
    <>
      <h1>Testing</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nameToFetch}
          onChange={(e) => setNameToFetch(e.target.value)}
        />
        <button type="submit">Fetch</button>
      </form>
      {
        <div>
          <TheData />
        </div>
      }
    </>
  );
};

