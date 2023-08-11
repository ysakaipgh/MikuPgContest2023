export const songPermaLinkBase = "https://piapro.jp/t/";
export const musicHistoryBase1 = "https://songle.jp/songs/";
export const musicHistoryBase2 = "/history";
export const lyricHistoryBase = "https://textalive.jp/lyrics/piapro.jp%2Ft%2F";
// トークンは https://developer.textalive.jp/profile で取得したものを使う
export const myToken = process.env.TOKEN;

const songleIdKinkijack = "aed56ef19";
const songleIdIkirukoto = "a5fb8e017";
const songleIdSyoumeisha = "ac64490fb";
const songleIdNeonLight = "a82827550";
const songleIdMyutation = "a9de837e6";
const songleIdEntrust = "ab7b7ceb3";
export const contestList = [
  songleIdKinkijack,
  songleIdIkirukoto,
  songleIdSyoumeisha,
  songleIdNeonLight,
  songleIdMyutation,
  songleIdEntrust,
];

export const songleInfoList = {
  // コンテスト楽曲
  "aed56ef19": {
    labelName: "king妃jack躍 feat.初音ミク",
    labelShortName: "king妃jack躍",
    songPermaLink: "ucgN/20230110005414",
    musicHistory: 2427948,
    beatId: 4267297,
    chordId: 2405019,
    repetitiveSegmentId: 2475577,
    lyricHistory: "ucgN%2F20230110005414",
    lyricId: 56092,
    lyricDiffId: 9636,
  },
  "a5fb8e017": {
    labelName: "生きること / nogumi feat. 初音ミク",
    labelShortName: "生きること",
    songPermaLink: "fnhJ/20230131212038",
    musicHistory: 2427949,
    beatId: 4267300,
    chordId: 2405033,
    repetitiveSegmentId: 2475606,
    lyricHistory: "fnhJ%2F20230131212038",
    lyricId: 56131,
    lyricDiffId: 9638,
  },
  "ac64490fb": {
    labelName: "唱明者 / すこやか大聖堂 feat. KAITO",
    labelShortName: "唱明者",
    songPermaLink: "Vfrl/20230120182855",
    musicHistory: 2427950,
    beatId: 4267334,
    chordId: 2405059,
    repetitiveSegmentId: 2475645,
    lyricHistory: "Vfrl%2F20230120182855",
    lyricId: 56095,
    lyricDiffId: 9651,
  },
  "a82827550": {
    labelName: "ネオンライトの海を往く / Ponchi♪ feat. 初音ミク",
    labelShortName: "ネオンライトの海を往く",
    songPermaLink: "fyxI/20230203003935",
    musicHistory: 2427951,
    beatId: 4267373,
    chordId: 2405138,
    repetitiveSegmentId: 2475664,
    lyricHistory: "fyxI%2F20230203003935",
    lyricId: 56096,
    lyricDiffId: 9639,
  },
  "a9de837e6": {
    labelName: "ミュウテイション / Rin（Kuroneko Lounge） feat. 初音ミク",
    labelShortName: "ミュウテイション",
    songPermaLink: "Wk83/20230203141007",
    musicHistory: 2427952,
    beatId: 4267381,
    chordId: 2405285,
    repetitiveSegmentId: 2475676,
    lyricHistory: "Wk83%2F20230203141007",
    lyricId: 56812,
    lyricDiffId: 10668,
  },
  "ab7b7ceb3": {
    labelName: "Entrust via 39 / ikomai feat. 初音ミク",
    labelShortName: "Entrust via 39",
    songPermaLink: "Ya0_/20230201235034",
    musicHistory: 2427953,
    beatId: 4269734,
    chordId: 2405723,
    repetitiveSegmentId: 2475686,
    lyricHistory: "Ya0_%2F20230201235034",
    lyricId: 56098,
    lyricDiffId: 9643,
  },
};
