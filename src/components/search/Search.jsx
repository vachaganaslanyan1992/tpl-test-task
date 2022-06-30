import { AutoComplete } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import DataCard from "../card/Card";
import "./Search.css";

const Search = () => {
  let arr = useRef({});
  const [options, setOptions] = useState([]);
  const [saerchParams, setSerarchParams] = useSearchParams();

  const { isLoadind, data, query, setQuery } = useFetch();

  useEffect(() => {
    const postQery = saerchParams.get("search");
    if (postQery) {
      let newPostQery = postQery.replace("+", " ");
      setQuery(newPostQery);
    }
  }, []);

  const getAnaliticData = () => {
    const data = JSON.parse(localStorage.getItem("statistics"))
      ? JSON.parse(localStorage.getItem("statistics"))
      : [];
    return data;
  };

  const onSearch = (searchText) => {
    const options = data?.filter((cat) =>
      cat.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const optionsText = options?.map((option) => ({
      value: option.name.toLowerCase(),
    }));

    setOptions(!searchText ? [] : optionsText);
  };

  const onSelect = (selectData) => {
    setSerarchParams({ search: selectData });

    let statistic = getAnaliticData().find((item) => item.label === selectData);
    getAnaliticData().find((item) => item.label === selectData);
    if (statistic) {
      statistic.value = statistic.value + 1;
    } else {
      statistic = {
        value: 1,
        label: selectData,
      };
    }
    let resalt;
    if (getAnaliticData().length) {
      if (statistic.value > 1) {
        resalt = getAnaliticData().map((item) => {
          if (item.label === selectData) {
            return statistic;
          }
          return item;
        });
      } else {
        resalt = [...getAnaliticData(), statistic];
      }
    } else {
      resalt = [statistic];
    }

    return setInemLocalStorige(resalt);
  };

  const onChange = (searchedData) => {
    setQuery(searchedData);
  };

  const setInemLocalStorige = (data) => {
    localStorage.setItem("statistics", JSON.stringify(data));
  };

  return (
    <div className="searchContainer">
      <div>
        <AutoComplete
          value={query}
          options={options}
          className="saerchAutoComplete"
          onSelect={onSelect}
          onSearch={onSearch}
          onChange={onChange}
          placeholder="Enter cat name"
        />
      </div>
      <div className="cardContainer">
        {data?.length === 1 &&
          data?.map((item) => (
            <DataCard data={item} isLoadind={isLoadind} key={item.id} />
          ))}
      </div>
    </div>
  );
};

export default Search;
