let currentsong = new Audio();
let songs;

const playlists = {
    "Gym":[
        "songs/Gym/Andaaz-e-Karam(KoshalWorld.Com).mp3",
        "songs/Gym/Bairan - djworld.mp3",
        "songs/Gym/Chahun-Main-Ya-Naa(KoshalWorld.Com).mp3"
    ],
    "Liked Songs":[
        "songs/Liked Songs/Kali-Kali-Zulfon.mp3"
    ],
    "Qawallis":[
        "songs/Qawallis/Pal Pal(KoshalWorld.Com).mp3"
    ],
    "Romantic":[
        "songs/Romantic/Samjhawan-(SambalpuriStar.In).mp3",
        "songs/Romantic/Sanson Ki Mala Pe(KoshalWorld.Com).mp3"
    ],
    "Varad":[
        "songs/Varad/Sheesha(KoshalWorld.Com).mp3"
    ]
};



function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}





const playmusic = (track , pause=false)=>{
    currentsong.src = track;
    if(!pause){
    currentsong.play();
}
    play.src="pause.svg";
    document.querySelector(".songinfo").innerHTML =
    decodeURIComponent(track)
        .split(/[/\\]/)
        .pop()
        .replace(".mp3","")
        .replace("(KoshalWorld.Com)","")
        .replace("(SambalpuriStar.In)","");
    document.querySelector(".songtime").innerHTML="00:00 / 00:00";
}



async function main(){
createPlaylistCards();
Array.from(
    document.querySelectorAll(".card")
).forEach(card=>{
    card.addEventListener("click",()=>{
        loadPlaylist(
            card.dataset.playlist
        );
    });
});

loadPlaylist("Gym");




//attach event listener to play , next and previous 
play.addEventListener("click",()=>{
    if(currentsong.paused){
        currentsong.play();
        play.src="pause.svg";
    }
    else{
        currentsong.pause();
        play.src="play.svg";
    };
})

  
 currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    })


currentsong.addEventListener("ended", () => {
    next.click();
});

document.querySelector(".seekbar").addEventListener("click", e => {
    let percent =
        (e.offsetX / e.target.getBoundingClientRect().width) * 100;

    document.querySelector(".circle").style.left = percent + "%";


currentsong.currentTime =
        (currentsong.duration * percent) / 100;
});


document.querySelector(".hamburger").addEventListener("click" ,()=>{
    document.querySelector(".left").style.left="0";
})


document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left="-120%";
})


prev.addEventListener("click" , ()=>{
    let track =
    decodeURIComponent(currentsong.src)
    .split("/")
    .slice(-1)[0];
    let idx = songs.findIndex(song =>
        decodeURIComponent(song)
        .includes(track)
    );
    if(idx > 0){
        playmusic(songs[idx-1]);
    }
})



next.addEventListener("click" , ()=>{
    let track =
    decodeURIComponent(currentsong.src)
    .split("/")
    .slice(-1)[0];
    let idx = songs.findIndex(song =>
        decodeURIComponent(song)
        .includes(track)
    );
    if(idx < songs.length-1){
        playmusic(songs[idx+1]);
    }
})


document.querySelector(".volume input").addEventListener("input", (e)=>{
    currentsong.volume = e.target.value / 100;
})


document.querySelector(".volume img").addEventListener("click" , ()=>{
    if(currentsong.volume!=0){
        currentsong.volume=0;
        document.querySelector(".volume input").value=0;
    }
    else{
        currentsong.volume=1;
        document.querySelector(".volume input").value=100;
    }
})
}


function createPlaylistCards(){
    let cover="goodhits.svg";
    let cardContainer =
    document.querySelector(".cardcontainer");
    cardContainer.innerHTML = "";
    for(let playlist in playlists){
        if(playlist==="Gym") cover="gym.svg";
        else if(playlist==="Liked Songs") cover="heart.svg";
        else if(playlist==="Qawallis") cover="qawali.jpg";
        else if(playlist==="Romantic") cover="romantic.jpg";
        else cover="varad.jpeg";
        cardContainer.innerHTML += `
        <div class="card"
             data-playlist="${playlist}">
            <div class="play">
                <img src="playbutton.svg" alt="">
            </div>
            <img src=${cover} alt="">
            <h2>${playlist}</h2>
            <p>${playlist} Collection</p>
        </div>`;
    }
}



function loadPlaylist(playlistName){
    songs = playlists[playlistName];
    let songul =
    document.querySelector(".songlist ul");
    songul.innerHTML = "";
    for(const song of songs){
        let songName =
        decodeURIComponent(song)
        .split("/")
        .pop()
        .replace(".mp3","")
        .replace("(KoshalWorld.Com)","")
        .replace("(SambalpuriStar.In)","");
        songul.innerHTML += `
        <li>
            <img width="25"
                 src="music.svg" alt="">
            <div class="info">
                <div>${songName}</div>
               
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img width="25"
                     src="play.svg" alt="">
            </div>
        </li>`;
    }

    Array.from(
        document.querySelector(".songlist")
        .getElementsByTagName("li")
    ).forEach((e,index)=>{
        e.addEventListener("click",()=>{
            playmusic(songs[index]);
        })
    })
}
main();
