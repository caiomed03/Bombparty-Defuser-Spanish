
function getSyllable() {
  var syllable = document.getElementsByClassName("syllable")[0].innerHTML;
  return syllable;
}

function giveHint() {
  currentSyllable = getSyllable();
  var potentialWords = [];
  if(currentSyllable != lastSyllable) {
    var word = "Can't find matching word!";
    for (var j = 0; j < dictionary.length; j++) {
      if (dictionary[j].toLowerCase().includes(currentSyllable)){
        potentialWords.push(dictionary[j]);
      }
    }
    //parseInt(Math.random() * (potentialWords.length - 1))
    word = potentialWords[parseInt(Math.random() * (potentialWords.length - 1))];
    document.getElementById("hintHolder").innerText = "     Word is: " + word;
    lastSyllable = currentSyllable;
  }
}

function main() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      var syllable = document.getElementsByClassName("syllable")[0], syllableExists;
      if(typeof(syllable) == 'undefined' && syllable == null){
        syllableExists = false;
      } else {
        syllableExists = true;
      }
      if(syllableExists){
        const syllable = getSyllable(), top = document.querySelector('.quickRules');
        if(document.getElementById("hintHolder") == null){
          var hintHolder = document.createElement("p");
          hintHolder.id = "hintHolder";
          top.append(hintHolder);
        }
        if (request.greeting === "toggle") {
          toggle = !toggle;
          if(toggle){
            sendResponse({farewell: "Toggled On"});
            hintInterval = setInterval(giveHint, 500);
          } else {
            sendResponse({farewell: "Toggled Off"});
            clearInterval(hintInterval);
            document.getElementById("hintHolder").innerText = "";
          }
        }
      }
    }
  );
}

var hintInterval, toggle = false, currentSyllable, lastSyllable;

window.addEventListener("load", function () {
  main();
});