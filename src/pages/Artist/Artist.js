/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { FaChevronLeft } from "react-icons/fa";

import {
  Header,
  Title,
  Container,
  Content,
  Spinner,
} from "../../components/custom-lib";
import AlbumList from "../../components/AlbumList";
import { getArtist, updateFavoriteStatus } from "../../api";

function Artist() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();

  const artistId = useMemo(() => {
    return params.artistId;
  }, [params]);

  const { artist = null, albums = [] } = data || {};

  useEffect(() => {
    setIsLoading(true);
    getArtist(artistId)
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [artistId]);

  function changeFavoriteStatus(album) {
    return updateFavoriteStatus(album).then((album) => {
      const dataCopy = { ...data };
      const { artist, albums } = dataCopy;
      const index = albums.findIndex((el) => el.id === album.id);
      if (index !== -1) {
        albums[index].favorite = album.favorite;
      }
      return { artist, albums };
    });
  }

  const handleFavoriteStatus = (album) => {
    changeFavoriteStatus(album, data).then((data) => setData(data));
  };

  return (
    <>
      <Header css={{ display: "flex", alignItems: "center" }}>
        <Link to="/" css={{ display: "flex", alignItems: "center" }}>
          <FaChevronLeft></FaChevronLeft>
        </Link>
        <Title css={{ marginLeft: "16px" }}>
          {artist?.title || "No artist found"}
        </Title>
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
          {data && !isLoading && (
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
export default Artist;
