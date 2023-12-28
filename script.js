console.log("Welcome to spotify");

let songIndex = 0;
let audioElement = new Audio('songs/A_Different_Way.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

//song list
let songs = [
    {songName: "DJ Snake- A Different Way", filePath: "songs/A_Different_Way.mp3", coverPath: "covers/adifferentway.jpg" },
    {songName: "The Chainsmokers- All We Know", filePath: "songs/All_We_Know.mp3", coverPath: "covers/allweknow.jpeg" },
    {songName: "The Chainsmokers- Closer", filePath: "songs/Closer - The Chainsmokers (DJJOhAL.Com) (1).mp3", coverPath: "covers/CLOSER.jpg" },
    {songName: "Charlie Puth- Attention", filePath: "songs/Charlie Puth - Attention - MP3 320.mp3", coverPath: "covers/attention.png" },
    {songName: "Charlie Puth- We Don't Talk Anymore", filePath: "songs/Charlie Puth - We Dont Talk Anymore (feat. Selena Gomez) - 1.mp3", coverPath: "covers/wedonttalkanymore.jpg" },
    {songName: "Lauv- I Like Me Better", filePath: "songs/I_Like_Me_Better.mp3", coverPath: "covers/ILikeMeBetter.png" },
    {songName: "Katy Perry- Harleys In Hawai", filePath: "songs/Katy Perry - Harleys In Hawaii (Official).mp3", coverPath: "covers/katy.jpeg" },
    {songName: "Trevor Daniel- Past Life", filePath: "songs/Trevor Daniel, Selena Gomez - Past Life (Official Video).mp3", coverPath: "covers/selena.jpeg" },
    {songName: "Swae Lee- Sunflower", filePath: "songs/Sunflower_(Spider-Man__Into_the_Spider-Verse).mp3", coverPath: "covers/spider.jpeg" },
    {songName: "One Direction- Night Changes", filePath: "songs/Night_Changes.mp3", coverPath: "covers/nightchanges.jpeg" },
    {songName: "Zayn- Dusk Till Dawn", filePath: "songs/Dusk_Till_Dawn_-_ZAYN_ft._Sia.mp3", coverPath: "covers/dusktilldawn.jpeg" },
    {songName: "Maroon 5- Memories", filePath: "songs/Maroon 5 - Memories.mp3", coverPath: "covers/maroon5.jpeg" }
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})


//play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


// Update the time display
const updateTimeDisplay = (timestampElement, timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timestampElement.innerText = timeString;
};

//Events Listening
audioElement.addEventListener('timeupdate', ()=>{
   // console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
   // console.log(progress);
    myProgressBar.value = progress;
    
    // Update timestamps
    updateTimeDisplay(document.getElementById('startTimestamp'), audioElement.currentTime);
    updateTimeDisplay(document.getElementById('endTimestamp'), audioElement.duration);
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;

     // Update timestamps
     updateTimeDisplay(document.getElementById('startTimestamp'), audioElement.currentTime);
     updateTimeDisplay(document.getElementById('endTimestamp'), audioElement.duration);
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        // audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})


//next button
document.getElementById('next').addEventListener('click', ()=>{
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

//previous button
document.getElementById('previous').addEventListener('click', ()=>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})



