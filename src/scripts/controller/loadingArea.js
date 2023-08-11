export const loadingLayer = document.querySelector("#loadingLayer");
export const loadVideo = document.querySelector("#loadVideo span");
export const loadSong = document.querySelector("#loadSong span");
export const loadSongMap = document.querySelector("#loadSongMap span");
export const loadSongInfo = document.querySelector("#loadSongInfo span");
export const loadLyrics = document.querySelector("#loadLyrics span");
export const loadText = document.querySelector("#loadText span");
export const loadFonts = document.querySelector("#loadFonts span");
export const loadVocalAmplitude = document.querySelector("#loadVocalAmplitude span");
export const loadValenceArousal = document.querySelector("#loadValenceArousal span");
const nowLoading = "読込中";

/**
 * ロード中の表示制御コントーラー.
 */
export class LoadingController {
  constructor() {}

  hideElements() {
    loadingLayer.style.display = "none";
    loadVideo.textContent = "-";
    loadSong.textContent = "-";
    loadSongMap.textContent = "-";
    loadSongInfo.textContent = "-";
    loadLyrics.textContent = "-";
    loadText.textContent = "-";
    loadFonts.textContent = "-";
    loadVocalAmplitude.textContent = "-";
    loadValenceArousal.textContent = "-";
  }

  enableLoadingLayer() {
    loadingLayer.style.display = "grid";
  }

  loadElements(element) {
    element.textContent = nowLoading;
  }

}
