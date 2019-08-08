var infoBox; // 訊息 label
var textBox; // 最終的辨識訊息 text input
var tempBox; // 中間的辨識訊息 text input
var startStopButton; // 「辨識/停止」按鈕
var final_transcript = ''; // 最終的辨識訊息的變數
var recognizing = false; // 是否辨識中

function startButton(event) {
  infoBox = document.getElementById("infoBox"); // 取得訊息控制項 infoBox
  textBox = document.getElementById("textBox"); // 取得最終的辨識訊息控制項 textBox
  tempBox = document.getElementById("tempBox"); // 取得中間的辨識訊息控制項 tempBox
  startStopButton = document.getElementById("startStopButton"); // 取得「辨識/停止」這個按鈕控制項
  langCombo = document.getElementById("langCombo"); // 取得「辨識語言」這個選擇控制項

  if (recognizing) { // 如果正在辨識，則停止。
    recognition.stop();
  } else { // 否則就開始辨識
    textBox.value = ''; // 清除最終的辨識訊息
    tempBox.value = ''; // 清除中間的辨識訊息
    final_transcript = ''; // 最終的辨識訊息變數
    recognition.lang = langCombo.value; // 設定辨識語言
    recognition.start(); // 開始辨識
  }
}

// 如果找不到 window.webkitSpeechRecognition 這個屬性，就是不支援語音辨識，要求使用者更新瀏覽器。 
if (!('webkitSpeechRecognition' in window)) {
  infoBox.innerText = "本瀏覽器不支援語音辨識，請更換瀏覽器！(Chrome 25 版以上才支援語音辨識)";
} else {
  // 建立語音辨識物件 webkitSpeechRecognition
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true; // 設定連續辨識模式
  recognition.interimResults = true; // 設定說話時會立即辨識

  // 開始辨識
  recognition.onstart = function () {
    recognizing = true; // 設定為辨識中
    startStopButton.value = "按此停止"; // 辨識中...按鈕改為「按此停止」。  
    infoBox.innerText = "辨識中..."; // 顯示訊息為「辨識中」...
  };

  // 辨識完成
  recognition.onend = function () {
    recognizing = false; // 設定為「非辨識中」
    startStopButton.value = "開始辨識"; // 辨識完成...按鈕改為「開始辨識」。
    infoBox.innerText = ""; // 不顯示訊息
  };

  // 辨識有任何結果時
  recognition.onresult = function (event) {
    var interim_transcript = ''; // 中間結果
    for (var i = event.resultIndex; i < event.results.length; ++i) { // 對於每一個辨識結果
      if (event.results[i].isFinal) { // 如果是最終結果
        final_transcript += event.results[i][0].transcript; // 將其加入最終結果中
      } else { // 否則
        interim_transcript += event.results[i][0].transcript; // 將其加入中間結果中
      }
    }
    if (final_transcript.trim().length > 0) // 如果有最終辨識文字
      textBox.value = final_transcript; // 顯示最終辨識文字
    if (interim_transcript.trim().length > 0) // 如果有中間辨識文字
      tempBox.value = interim_transcript; // 顯示中間辨識文字
  };
}

var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({
    loop: true
  })
  .add({
    targets: '.ml3 .letter',
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 1125,
    delay: function (el, i) {
      return 75 * (i + 1)
    }
  }).add({
    targets: '.ml3',
    opacity: 0,
    duration: 500,
    easing: "easeOutExpo",
    delay: 500
  });

var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({
    loop: true
  })
  .add({
    targets: '.ml2 .letter',
    scale: [4, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: function (el, i) {
      return 70 * i;
    }
  }).add({
    targets: '.ml2',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });