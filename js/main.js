const musicContainer = document.querySelector('.music-container')
const progressContainer = document.querySelector('.progress-container')
const progress = document.querySelector('.progress')
const btnPlay = document.getElementById('play')
const btnPrev = document.getElementById('prev')
const btnNext = document.getElementById('next')

const title = document.getElementById('title')
const audioSong = document.getElementById('audio')
const cover = document.getElementById('cover')
const volume = document.getElementById('volume')

// File names of audio songs
const songsArray = ['Chemical Brothers - The Devil Is In The Beats', 'Jason Derulo Feat Snoop Dogg - Wiggle (Onderkoffer Remix)', 'Jay Z - Dirt Off Your Shoulder (Brillz & Z Trip Remix)']

// Keep track of song
let songIndex = 0

// Load song details into DOM
loadSong(songsArray[songIndex])

// Update song details
function loadSong(song) {
    title.innerText = song

    audioSong.src = `audio/${song}.mp3`
    cover.src = `img/${song}.jpg`
}

// PLAY SONG
function playSong() {
    musicContainer.classList.add('play')
    btnPlay.querySelector('i.fas').classList.remove('fa-play')
    btnPlay.querySelector('i.fas').classList.add('fa-pause')
    audioSong.play()
}

// PAUSE SONG
function pauseSong() {
    musicContainer.classList.remove('play')
    btnPlay.querySelector('i.fas').classList.add('fa-play')
    btnPlay.querySelector('i.fas').classList.remove('fa-pause')
    audioSong.pause()
}

// PREVIOUS SONG
function prevSong() {
    songIndex--

    if (songIndex < 0) {
        songIndex = songsArray.length - 1
    }
    // console.log(songIndex)
    loadSong(songsArray[songIndex])
    playSong()
}

// NEXT SONG
function nextSong() {
    songIndex++

    if (songIndex > songsArray.length - 1) {
        songIndex = 0
    }

    // console.log(songIndex)
    loadSong(songsArray[songIndex])
    playSong()
}

// UPDATE PROGRESS BAR
function updateProgress(e) {
    // destructure duration and current time from srcElement
    const { duration, currentTime } = e.srcElement
    // console.log(duration, currentTime)

    // set progress percent
    const progressPercent = (currentTime / duration) * 100
    // console.log(progressPercent)

    // add width of progress bar as progress percent
    progress.style.width = `${progressPercent}%`
}

// SET PROGRESS BAR ON CLICK
function setProgress(e) {
    // get width of progress bar
    const width = this.getBoundingClientRect().width
    // console.log(width)

    // get mouse click position in progress bar
    const clickX = e.offsetX
    // console.log(clickX)

    // get duration of song
    const duration = audioSong.duration

    // set currentTime to mouse click position divided by total width of progress bar, and multiplied by duration of song
    audioSong.currentTime = (clickX / width) * duration
}

// EVENT LISTENERS
btnPlay.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// CHANGE VOLUME
function changeVolume() {
    // console.log(volume.value)
    audioSong.volume = volume.value
}
// call immediately so volume is 0.5 (set in HTML) at load of the page
changeVolume()

// NEXT AND PREVIOUS BUTTONS
btnPrev.addEventListener('click', prevSong)
btnNext.addEventListener('click', nextSong)

// TIME SONG UPDATE
audioSong.addEventListener('timeupdate', updateProgress)

// CLICK ON PROGRESS BAR
progressContainer.addEventListener('click', setProgress)

//WHEN SONG ENDS, PLAY NEXT SONG
audioSong.addEventListener('ended', nextSong)

// AUDIO VOLUME
volume.addEventListener('change', changeVolume)