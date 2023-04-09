# `Details`要素でアコーディオンしたい!!

## はじめに

たかがアコーディオンメニューのために`jQuery`使いたくない。  
そもそも何の要素で作ればいいの？  
`detailas`要素を使えば HTML だけでアコーディオンできるらしいという情報を手に入れたので、使ってみました。

---

## HTML

```html
<details class="js-unwrapit_details" data-processing="">
  <summary class="js-unwrapit_summary">ここをクリック</summary>
  <div class="content-outer">
    <div class="content">ここに開閉されるコンテンツ</div>
  </div>
</details>
```

---

## CSS

```scss
// detailsのスタイル
.js-unwrapit_details {
  overflow: hidden; // アニメーションの不自然さを消すのに必要
  user-select: none; // 連打対策のデバッグで邪魔だったから
}

// summaryのスタイル
.js-unwrapit_summary {
  display: block; // summary要素のデフォルト三角マークを消す
  &::-webkit-details-marker {
    display: none; // iOS版Safariの三角マークも消す
  }
}

// 開閉されるコンテンツのスタイル
.content-outer {
  // 実際にコンテンツを書くところはもうひとつ下の階層、ここには何も書かないので実際はいらない
  .content {
    // 実際のコンテンツを書く
  }
}
```

---

## JavaScript

```javascript
const accordion = new Unwrapit(
  ".js-unwrapit_details",
  ".js-unwrapit_summary",
  singleOpen: 初期値はfalse、ひとつだけひらくパターンはtrue,
  options: `duration`や`opacity`、`WebAnimationAPI`の`animate`メソッドの第三引数に渡すパラメータ);
```
