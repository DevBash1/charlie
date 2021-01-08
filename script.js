function byId(id){
  return document.getElementById(id);
}

function set(key, data) {
    return localStorage.setItem(key, data);
}
function get(key) {
    return localStorage.getItem(key);
}
function clear(key) {
    localStorage.clear(key);
}

function page(id){
  var pages = ["page1","page2"];
  pages.forEach(function(page){
      byId(page).style.display = "none";
  })
  byId(id).style.display = "block";
  anime({
      targets: '#' + id,
      duration:500,
      delay:0,
      translateX:[360,0],
      loop:false,
      easing: 'linear',
      direction: 'alternate',
  });
}

var tapanime = anime({
  targets: '.tapIt',
  opacity: ['0%', '100%'],
  duration: 1500,
  direction: 'alternate',
  easing: 'easeInOutSine',
  loop: true,
  autoplay: true,
});

var song = new Audio("https://soundimage.org/wp-content/uploads/2017/11/Bells-of-Weirdness.mp3");

byId("page1").onclick = function(){
  var aud = new Audio("http://soundbible.com/mp3/Evil_Laugh_Male_6-Himan-1359990674.mp3");
  aud.play();
  song.loop = true;
  tapanime.pause();
  setTimeout(function(){
    page("page2");
    song.play();
  },3000);
}

if(get("quest") == undefined){
    set("quest","are you there");
    set("ans","yes");
}

var recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-NG';
recognition.interimResults = false;
recognition.maxAlternatives = 10;

var mic = document.querySelector('#mic');
var speak = document.querySelector('#speak');

function rec(){
  try{
    recognition.start();
    song.pause();
  }catch(e){
    console.log("already listening...")
  }
}

recognition.onspeechstart = function(event){
  mic.style.backgroundColor = "orange";
}

recognition.onspeechend = function(event){
  mic.style.backgroundColor = "green";
}

recognition.onend = function(event){
  rec();
}

recognition.onerror = function(event){
  if(event.error == "network"){
    speak.innerText = "No Internet Connection";
  }
}

recognition.onstart = function(event){
  mic.style.backgroundColor = "green";
}

recognition.onresult = function(event) {
  var speech = event.results[0][0].transcript;
  said(speech);
}



function said(text){
  if(text == "gift"){
    speak.innerText = "Sam Loves you";
  }
  if(text.toLowerCase().startsWith("charlie charlie")){
    var quest = text.substring(16);
    if(quest.split(" ").includes("bye") || quest.split(" ").includes("buy")){
      none();
      speak.innerText = "Nice Playing";
      return false;
    }
    var starts = ["is","am","do","are","can","will","would","should"];
      if(starts.includes(quest.split(" ")[0])){
          speak.innerText = text + "?";
          if(quest.split(" ")[1].toLowerCase() == "you"){
            if(quest.toLowerCase() == "are you there" || quest.toLowerCase() == "are you here"){
              yes();
            }else{
              any();
            }
          }else{
            any();
          }
      }else{
        speak.innerText = "Made by Dev Bash";
      }
  }
}

function rand(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var time = rand(10000,20000);

function no(){
  var pencil = byId("pencil1");
  var act = rand(240,310);
  anime({
    targets: '#pencil1',
    duration:time,
    rotate: act
  });
}

function yes(){
  var pencil = byId("pencil1");
  var act = rand(158,220);
  anime({
    targets: '#pencil1',
    duration:time,
    rotate: act
  });
}

function none(){
  var pencil = byId("pencil1");
  anime({
    targets: '#pencil1',
    duration:time,
    rotate: 234
  });
}

function any(){
  var act = rand(0,1);
  var arr = ["yes","no"];
  eval(arr[act] + "()");
}

function link(link){
  document.location.href = link;
}






