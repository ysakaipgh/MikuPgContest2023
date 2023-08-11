import { Player } from "textalive-app-api";
import { myToken } from "./config/define.js";
import { mediaDiv, MusicPlayerController } from "./controller/musicPlayer.js";
import { loadVideo, loadSong, loadSongMap, loadSongInfo, loadLyrics, loadText, loadFonts,
  loadVocalAmplitude, loadValenceArousal, LoadingController, } from "./controller/loadingArea.js";
import { ContentsAreaDisplayController } from "./controller/contentsArea.js";
import { StarObject } from "./utils/starObject.js";

const player = new Player({
  app: { token: myToken },
  mediaElement: mediaDiv,
  mediaBannerPosition: "top left"
});
const mpCtrl = new MusicPlayerController(player);
const loadCtrl = new LoadingController();
const cadCtrl = new ContentsAreaDisplayController(player);
const star = new StarObject();

player.addListener({
  onAppReady, onVideoReady, onTimerReady,
  onTimeUpdate, onPlay, onPause, onStop,
  // Load
  onVideoLoad, onSongLoad, onSongMapLoad, onSongInfoLoad, onLyricsLoad, onTextLoad,
  onFontsLoad, onVocalAmplitudeLoad, onValenceArousalLoad,
});

// Load
function onVideoLoad() { loadCtrl.loadElements(loadVideo); }
function onSongLoad() { loadCtrl.loadElements(loadSong); }
function onSongMapLoad() { loadCtrl.loadElements(loadSongMap); }
function onSongInfoLoad() { loadCtrl.loadElements(loadSongInfo); }
function onLyricsLoad() { loadCtrl.loadElements(loadLyrics); }
function onTextLoad() { loadCtrl.loadElements(loadText); }
function onFontsLoad() { loadCtrl.loadElements(loadFonts); }
function onVocalAmplitudeLoad() { loadCtrl.loadElements(loadVocalAmplitude); }
function onValenceArousalLoad() { loadCtrl.loadElements(loadValenceArousal); }

function onTimerReady() { initState(); mpCtrl.initElements(); }
function onPlay() { initState(); mpCtrl.hideElements(); } // 再生時に不要な物を制御
function onPause() { initState(); mpCtrl.initElements(); } // 再生が一時停止したら表示をリセット
function onStop() { initState(); mpCtrl.initElements(); } // 再生が停止したら表示をリセット
function initState() { loadCtrl.hideElements(); cadCtrl.hideElements(); mpCtrl.progressBarStyle(0); }

// ================================================================================
// アプリの準備
function onAppReady(app) {
  // 演出のリセット
  cadCtrl.setRotate(false);
  // コードスターエリアの生成
  star.createChordStarArea();
  // ミュージックプレイヤーの初期化
  mpCtrl.initAppInit(app.songUrl);
}

function onVideoReady(video) {
  // 定期的に呼ばれる各フレーズの "animate" 関数をセットする
  let p = video.firstPhrase;
  while (p && p.next) {
    p.animate = charResetByPhrase;
    p = p.next;
  }
  // 意味が判らんが、ラストフレーズがファーストフレーズで取れないので…
  const lp = video.lastPhrase;
  lp.animate = charResetByPhrase;
}
const charResetByPhrase = function (now, unit) { cadCtrl.charResetByPhrase(now, unit); }

// ================================================================================
// メイン処理
function onTimeUpdate(position) {
  mpCtrl.hideElements();
  const beat = player.findBeat(position);
  if (!beat) { return; }

  // 歌詞が来なくても演出は開始する
  // パフォーマンスエリアの有効化
  cadCtrl.enablePerformanceArea(position);
  mpCtrl.progressBarStyle(position);

  // 歌詞情報がなければこれで処理を終わる
  if (!player.video.firstChar) { return; }

  // キャラクターが来たら、歌詞の表示を開始する
  cadCtrl.ctrlLyricsAndEmotion(position);
}
