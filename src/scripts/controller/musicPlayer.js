import { songPermaLinkBase, contestList, songleInfoList } from "../config/define"
import { loadingLayer } from "./loadingArea"

export const mediaDiv = document.querySelector("#media");

const playBtn = document.querySelector("#play");
const playBtnText = document.querySelector("#play span");
const muteBtn = document.querySelector("#mute");
const muteIcon = document.querySelector("#muteIcon");
const volumeBtn = document.querySelector("#volume");
const selectDiv = document.querySelector("#musicSelector");
const progressBarEl = document.querySelector("#progress");
const progressTimeEl = document.querySelector("#progressTime");

/**
 * 画面下の音楽制御コントーラー.
 */
export class MusicPlayerController {
  player;
  codeSelect = contestList[0];
  currentVolume = 50;
  progressBarPos = 0;
  isPlay = false;
  constructor(player) {
    this.player = player;
  }

  /**
   * 曲の読み込み.
   *
   * 初期ロードと楽曲セレクターから呼ばれる。
   */
  createSongData() {
    this.player.createFromSongUrl(songPermaLinkBase + songleInfoList[this.codeSelect].songPermaLink, {
      video: {
        beatId: songleInfoList[this.codeSelect].beatId,
        chordId: songleInfoList[this.codeSelect].chordId,
        repetitiveSegmentId: songleInfoList[this.codeSelect].repetitiveSegmentId,
        lyricId: songleInfoList[this.codeSelect].lyricId,
        lyricDiffId: songleInfoList[this.codeSelect].lyricDiffId
      },
    });
  }

  /**
   * onAppReady で呼ばれる、全体の初期化
   *
   * @param {*} songUrl 
   */
  initAppInit(songUrl) {
    // 定義の数分、コンテストの楽曲セレクターを生成する。
    this.createSelector();
    // ボタン系のイベントを初期化
    this.initPlayerBtnAction();
    if (!songUrl) {
      // サンプルでは直接記述していたが、定義は外に出して汎用的にしておく
      this.setSongleId(this.codeSelect);
    } else {
      // 本来なら消すじゃなく、上のセレクト追加で付与するのが正解なのだが、コンテストがメインの目的の為、これで良い
      this.hideSelectEl();
    }
  }

  /**
   * 楽曲IDの設定.
   *
   * 楽曲セレクターから呼ばれる。
   *
   * @param {*} songleId 
   */
  setSongleId(songleId) {
    this.codeSelect = songleId;
    this.createSongData();
    loadingLayer.style.display = "grid";
    this.disableCtrlBtn();
    contestList.forEach(id => {
      const el = document.querySelector(`div#selectorButton${id}`);
      if (id == songleId) {
        el.className = "selectorButton selected";
      } else {
        el.className = "selectorButton";
      }
    });
  }

  /**
   * 楽曲セレクターの生成.
   *
   * 初期ロード時に呼ばれる。
   */
  createSelector() {
    contestList.forEach(songleId => {
      const div = document.createElement("div");
      div.id = `selectorButton${songleId}`;
      div.className = "selectorButton";
      div.addEventListener("click", () => this.setSongleId(songleId));
      div.appendChild(
        document.createTextNode(
          songleInfoList[songleId].labelShortName
        )
      );
      selectDiv.appendChild(div);
    });
  }

  /**
   * 定義外の外部URL読み込み時に、楽曲セレクターを消す.
   */
  hideSelectEl() {
    selectDiv.style.paddingTop = "0px";
    selectDiv.style.display = "none";
  }

  /**
   * 再生・停止ボタンのイベント設定.
   *
   * 初期ロード時に呼ばれる。
   */
  initPlayerBtnAction() {
    this.switchPlayBtn(false);
    muteBtn.addEventListener("click", () => {
      if (volumeBtn.value != 0) {
        this.currentVolume = volumeBtn.value;
        this.player.volume = 0;
        volumeBtn.value = 0;
        muteIcon.textContent = "volume_off";
      } else {
        this.player.volume = this.currentVolume;
        volumeBtn.value = this.currentVolume;
        muteIcon.textContent = "volume_up";
      }
      this.setSliderColor(volumeBtn);
    });
    volumeBtn.addEventListener("input", (e) => {
      const slider = e.target;
      this.player.volume = slider.value;
      this.setSliderColor(slider)
    });
    this.setSliderColor(volumeBtn);
  }

  setSliderColor(slider) {
    const progress = (slider.value / slider.max) * 100;
    slider.style.background =
      `linear-gradient(to right, #${
        this.isPlay !== true ? "FA0060" : "EDAFAF"
      } ${progress}%, transparent ${progress}%)`;
    if (progress != 0) {
      muteIcon.textContent = "volume_up";
    } else {
      muteIcon.textContent = "volume_off";
    }
  }

  /**
   * ボタン系の初期化.
   *
   * ビデオ再生準備完了時・停止時に呼ばれる。
   */
  initElements() {
    muteBtn.className = "";
    volumeBtn.className = "";
    selectDiv.className = "";
    this.switchPlayBtn(false);
    this.setSliderColor(volumeBtn);
  }

  /**
   * 再生時に、押したらダメな物を消す.
   */
  hideElements() {
    muteBtn.className = "isPlay";
    volumeBtn.className = "isPlay";
    selectDiv.className = "hideSelect";
    this.switchPlayBtn(true);
    this.setSliderColor(volumeBtn);
  }

  /**
   * プレイボタン等の非活性化.
   *
   * 楽曲切替時に呼ばれる。
   */
  disableCtrlBtn() {
    playBtn.className = "disabled";
    muteBtn.className = "disabled";
    volumeBtn.className = "disabled";
    playBtn.removeEventListener;
  }

  /**
   * 再生ボタン＜＞停止ボタン、の切り替え
   *
   * @param {*} isPlay true:再生中（停止ボタン）、false:停止中（再生ボタン）
   */
  switchPlayBtn(isPlay) {
    this.isPlay = isPlay;
    if (isPlay) {
      playBtn.className = "isPlay";
      playBtn.removeEventListener;
      playBtn.addEventListener("click", () =>
        this.player.video
        && this.player.requestStop()
      );
      playBtnText.textContent = "stop_circle";
      progressBarEl.className = "isPlay";
    } else {
      playBtn.className = "";
      playBtn.removeEventListener;
      playBtn.addEventListener("click", () =>
        this.player.video
        && this.player.requestMediaSeek(0)
        && this.player.requestPlay()
      );
      playBtnText.textContent = "play_circle";
      progressBarEl.className = "";
    }
  }

  progressBarStyle(position) {
    const thisMusicLength = this.player.data.song.length;
    const currentPos = Math.ceil(position / 1000);
    this.progressBarPos = Math.ceil((currentPos / thisMusicLength) * 1000) / 10;
    progressBarEl.style.background =
      `linear-gradient(to right, #${
        this.isPlay !== true ? "FA0060" : "EDAFAF"
      } ${this.progressBarPos}%, transparent ${this.progressBarPos}%)`;
    const totalMinite = Math.floor(thisMusicLength / 60);
    const totalSecond = Math.floor(thisMusicLength % 60).toString().padStart(2, '0');
    const nowMinite = Math.floor(currentPos / 60);
    const nowSecond = Math.floor(currentPos % 60).toString().padStart(2, '0');
    progressTimeEl.textContent = `${nowMinite}.${nowSecond} / ${totalMinite}.${totalSecond}`;
  }

}
