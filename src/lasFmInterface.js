import { apiConnect } from "./apiConnect.js";

export function lasFmInterface() {
  
  const requestInterface = apiConnect();
  const getTopArtist = () => {
    const requestParams = { method: "chart.getTopArtists", format: "json" };
    return requestInterface.request(requestParams)
  };
  const getTopTracks = () => {
    const requestParams = { method: "chart.getTopTracks", format: "json" };
    return requestInterface.request(requestParams)
  };
  const getTopAuthorsTags = (artist) => {
    const requestParams = { method: "artist.getTopTags", format: "json",artist };
    return requestInterface.request(requestParams)
  };
  return {
    getTopArtist,
    getTopTracks,
    getTopAuthorsTags
  };
}

