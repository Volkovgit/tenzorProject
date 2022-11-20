import {htmlContainer} from './htmlContainer.js'

try {
    htmlContainer().insertArtistIntoHTML();
    htmlContainer().insertTracksIntoHtml();
} catch (error) {
    alert("Какие то проблемы :(\nПожалуйста, перезагрузите страницу или попробуйте зайти позже");
}
