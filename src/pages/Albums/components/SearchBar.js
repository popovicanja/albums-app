/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import { Input, Spinner } from "../../../components/custom-lib";
import * as colors from "../../../styles/colors";
import useDebounce from "../../../hooks/useDebounce";

function SearchBar({ onSearch, isLoading }) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div css={{ position: "relative" }}>
      <Input
        type="text"
        onChange={(event) => setSearchTerm(event.target.value)}
      ></Input>
      <div
        css={{
          position: "absolute",
          top: "0",
          right: "8px",
          transform: "translateY(50%)",
          color: colors.gray400,
        }}
      >
        {!isLoading && <FaSearch></FaSearch>}
        {isLoading && <Spinner />}
      </div>
    </div>
  );
}

export default SearchBar;
