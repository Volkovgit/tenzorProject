import { lasFmInterface } from "./lasFmInterface.js";

export function htmlContainer() {
  function createArtistCardsList(artists) {
    artists = artists.map((artist) => {
      const div = document.createElement("div");
      div.className = "artist_card";
      div.innerHTML = `<img class="artist_img" src="${
        artist.image[2]["#text"]
      }" alt="" /><div class="text_container"><p class="music_name">${
        artist.name
      }</p><p class="music_type">${artist.toptags.join(" • ")}</p></div>`;
      return div;
    });
    return artists;
  }

  async function setArtistTagsInArtistCard(artists,artistCount,tagCount) {
    artists = artists.artists.artist.slice(0, artistCount);
    const artistWithTags = await Promise.all(
      artists.map(async (artist) => {
        await getArtistTags(artist.name).then((tags) => {
          artist.toptags = tags.toptags.tag
            .slice(0, tagCount)
            .map((tag) => tag.name);
        });
        return artist;
      })
    );
    return artistWithTags;
  }

  async function getArtistTags(name) {
    return await lasFmInterface().getTopAuthorsTags(name);
  }

  function insertElementsIntoHtmlContainer(tagName, elements) {
    const container = document.getElementsByClassName(`${tagName}`)[0];
    elements.forEach((element) => {
      container.appendChild(element);
    });
  }

  function createTrackCardList(tracks) {
    tracks = tracks.map((track) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<img class="music_img" src="${
        track.image[2]["#text"]
      }" alt="" />
              <div class="text_container">
                <p class="music_name">${track.name}</p>
                <p class="music_artist">${track.artist.name}</p>
                <p class="music_type">${track.toptags.join(" • ")}</p>
              </div>`;
      return div;
    });
    return tracks;
  }

  async function setArtistTagInTrackCard(tracks) {
    const tagCount = 1;
    tracks = tracks.tracks.track.slice(0, 24);
    const tracksWithArtistTag = await Promise.all(
      tracks.map(async (track) => {
        await getArtistTags(track.artist.name).then((tags) => {
          track.toptags = tags.toptags.tag
            .slice(0, tagCount)
            .map((tag) => tag.name);
        });
        return track;
      })
    );
    return tracksWithArtistTag;
  }

  function insertArtistIntoHTML() {
    lasFmInterface()
      .getTopArtist()
      .then((artists) => setArtistTagsInArtistCard(artists,10,2))
      .then((artists) => createArtistCardsList(artists))
      .then((artists) =>
        insertElementsIntoHtmlContainer("artist_card_list_container", artists)
      );
  }

  function insertTracksIntoHtml() {
    lasFmInterface()
      .getTopTracks()
      .then((tracks) => setArtistTagInTrackCard(tracks))
      .then((tracks) => createTrackCardList(tracks))
      .then((tracks) =>
        insertElementsIntoHtmlContainer("card_container", tracks)
      );
  }
  return {
    insertTracksIntoHtml,
    insertArtistIntoHTML,
  };
}
