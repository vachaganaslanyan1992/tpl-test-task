import React from "react";
import DataCard from "../card/Card";
import "./Statistics.css";

const SearchStatistics = () => {
  const statistics = JSON.parse(localStorage.getItem("statistics"));
  console.log(statistics);
  return (
    <div className="statistiContainer">
      {statistics?.map((data) => (
        <DataCard data={data} key={data.label} />
      ))}
    </div>
  );
};
export default SearchStatistics;
