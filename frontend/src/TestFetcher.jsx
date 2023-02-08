import { useState } from "react";
import "./App.css";

import { useQuery } from "react-query";
import { fetchApplications, fetchTestData } from "./api";

export default () => {
  const [nameToFetch, setNameToFetch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("nameToFetch :>> ", nameToFetch);
  };

  // const test = useQuery("test", fetchTestData);
  const test = useQuery("test2", fetchApplications);


  const TheData = () => {
    if (test.isLoading) {
      return <span>Loading...</span>;
    }
    if (test.isError) {
      return <span>Error: {test.error.message}</span>;
    }
    return <span>{test.data?.testData ?? "No data"}</span>;
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
