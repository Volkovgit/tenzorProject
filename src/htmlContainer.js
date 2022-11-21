import { lasFmInterface } from "./lasFmInterface.js";

/**
 * Изоляция внутренних функций и преобразования страницы
 */
export function htmlContainer() {
  /**
   * Генерируем массив готовых карточек всех исполнителей
   * @param {array} artists - список акртистов
   * @returns {array}
   */
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

  /**
   * Каждому артисту запрашиваем его топ тегов
   * @param {object} artists - список акртистов в JSON формате
   * @param {number} tagCount - кол-во тегов которые нужно вывести
   * @returns {array}
   */
  async function setArtistTagsInArtistCard(artists, tagCount) {
    const artistWithTags = await Promise.all(
      artists.map(async (artist) => {
        await getTagsByArtistName(artist.name).then((tags) => {
          artist.toptags = tags.toptags.tag
            .slice(0, tagCount)
            .map((tag) => tag.name);
        });
        return artist;
      })
    );
    return artistWithTags;
  }

  function sliceArtistArray(artists, artistCount) {
    return artists.artists.artist.slice(0, artistCount);
  }

  function sliceTracksArray(tracks, tracksCount) {
    return tracks.tracks.track.slice(0, tracksCount);
  }

  /**
   * Запрашиваем топ популярных тегов артиста
   * @param {string} name - Имя артиста
   * @returns {array}
   */
  async function getTagsByArtistName(name) {
    return await lasFmInterface().getTopAuthorsTags(name);
  }

  /**
   * Вставляем на страницу готовый массив элементов
   * @param {string} tagName - контейнер куда необходимо вставить готовые элементы
   * @param {array} elements - массив эелементво для вставки на страницу
   */
  function insertElementsIntoHtmlContainer(tagName, elements) {
    const container = document.getElementsByClassName(`${tagName}`)[0];
    elements.forEach((element) => {
      container.appendChild(element);
    });
  }
  /**
   * Генерация массива карточек треков
   * @param {array} tracks - массив треков
   * @returns {array}
   */
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

  /**
   * Каждому треку запрашиваем его топ тегов
   * @param {array} tracks - список треков
   * @param {number} tagCount - кол-во тегов которые нужно вывести
   * @returns {array}
   */
  async function setArtistTagInTrackCard(tracks, tagCount) {
    const tracksWithArtistTag = await Promise.all(
      tracks.map(async (track) => {
        await getTagsByArtistName(track.artist.name).then((tags) => {
          track.toptags = tags.toptags.tag
            .slice(0, tagCount)
            .map((tag) => tag.name);
        });
        return track;
      })
    );
    return tracksWithArtistTag;
  }
  /**
   * Агрегация вышестоящих функций. Подготовка и вставка карточек артистов
   */
  function insertArtistIntoHTML() {
    lasFmInterface()
      .getTopArtist()
      .then((artists) => sliceArtistArray(artists, 10))
      .then((artists) => setArtistTagsInArtistCard(artists, 2))
      .then((artists) => createArtistCardsList(artists))
      .then((artists) =>
        insertElementsIntoHtmlContainer("artist_card_list_container", artists)
      );
  }
  /**
   * Агрегация вышестоящих функций. Подготовка и вставка карточек треков
   */
  function insertTracksIntoHtml() {
    lasFmInterface()
      .getTopTracks()
      .then((tracks) => sliceTracksArray(tracks, 24))
      .then((tracks) => setArtistTagInTrackCard(tracks, 10))
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
