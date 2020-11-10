/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

import AlbumItem from "./AlbumItem";

function AlbumList({ albums, changeFavoriteStatus }) {
  return (
    <div>
      {albums && albums?.length > 0 ? (
        albums.map((album) => (
          <AlbumItem
            key={album.id}
            album={album}
            changeFavoriteStatus={changeFavoriteStatus}
          ></AlbumItem>
        ))
      ) : (
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
          }}
        >
          No albums found
        </div>
      )}
    </div>
  );
}

export default AlbumList;
