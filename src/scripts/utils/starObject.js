const colorYellow = "Yellow";
const colorRed = "Red";
const colorCyan = "Cyan";
const colorDodgerBlue = "DodgerBlue";
const colorMediumSlateBlue = "MediumSlateBlue";
const colorBlueViolet = "BlueViolet";
const chordStarColorList = [
  colorCyan,
  colorDodgerBlue,
  colorMediumSlateBlue,
  colorBlueViolet,
];

export const starEl = document.querySelector("#performanceArea #starGroup");

const keyAreaDefBlack = {
  "blackKeyNone1": "blackKeyNone",
  "blackKey1": "blackKey",
  "blackKey2": "blackKey",
  "blackKeyNone2": "",
  "blackKey3": "blackKey",
  "blackKey4": "blackKey",
  "blackKey5": "blackKey",
  "blackKeyNone3": "blackKeyNone",
};
const keyAreaDefWhite = {
  "whiteKey1": "whiteKey",
  "whiteKey2": "whiteKey",
  "whiteKey3": "whiteKey",
  "whiteKey4": "whiteKey",
  "whiteKey5": "whiteKey",
  "whiteKey6": "whiteKey",
  "whiteKey7": "whiteKey",
};
const keyAreaDef = {
  "keyboardNone1": "keyboardNoneArea",
  "blackKey": "keyboardKeyArea",
  "keyboardNone2": "keyboardNoneArea",
  "whiteKey": "keyboardKeyArea",
  "keyboardNone3": "keyboardNoneArea",
};

/**
 * 星型オブジェクトの定義.
 *
 * 長くなるので、外部クラス化.
 */
export class StarObject {
  // メイン
  svg_width = "159";
  svg_height = "151";
  racio_width = 0.165;
  racio_height = 0.157;
  racio_margin = 0.020;
  svg_viewBox = "0 0 159 151";
  svg_fill = "none";
  svg_xmlns = "http://www.w3.org/2000/svg";
  g_path_d = "M74.2652 3.45492C75.762 -1.15164 82.279 -1.15164 83.7758 3.45491L99.0022 50.3171C99.6716 52.3773 101.591 53.7721 103.758 53.7721H153.031C157.875 53.7721 159.889 59.9701 155.97 62.8172L116.107 91.7796C114.354 93.0528 113.621 95.3097 114.291 97.3698L129.517 144.232C131.014 148.839 125.741 152.669 121.823 149.822L81.9594 120.86C80.207 119.587 77.834 119.587 76.0816 120.86L36.2182 149.822C32.2996 152.669 27.0272 148.839 28.524 144.232L43.7504 97.3698C44.4198 95.3097 43.6865 93.0528 41.9341 91.7796L2.07066 62.8171C-1.84791 59.9701 0.165969 53.7721 5.00959 53.7721H54.2835C56.4496 53.7721 58.3694 52.3773 59.0387 50.3171L74.2652 3.45492Z";
  g_path_d_tick = "M81.3981 4.22746L96.6246 51.0897C97.6287 54.1799 100.508 56.2721 103.758 56.2721H153.031C155.453 56.2721 156.46 59.3711 154.501 60.7946L114.637 89.7571C112.009 91.6669 110.909 95.0521 111.913 98.1423L127.139 145.005C127.888 147.308 125.252 149.223 123.292 147.8L83.4289 118.837C80.8002 116.927 77.2408 116.927 74.6121 118.837L34.7487 147.8C32.7894 149.223 30.1532 147.308 30.9016 145.005L46.1281 98.1423C47.1321 95.0521 46.0322 91.6669 43.4035 89.7571L3.54012 60.7946C1.58084 59.3711 2.58777 56.2721 5.00959 56.2721H54.2835C57.5327 56.2721 60.4123 54.1799 61.4164 51.0897L76.6428 4.22746C77.3912 1.92418 80.6497 1.92418 81.3981 4.22746Z";
  g_path_stroke_width = "5";
  // 背景の小さい星
  ss_svg_wh = "36";
  ss_svg_viewBox = "0 0 36 36";
  ss_g_path_d = "M16.9168 0.824782C17.2577 -0.274927 18.7423 -0.274927 19.0832 0.824782L22.5516 12.0121C22.7041 12.5039 23.1414 12.8369 23.6348 12.8369H34.8589C35.9622 12.8369 36.4209 14.3165 35.5283 14.9962L26.4479 21.9103C26.0487 22.2142 25.8817 22.753 26.0341 23.2448L29.5026 34.4321C29.8435 35.5318 28.6425 36.4463 27.7499 35.7666L18.6695 28.8525C18.2703 28.5485 17.7297 28.5485 17.3305 28.8525L8.2501 35.7666C7.35749 36.4463 6.1565 35.5318 6.49744 34.4321L9.96587 23.2448C10.1183 22.753 9.9513 22.2142 9.55212 21.9103L0.471673 14.9962C-0.420934 14.3165 0.0378059 12.8369 1.14113 12.8369H12.3652C12.8586 12.8369 13.2959 12.5039 13.4484 12.0121L16.9168 0.824782Z";
  ss_racio_wh = 0.035;

  constructor() {
  }

  getBaseSize() {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    return (ww < wh) ? ww : wh;
  }

  createSmallStarSvg() {
    // path
    const path = document.createElementNS(this.svg_xmlns, "path");
    path.setAttribute("d", this.ss_g_path_d);

    // svg
    const svg = document.createElementNS(this.svg_xmlns, "svg");
    svg.setAttribute("width", this.ss_svg_wh);
    svg.setAttribute("height", this.ss_svg_wh);
    svg.setAttribute("viewBox", this.ss_svg_viewBox);
    svg.setAttribute("fill", this.svg_fill);
    svg.setAttribute("xmlns", this.svg_xmlns);
    const baseSize = this.getBaseSize();
    svg.style.width = `${Math.ceil(baseSize * this.ss_racio_wh)}px`;
    svg.style.height = `${Math.ceil(baseSize * this.ss_racio_wh)}px`;
    svg.appendChild(path);

    return svg;
  }

  createStarSvg(colorClz, isTick) {
    // path
    const path = document.createElementNS(this.svg_xmlns, "path");
    if(isTick == true) {
      path.setAttribute("d", this.g_path_d_tick);
      path.setAttribute("class", `chordStarColorStroke${colorClz}`);
      path.setAttribute("stroke-width", this.g_path_stroke_width);
    } else {
      path.setAttribute("d", this.g_path_d);
      path.setAttribute("class", `chordStarColorFill${colorClz}`);
    }

    // svg
    const svg = document.createElementNS(this.svg_xmlns, "svg");
    svg.setAttribute("width", this.svg_width);
    svg.setAttribute("height", this.svg_height);
    svg.setAttribute("viewBox", this.svg_viewBox);
    svg.setAttribute("fill", this.svg_fill);
    svg.setAttribute("xmlns", this.svg_xmlns);
    const baseSize = this.getBaseSize();
    svg.style.width = `${Math.ceil(baseSize * this.racio_width)}px`;
    svg.style.height = `${Math.ceil(baseSize * this.racio_height)}px`;
    svg.style.margin = `${Math.ceil(baseSize * this.racio_margin)}px`;
    svg.appendChild(path);

    return svg;
  }

  createStarElements() {
    starEl.textContent = "";
    starEl.appendChild(this.createStarSvg(colorYellow, false));
    starEl.appendChild(this.createStarSvg(colorRed, false));
    starEl.appendChild(this.createStarSvg(colorYellow, false));
  }

  createChordStarArea() {
    const divKeybordArea = document.querySelector("#keyboard");
    let keysMain = Object.keys(keyAreaDef);
    for (let i = 0; i < keysMain.length; i++) {
      const d = document.createElement("div");
      d.id = keysMain[i];
      d.className = keyAreaDef[keysMain[i]];
      if (keysMain[i] == "blackKey") {
        let keysBlack = Object.keys(keyAreaDefBlack);
        for (let j = 0; j < keysBlack.length; j++) {
          const db = document.createElement("div");
          db.id = keysBlack[j];
          db.className = keyAreaDefBlack[keysBlack[j]];
          d.appendChild(db);
        }
      } else if (keysMain[i] == "whiteKey") {
        let keysWhite = Object.keys(keyAreaDefWhite);
        for (let j = 0; j < keysWhite.length; j++) {
          const db = document.createElement("div");
          db.id = keysWhite[j];
          db.className = keyAreaDefWhite[keysWhite[j]];
          d.appendChild(db);
        }
      }
      divKeybordArea.appendChild(d);
    }
  }

  getChordElList() {
    const chordEl1 = document.querySelector("#keyboard div #whiteKey1");
    const chordEl2 = document.querySelector("#keyboard div #blackKey1");
    const chordEl3 = document.querySelector("#keyboard div #whiteKey2");
    const chordEl4 = document.querySelector("#keyboard div #blackKey2");
    const chordEl5 = document.querySelector("#keyboard div #whiteKey3");
    const chordEl6 = document.querySelector("#keyboard div #whiteKey4");
    const chordEl7 = document.querySelector("#keyboard div #blackKey3");
    const chordEl8 = document.querySelector("#keyboard div #whiteKey5");
    const chordEl9 = document.querySelector("#keyboard div #blackKey4");
    const chordEl10 = document.querySelector("#keyboard div #whiteKey6");
    const chordEl11 = document.querySelector("#keyboard div #blackKey5");
    const chordEl12 = document.querySelector("#keyboard div #whiteKey7");
    const chordElList = [
      chordEl1,
      chordEl2,
      chordEl3,
      chordEl4,
      chordEl5,
      chordEl6,
      chordEl7,
      chordEl8,
      chordEl9,
      chordEl10,
      chordEl11,
      chordEl12,
    ];
    return chordElList;
  }

  dispChordStar(chordArr, chordDuration, withRotate) {
    const baseSize = this.getBaseSize() * 0.6;
    const sw = Math.ceil(baseSize * this.racio_width);
    const sh = Math.ceil(baseSize * this.racio_height);
    let styleAnimate = `animation: chordStarKeysAnimate ${chordDuration / 1000}s`;
    if (withRotate === true) {
      styleAnimate += `, chordStarKeysRotate ${chordDuration / 1000}s`;
    }
    styleAnimate += `;`;
    const style = styleAnimate
      + `width: ${sw}px;`
      + `height: ${sh}px;`
      + "opacity: 1.0;"
      ;
    this.getChordElList().forEach((e, i) => {
      e.replaceChildren();
      if (chordArr.includes(i + 1)) {
        const starEl = this.createStarSvg(
          chordStarColorList[
            (Math.floor(Math.random() * 10) + 1) % 4
          ],
          (Math.floor(Math.random() * 10) + 1) % 2 == 0
        );
        starEl.setAttribute("style", style);
        e.appendChild(starEl);
      }
    });
  }

  hideChordStar() {
    this.getChordElList().forEach((e) => {
      e.replaceChildren();
    });
  }

}
