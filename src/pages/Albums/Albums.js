/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import {
  Header,
  Title,
  Container,
  Content,
  Spinner,
} from "../../components/custom-lib";
import AlbumList from "../../components/AlbumList";
import SearchBar from "./components/SearchBar";
import { getAlbums, updateFavoriteStatus } from "../../api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Albums() {
  const queries = useQuery();
  const albumsLimit = queries.get("limit") ?? 10;

  const [albums, setAlbums] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getAlbums(albumsLimit, query)
      .then((albums) => setAlbums(albums))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [albumsLimit, query]);

  function changeFavoriteStatus(album) {
    return updateFavoriteStatus(album).then((album) => {
      const dataCopy = [...albums];
      const index = dataCopy.findIndex((el) => el.id === album.id);
      if (index !== -1) {
        dataCopy[index].favorite = album.favorite;
      }
      return dataCopy;
    });
  }

  const handleFavoriteStatus = (album) => {
    changeFavoriteStatus(album).then((data) => setAlbums(data));
  };

  const handleSearchChange = (serachValue) => setQuery(serachValue);

  return (
    <>
      <Header
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title>Album List</Title>
        <SearchBar
          onSearch={handleSearchChange}
          isLoading={isLoading}
        ></SearchBar>
      </Header>
      <Container>
        <Content>
          {isLoading && (
            <div
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner css={{ fontSize: "3rem" }} />
            </div>
          )}
          {albums && !isLoading && (
            <AlbumList
              albums={albums}
              changeFavoriteStatus={handleFavoriteStatus}
            ></AlbumList>
          )}
          {error && !isLoading && (
            <div css={{ textAlign: "center" }}>Ups.. Something went wrong</div>
          )}
        </Content>
      </Container>
    </>
  );
}
export default Albums;
