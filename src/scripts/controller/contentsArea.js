import { Ease } from "textalive-app-api";
import { BackgroundObject } from "../utils/background.js";
import { StarObject, starEl } from "../utils/starObject.js";
import { ChordController } from "../utils/chord.js";

const star = new StarObject();
const chordCtrl = new ChordController();

const backgroundEl = document.querySelector("#background");
const keyboardArea = document.querySelector("#keyboard");
const performanceArea = document.querySelector("#performance");
const contentsArea = document.querySelector("#contentMain");
const contentsSubArea = document.querySelector("#contentSub");
const hideChordEl = document.querySelector("#performanceArea #hideChordObj");
const charEl = document.querySelector("#containerMain p#char");
const phraseEl = document.querySelector("#containerSub p#phrase");

/**
 * コンテンツエリアの表示制御コントーラー.
 */
export class ContentsAreaDisplayController {
  player;
  chordObj;
  charObj;
  phraseObj;
  nowObj;
  isInterlude = true;
  withRotate = false;
  constructor(player) {
    this.player = player;
  }

  hideElements() {
    keyboardArea.style.display = "none";
    performanceArea.style.display = "none";
    contentsArea.style.display = "none";
    contentsSubArea.style.display = "none";
    phraseEl.style.display = "none";
    charEl.textContent = "";
    phraseEl.textContent = "";
    this.withRotate = false;
    backgroundEl.className = "";
    this.charObj = "";
    this.phraseObj = "";
    this.nowObj = 0;
  }

  enablePerformanceArea(position) {
    keyboardArea.style.display = "block";
    performanceArea.style.display = "block";
    this.chordStar(position);
    this.beatStarCtl(position);
  }

  enableContentsArea(current) {
    contentsArea.style.display = "block";
    contentsSubArea.style.display = "block";
    phraseEl.style.display = "block";
    this.setCharObj(current);
  }

  /**
   * 歌詞の表示と演出の切り替え
   *
   * @param {*} position 
   */
  ctrlLyricsAndEmotion(position) {
    // キャラクターが来たら、歌詞の表示を開始する
    let current = this.charObj || this.player.video.firstChar;
    while (current && current.startTime < position) {
      if (this.charObj !== current) {
        this.enableContentsArea(current);
        this.charObj = current;
      }
      current = current.next;
    }

    const chorus = this.player.findChorus(position);
    if (chorus && this.withRotate === false) {
      this.setRotate(true);
    } else if (!chorus && this.withRotate === true) {
      this.setRotate(false);
    }
  }

  /**
   * コーラスのタイミングで演出を変える
   *
   * @param {*} isRotate 
   */
  setRotate(isRotate) {
    this.withRotate = isRotate;
    const bgo = new BackgroundObject(this.withRotate);
    bgo.createBackgroundStars();
    const clzName = isRotate ? "switchEmotion" : "";
    backgroundEl.className = clzName;
  }

  /**
   * ビートスターの制御、メイン
   *
   * @param {*} position 
   */
  beatStarCtl(position) {
    const isDisp = true;
    if (isDisp) {
      // 星のオブジェクトを生成
      star.createStarElements();
      this.hideChordObjCtrl(position);
      this.beatStar(position);
    }
  }

  /**
   * コードオブジェクトの制御
   *
   * @param {*} position 
   */
  hideChordObjCtrl(position) {
    const chord = this.player.findChord(position);
    const baseSize = star.getBaseSize();
    const racioChord = Math.ceil(Ease.circIn(chord.progress(position)) * 100) / 100;
    const mathWidth = baseSize * racioChord * 0.98;
    hideChordEl.style.width = mathWidth * 2;
    hideChordEl.style.height = mathWidth * 2;
  }

  /**
   * ビートスターの制御
   *
   * @param {*} position 
   */
  beatStar(position) {
    const beat = this.player.findBeat(position);
    const racioBeat = Math.ceil(Ease.circIn(beat.progress(position)) * 100) / 100;
    // このままだと明滅が激しすぎるので、調整
    let tmpRacio = Math.ceil(racioBeat * 10);
    tmpRacio = tmpRacio % 2 === 0 ? tmpRacio : tmpRacio + 1;
    const racioBeatStar = tmpRacio / 10;
    starEl.style.display = "grid";
    starEl.style.opacity = racioBeatStar;
  }

  /**
   * コードスターの制御
   *
   * @param {*} position 
   */
  chordStar(position) {
    const chord = this.player.findChord(position);
    if (this.chordObj != chord.name) {
      if (chord.name == "N") {
        star.hideChordStar();
      }
      // chordCtrl.setIsDebug();
      const chordArr = chordCtrl.getOctaveChord(chord.name);
      star.dispChordStar(chordArr, chord.duration, this.withRotate);
      this.chordObj = chord.name;
    }
  }

  /**
   * 文字ごとの制御
   *
   * @param {*} current 
   */
  setCharObj(current) {
    const classes = [];
    classes.push("hideChars");

    // 品詞
    if (
      current.parent.pos === "N" ||
      current.parent.pos === "PN" ||
      current.parent.pos === "X"
    ) {
      classes.push("noun");
    }

    // 英単語の最初か最後の文字か否か
    if (current.parent.language === "en") {
      if (current.parent.lastChar === current) {
        classes.push("lastCharInEnglishChar");
      } else if (current.parent.firstChar === current) {
        classes.push("firstCharInEnglishChar");
      }
    }

    // noun(名詞), lastChar クラスを必要に応じて追加
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(current.text));
    div.className = classes.join(" ");

    // 文字を画面上に追加
    charEl.appendChild(div);
  }

  /**
   * フレーズが切り替わるごとに、文字をリセット
   *
   * @param {*} now 
   * @param {*} unit 
   */
  charResetByPhrase(now, unit) {
    const nowSecond = Math.floor(now / 1000);
    if (unit.contains(now)) {
      // ワードとフレーズの表示エリアを表示
      charEl.style.display = "block";
      phraseEl.style.display = "block";
      if (this.phraseObj != unit.text) {
        // フレーズが切り替わったらリセット
        charEl.textContent = "";
        phraseEl.textContent = "";
        if (this.isInterlude === true) {
          // 間奏に入って表示を消した場合は、前のフレーズを消す
          this.phraseObj = "";
          this.isInterlude = false;
        }
        if (this.phraseObj) {
          // フレーズの切り替わりが速い曲があるので、
          // 画面下部に2フレーズ分を表示する為の仕掛け
          const divOld = document.createElement("div");
          divOld.appendChild(document.createTextNode(this.phraseObj));
          phraseEl.appendChild(divOld);
          const divSpacer = document.createElement("div");
          divSpacer.appendChild(document.createTextNode("　"));
          phraseEl.appendChild(divSpacer);
        }
        const divNew = document.createElement("div");
        divNew.appendChild(document.createTextNode(unit.text));
        phraseEl.appendChild(divNew);
      }
      this.phraseObj = unit.text;
      this.nowObj = nowSecond;
    } else {
      const diff = (this.nowObj + 2) < nowSecond;
      if (diff) {
        // 一定以上表示されていたら消す
        // ※間奏の疑似検知
        charEl.textContent = "";
        charEl.style.display = "none";
        this.isInterlude = true;
        phraseEl.textContent = "";
        phraseEl.style.display = "none";
      }
    }
  }

}
