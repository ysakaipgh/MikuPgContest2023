const rootNote = ["C", "D", "E", "F", "G", "A", "B"];
const frequency = [1, 2, 3, 4, 5, 6, 7];
const rootNoteNumber = [1, 3, 5, 6, 8, 10, 12];

const rootHarfNote = ["C#", "Db", "D#", "Eb", "F#", "Gb", "G#", "Ab", "A#", "Bb"];
const rootHarfNoteNumber = [2, 2, 4, 4, 7, 7, 9, 9, 11, 11];

const scaleNameFlat = ["ド", "レ♭", "レ", "ミ♭", "ミ", "ファ", "ソ♭", "ソ", "ラ♭", "ラ", "シ♭", "シ"];
const scaleNameSharp = ["ド", "ド#", "レ", "レ#", "ミ", "ファ", "ファ#", "ソ", "ソ#", "ラ", "ラ#", "シ"];

const onChoad = "/";

class ChordObject {
  #chord = "";
  rootNotes = new Array();
  types = new Array();
  baseStr = "";
  #baseChar = "";
  #baseIndex = -1;
  // 基準となる度数
  #basefrequency = -1;
  // 基準の位置
  baseNumber = -1;
  // コード（和音）の種類
  type = "";
  isMinor = false;

  constructor(chord) {
    this.#chord = chord;
  }

  /**
   * コードの分解を行う.
   */
  splitChord() {
    const splitChord = this.#chord.split(onChoad);
    splitChord.forEach(c => {
      const tmpBaseChordOne = c.slice(0, 1);
      const tmpBaseChordTwo = c.slice(0, 2);
      if (rootHarfNote.indexOf(tmpBaseChordTwo) !== -1) {
        this.rootNotes.push(tmpBaseChordTwo);
        this.types.push(c.slice(2, 2 + c.length));
      } else if (rootNote.indexOf(tmpBaseChordOne) !== -1) {
        this.rootNotes.push(tmpBaseChordOne);
        this.types.push(c.slice(1, 1 + c.length));
      } else {
        // N がここに来るはず
        this.rootNotes.push(c);
      }
    });
  }

  /**
   * 基準となる情報を作成.
   */
  createBaseInfo() {
    this.baseStr = this.rootNotes[0];
    this.#baseChar = this.baseStr.slice(0, 1);
    this.#baseIndex = rootNote.indexOf(this.#baseChar);
    // 基準となる度数
    this.#basefrequency = frequency[this.#baseIndex];
    // 基準の位置
    this.baseNumber = this.baseStr.length == 1
      ? rootNoteNumber[this.#baseIndex]
      : rootHarfNoteNumber[rootHarfNote.indexOf(this.baseStr)];

    // コード（和音）の種類
    this.type = this.types[0];
    this.isMinor = this.type.slice(0, 1) === "m";
  }
}

export class ChordController {
  #isDebug = false;
  setIsDebug() {
    this.#isDebug = true;
  }

  constructor() {
  }

  /**
   * コードの文字列から、1オクターブに収まる数値化した配列を返却する.
   *
   * @param {*} chord 
   * @returns 
   */
  getOctaveChord(chord) {
    let resultArray = new Array();

    const analysisChord = this.analysisChord(chord);

    resultArray = this.#oraganizeIntoOneOctave(analysisChord);

    return resultArray;
  }

  /**
   * コードの文字列から、音の位置を示す配列を、数値化して返却する.
   *
   * @param {*} chord 
   * @returns 
   */
  analysisChord(chord) {
    const analysisChord = new ChordObject(chord);
    // コードの分解
    analysisChord.splitChord();

    let resultArray = new Array();
    analysisChord.baseStr = analysisChord.rootNotes[0];
    if (analysisChord.baseStr === "N") {
      // コードが無ければ返却
      return resultArray;
    }

    // 基準となる情報を作成
    analysisChord.createBaseInfo();

    if (analysisChord.type.indexOf("dim") !== -1) {
      resultArray[0] = analysisChord.baseNumber;
      // ディミニッシュ・トライアド（減三和音）は短3度を2回乗せる（＝2回目が減5度）
      let roopNum = 2;
      if (analysisChord.type.indexOf("dim7") !== -1) {
        // ディミニッシュ（四和音）は追加で、単3度を乗せる（＝減7度）
        roopNum = 3;
      }
      for (let i = 1; i <= roopNum; i++) {
        resultArray[i] = resultArray[i - 1] + 3;
      }
    } else {
      // 基準となる三和音を作成
      resultArray = this.#createBaseChord(resultArray, analysisChord);
      // 四和音目を追加
      resultArray = this.#additionalChord(resultArray, analysisChord);

      const tensionChord = this.#getTensionChord(analysisChord.type);
      if (tensionChord) {
        // テンションコードがあれば追加
        resultArray = this.#addTensionChord(resultArray, tensionChord);
      }

      // 最後に、分散コードを足す
      if (analysisChord.rootNotes[1]) {
        resultArray = this.#addSlashChord(resultArray, analysisChord);
      }

      // 音の追加が終わったら、音の位置を調整
      resultArray = this.#soundAdjustment(resultArray, analysisChord);
    }

    if (this.#isDebug === true) {
      this.#debugResultLog(chord, analysisChord.baseStr, analysisChord.type, resultArray);
    }

    return resultArray;
  }

  /**
   * 基準となる三和音を作成
   *
   * @param {*} resultArray 
   * @param {*} analysisChord 
   * @returns 
   */
  #createBaseChord(resultArray, analysisChord) {
    resultArray[0] = analysisChord.baseNumber;
    let adjustNinthValueFirst = 0;
    let adjustNinthValueSecond = 0;
    if (
      analysisChord.type.slice(0, 1) === "9"
      || analysisChord.type.slice(0, 2) === "m9"
    ) {
      adjustNinthValueFirst = -2;
      adjustNinthValueSecond = 2;
    }
    resultArray[1] = resultArray[0] + (analysisChord.isMinor ? 3 : 4) + adjustNinthValueFirst;
    resultArray[2] = resultArray[1] + (analysisChord.isMinor ? 4 : 3) + adjustNinthValueSecond;
    return resultArray;
  }

  /**
   * 四和音目を追加.
   *
   * @param {*} resultArray 
   * @param {*} analysisChord 
   * @returns 
   */
  #additionalChord(resultArray, analysisChord) {
    if (analysisChord.type.indexOf("6") !== -1) {
      // シックスとマイナーシックスは、音の間隔を1にして追加
      resultArray[3] = resultArray[2] + 1 + 1;
    } else if (
      analysisChord.type.slice(0, 1) === "7"
      || analysisChord.type.slice(0, 2) === "m7"
    ) {
      // セブンスとマイナーセブンスは、音の間隔を2にして追加
      resultArray[3] = resultArray[2] + 2 + 1;
    } else if (analysisChord.type.indexOf("M7") !== -1) {
      // メジャーセブンスとマイナーメジャーセブンスは、音の間隔を3にして追加
      resultArray[3] = resultArray[2] + 3 + 1;
    } else if (analysisChord.type.indexOf("add9") !== -1) {
      // アドナインスは、三和音に直接9度の音を追加
      resultArray[3] = resultArray[0] + (analysisChord.isMinor ? 0 : 1) + 1 + 12;
    }
    return resultArray;
  }

  /**
   * テンションコードの取得.
   *
   * @param {*} type コード（和音）の種類
   * @returns 
   */
  #getTensionChord(type) {
    if (type.indexOf("(") !== -1 && type.indexOf(")") !== -1) {
      return type.split("(")[1].split(")")[0];
    }
    return null;
  }

  /**
   * テンションコードを追加.
   *
   * @param {*} resultArray
   * @param {*} tensionChord
   * @returns 
   */
  #addTensionChord(resultArray, tensionChord) {
    const tcdFirstChar = tensionChord.slice(0, 1);
    let soundAdjustment = 0;
    let tensionChordNumber = "";
    if (tcdFirstChar == "b") {
      soundAdjustment = -1;
      tensionChordNumber = tensionChord.slice(1, 1 + tensionChord.length - 1);
    } else if (tcdFirstChar == "#") {
      soundAdjustment = 1;
      tensionChordNumber = tensionChord.slice(1, 1 + tensionChord.length - 1);
    } else {
      tensionChordNumber = tensionChord;
    }
    // 1オクターブ分の度数 7 + 配列index分 1 を引く
    const tcn = Number(tensionChordNumber) - 8;
    if (tcn > 0) {
      // テンションコードの5音目を足すパターン
      resultArray.push(rootNoteNumber[tcn] + resultArray[0] + 11 + soundAdjustment);
    }
    return resultArray;
  }

  /**
   * 分散コードを追加.
   *
   * @param {*} resultArray 
   * @param {*} analysisChord 
   * @returns 
   */
  #addSlashChord(resultArray, analysisChord) {
    const onChordStr = analysisChord.rootNotes[1];
    const onChordChar = onChordStr.slice(0, 1);
    const onChordIndex = rootNote.indexOf(onChordChar);
    // 基準の位置
    const onChordNumber = onChordStr.length == 1
      ? rootNoteNumber[onChordIndex]
      : rootHarfNoteNumber[rootHarfNote.indexOf(onChordStr)];
    const returnArray = [];
    const diffArray = this.#oraganizeIntoOneOctave(resultArray);
    // 最初に分散コードを追加する
    returnArray.push(onChordNumber < resultArray[0]
      ? onChordNumber + 12
      : onChordNumber);
    // 残りのコードを追加する
    resultArray.forEach((n) => {
      let isAdd = false;
      if (diffArray.includes(onChordNumber)) {
        // 転回形
        if (n !== returnArray[0]) {
          // 転回形は、分散コードに一致しない音だけを追加する。
          isAdd = true;
        }
      } else {
        // 転回形ではない場合、一致する音が無いので、すべて追加する。
        isAdd = true;
      }
      if (isAdd) {
        // 分散コードより大きい数字はそのまま追加、そうでない場合は1オクターブ上げる
        returnArray.push(returnArray[0] < n ? n : n + 12);
      }
    });
    return returnArray.sort((a, b) => a - b);
  }

  /**
   * 音の位置を調整.
   *
   * @param {*} resultArray 
   * @param {*} analysisChord 
   * @returns 
   */
  #soundAdjustment(resultArray, analysisChord) {
    if (analysisChord.type.indexOf("b5") !== -1 || analysisChord.type.indexOf("-5") !== -1) {
      // マイナー・セブン フラット・ファイブ、dim7の別表記である、m6(b5)、を含め5度（3番目の音）を半音下げる
      resultArray[2] = resultArray[2] - 1;
    } else if (analysisChord.type.indexOf("aug") !== -1) {
      // オーギュメントは、5度（3番目の音）を半音上げる
      resultArray[2] = resultArray[2] + 1;
    }

    if (analysisChord.type.indexOf("sus2") !== -1) {
      // サス・ツーは、3度（2番目の音）を1度下げる
      resultArray[1] = resultArray[1] - 2;
    } else if (analysisChord.type.indexOf("sus4") !== -1) {
      // サス・フォーは、3度（2番目の音）を半音上げる
      resultArray[1] = resultArray[1] + 1;
    }
    return resultArray;
  }

  /**
   * 1オクターブに収まるように調整.
   *
   * @param {*} arr 
   * @returns 
   */
  #oraganizeIntoOneOctave(arr) {
    let result = new Array();
    arr.forEach(o => {
      while (o > 12) {
        o = (o > 12) ? o - 12 : o;
      }
      while (o < 1) {
        o = (o < 1) ? o + 12 : o;
      }
      if (!result.includes(o)) {
        result.push(o);
      }
    });
    return result.sort((a, b) => a - b);
  }

  /**
   * デバッグ出力用の関数.
   *
   * @param {*} chord 
   * @param {*} baseStr 
   * @param {*} type 
   * @param {*} resultArray 
   */
  #debugResultLog(chord, baseStr, type, resultArray) {
    let debugStr = `${chord} | ${baseStr} | ${type} [ ${resultArray} | `;

    const scaleNameArr = (baseStr.length == 2 && baseStr.slice(1, 2) == "#")
      ? scaleNameSharp
      : (baseStr.length == 1 && ["C", "F", "G"].indexOf(baseStr) == -1)
        ? scaleNameSharp
        : scaleNameFlat;
    resultArray.forEach(o => {
      const rn = this.#oraganizeIntoOneOctave([o]);
      const i = rn[0] - 1;
      debugStr += `${scaleNameArr[i]}(${o}), `;
    });
    debugStr += "]";

    console.log(debugStr);
  }

}
