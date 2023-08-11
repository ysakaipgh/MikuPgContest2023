import { StarObject } from "./starObject.js"

const star = new StarObject();
  
const num = 50; // パーティクルの数
const wrap = document.querySelector(".small-star");
const wrapHeight = wrap.offsetHeight;

export class BackgroundObject {
  withRotate = true;
  arrFunc = [];
  
  constructor(isRotate) {
    wrap.textContent = "";
    this.withRotate = isRotate;
  }

  /**
   * 乱数を返す関数(min以上max未満)
   *
   * @param {*} min 
   * @param {*} max 
   * @returns 
   */
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  createObject() {
    // 要素を複製
    for (let i = 0; i < num; i++){
      const target = document.createElement("target");
      target.appendChild(star.createSmallStarSvg());
      target.className = "item small-star-obj";
      wrap.appendChild(target);
    }
    
    // 要素毎にアニメーションを設定する
    document.querySelectorAll(".small-star-obj").forEach((item) => {
      item.style.left = `${this.getRandom(0, 94)}%`; // 左端からの距離
      item.style.width = `${this.getRandom(4, 8)}%`; // 横幅
    
      // アニメーション（移動）
      const transY = wrapHeight / item.offsetHeight * 100;
      const randX = this.getRandom(0, 360);
      const randY = this.getRandom(0, 360);
      const randZ = this.getRandom(0, 360);
      const rand3d = this.getRandom(0, 20);
      const rotate3d = `${randX}, ${randY}, ${randZ}, ${rand3d}turn`;
      const func01 = this.withRotate === true ? item.animate(
        [
          {transform: "translateY(100%) rotateY(0)"},
          {transform: `translateY(${transY}%) rotate3d(${rotate3d})`},
        ], {
          duration: this.getRandom(20000, 40000), // ミリ秒
          iterations: Infinity, // 繰り返し回数
          delay: - this.getRandom(20000, 40000) // iterationStartの代用
        }
      ) : item.animate(
        [
          {transform: "translateY(100%)"},
          {transform: `translateY(${transY}%)`},
        ], {
          duration: this.getRandom(20000, 40000), // ミリ秒
          iterations: Infinity, // 繰り返し回数
          delay: - this.getRandom(20000, 40000) // iterationStartの代用
        }
      );
    
      // アニメーション（透明度）
      const func02 = item.animate(
        [
          {opacity: 0.0},
          {opacity: 0.3},
          {opacity: 0.0},
        ], {
          duration: this.getRandom(5000, 7500), // ミリ秒
          iterations: Infinity, // 繰り返し回数
          delay: - this.getRandom(5000, 7500),
        }
      );
    
      // アニメーション（色）
      const svg = item.firstElementChild;
      const h1 = this.getRandom(0, 180); // 色相1
      const h2 = this.getRandom(180, 360); // 色相2
      const s = 60; // 彩度
      const l = this.getRandom(40, 60); // 輝度
      const hsl1 = `hsl(${h1}deg, ${s}%, ${l}%)`;
      const hsl2 = `hsl(${h2}deg, ${s}%, ${l}%)`;
      const shadow1 = `drop-shadow(0px 0px 5px ${hsl1})`;
      const shadow2 = `drop-shadow(0px 0px 5px ${hsl2})`;
    
      const func03 = svg.animate(
        [
          {fill: hsl1, filter : shadow1},
          {fill: hsl1, filter : shadow1, offset: 0.45},
          {fill: hsl2, filter : shadow2, offset: 0.50},
          {fill: hsl2, filter : shadow2, offset: 0.95},
          {fill: hsl1, filter : shadow1},
        ], {
          duration: 10000, // ミリ秒
          iterations: Infinity, // 繰り返し回数
        }
      );
    
      this.arrFunc.push(func01, func02, func03);
    });
  }
  
  /**
   * 見えている時だけ動かす
   *
   * @param {*} e 
   */
  switching(e) {
    if (e[0].isIntersecting) {
      // 見えてる時
      this.arrFunc.forEach((func) => {
        func.play();
      });
    } else {
      // 見えてない時
      this.arrFunc.forEach((func) => {
        func.pause();
      });
    }
  }
  
  /**
   * 見えているかどうか
   * ※Intersection Observer API
   */
  createBackgroundStars() {
    this.createObject();
    let observer;
    const options = {root: null, rootMargin: "0%", threshold: 0};
    observer = new IntersectionObserver(this.switching, options); // コールバック関数とオプションを渡す
    observer.observe(wrap); // 要素の監視を開始
  }
}
