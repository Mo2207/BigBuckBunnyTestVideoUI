// VARIABLES:
const input = document.getElementById("searchbar");
const playBtn = document.getElementById("playBtn");
const video = document.getElementById("video");
const muteBtn = document.getElementById("muteBtn");
const controls = document.getElementById("controls");
const time = document.getElementById("duration");
const volume = document.getElementById("volumeRange");
const output = document.getElementById("output");
const screen = document.getElementById("fullscreenIcon");
const forward = document.getElementById("forward");
const rewind = document.getElementById("rewind");
const videoSlider = document.getElementById("videoSlider");


// FUNCTIONS:

//toggles play/pause
const togglePlayPause = () => {
    if (video.paused) {
        playBtn.src="images/pause_white_24dp.svg";
        video.play();
        // initializes slider value with video length
        videoSlider.max = video.duration;
        // starts the timer of the video length
        setInterval(updateTime,100);
        toggleControls();
    } else {
        playBtn.src="images/play_arrow_white_24dp.svg";
        video.pause();
        toggleControls();
    }
};

// toggles mute/unmute
const toggleMute = () => {
    if (!video.muted) {
        muteBtn.src="images/volume_off_white_24dp.svg";
        video.muted = true;
        // overwrites volume slider and volume percentage while muted to equal 0
        volume.value = 0;
        output.innerHTML = "0%";
    } else {
        // currentIcon from volumeControls() to remember the previous icon setting
        muteBtn.src= currentIcon;
        video.muted = false;

        // session storage to recall previous volume slider level
        volume.value = sessionStorage.getItem("sessionSlider");
        // session storage to recall previous volume percentage
        output.innerHTML = sessionStorage.getItem("sessionVolume");
        
    } 
};

// updates the current time of the video
const updateTime = () => {
    duration.innerHTML = `${humanTime(video.currentTime)}/${humanTime(video.duration)}`;

    // sets the video slider value to match the current video timeframe
    videoSlider.value = video.currentTime;
};

// video slider function
const timeSlider = () => {
    video.currentTime = videoSlider.value;
};

// translates the current time to readable format
const humanTime = (time) => {
    let hrs = (time / 3600);
    let mins = ((time % 3600) / 60);
    let secs = (time % 60);

    // readable format stored in minSecs
    let minSecs = `${Math.floor(mins)}:${Math.round(secs) < 10 ? "0":""}${Math.round(secs)}`;

    // determines if video is an hour or more and displays accordingly
    if (hrs > 1) {
        return `${hrs}:${minSecs}`;
    } else {
        return minSecs;
    } 
};

// toggles the controls overlay
let timeOut;
const toggleControls = () => {
    if (video.paused) {
        // console.log("timer not started")
        clearTimeout(timeOut);
        controls.style.visibility= "visible";
    } else if (!video.paused) {
        // console.log("timer started");
        // clearing timeOut restarts the 5 second timer everytime the mouse moves
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            controls.style.visibility= "hidden";
        }, 5000);
    }
};


// volume controls 
output.innerHTML = `${volume.value}%`;
let currentIcon;
const volumeControls = () => {
    output.innerHTML = `${volume.value}%`;

    // divides volume.value by 100 to fit between 0 and 1 for the volume method
    video.volume = volume.value / 100;

    // sets session storage to remember current volume
    sessionStorage.setItem("sessionVolume", `${volume.value}%`);
    sessionStorage.setItem("sessionSlider", volume.value);

    // makes sure if volume slider is above 0 the video will never be muted
    if (volume.value > 0) {
        video.muted = false;
    }
    // sets the icon value depending on the volume level
    if (volume.value == 0) {
        muteBtn.src="images/volume_off_white_24dp.svg";
        currentIcon = "images/volume_off_white_24dp.svg";
    } else if (volume.value > 0 && volume.value <= 50) {
        muteBtn.src="images/volume_down_white_24dp.svg";
        currentIcon = "images/volume_down_white_24dp.svg";
    } else {
        muteBtn.src="images/volume_up_white_24dp.svg";
        currentIcon = "images/volume_up_white_24dp.svg";
    }
};

// fullscreen function
const openFullscreen = () => {
    video.requestFullscreen();
};


// EVENT LISTENERS:

// keeps video controls visible while video paused
video.addEventListener('pause', () => {
    toggleControls();
});

// toggles play/pause on the screen
video.addEventListener('click', () => {
    togglePlayPause();
});

video.addEventListener('mousemove', () => {
    toggleControls();
});

// toggles play/pause on the button
playBtn.addEventListener('click', () => {
    togglePlayPause();
});

// toggles mute/unmute on the button
muteBtn.addEventListener('click', () => {
    toggleMute();
});

// volume controls
volume.addEventListener('input', () => {
    // console.log("input detected");
    volumeControls();
    // prevents controls overlay from disappearing while adjusting volume
    clearTimeout(timeOut);
    toggleControls();
});

screen.addEventListener('click', () => {
    openFullscreen();
});

videoSlider.addEventListener('input', () => {
    timeSlider();
});

// skips 10 seconds forwards/backwards
forward.addEventListener('click', () => {
    video.currentTime += 10;
});
rewind.addEventListener('click', () => {
    video.currentTime -= 10;
});

















