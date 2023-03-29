// Elements
const musicPlayer = document.querySelector('.widget')
const playButton = document.querySelector('#play')
const prevButton = document.querySelector('#prev')
const nextButton = document.querySelector('#next')
const audio = document.querySelector('#song')
const progressBar = document.querySelector('.progress-bar')
const progress = document.querySelector('.progress')
const songTitle = document.querySelector('.song-title')
const covertArt = document.querySelector('#cover-art')


// Song titles
const songAlbum = ['hey', 'summer', 'ukulele']
let songIndex = 1 // ukulele

// Load a default song 
loadSong(songAlbum[songIndex])

// Event listeners
// musicPlayer.addEventListener('click', currentState())

playButton.addEventListener(
    'click',
    () => {
        const isPlaying = musicPlayer.classList.contains('play')
        if(isPlaying){
            pauseSong()
        }
        else{
            playSong()
        }
    }
)

nextButton.addEventListener('click', nextSong)
prevButton.addEventListener('click', prevSong)
audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('ended', nextSong)
progressBar.addEventListener('click', setProgress)


// Helper functions
function loadSong(songName){
    songTitle.innerHTML = songName
    audio.src = `music/${songName}.mp3`
    let audioDuration = audio.duration
    covertArt.src = `images/${songName}.jpg`
    pauseSong()
    // playSong()
}

function pauseSong(){
    musicPlayer.classList.remove('play')
    playButton.innerHTML = '<i class="fas fa-play"></i>'
    audio.pause()
}

function playSong(){
    musicPlayer.classList.add('play')
    playButton.innerHTML = '<i class="fas fa-pause"></i>'
    audio.play()
}

function nextSong(){
    console.log("Next song")
    if(songIndex ==  songAlbum.length - 1){
        songIndex = 0
    }
    else{
        songIndex++
    }
    loadSong(songAlbum[songIndex])
    playSong()
}

function prevSong(){
    console.log("Previous song")
    if(songIndex == 0){
        songIndex = songAlbum.length - 1
    }
    else{
        songIndex--
    }
    loadSong(songAlbum[songIndex])
    playSong()
}

function updateProgress(event){
    let currTime = audio.currentTime
    let totalDur = audio.duration
    let progPercentage = (currTime/totalDur)*100
    progress.style.width = `${progPercentage}%`
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    let progPercentage = clickX/width
    const duration = audio.duration
    audio.currentTime = progPercentage*duration
    progress.style.width = `${progPercentage*100}%`
}

