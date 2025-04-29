console.log('Initializing Musify...');
let currentSong = new Audio(); // Create a new Audio object for the current song
let songs = []; // Initialize an empty array for storing song names
let currFolder = null; // This will hold the current folder name (playlist/album)

// Convert seconds to MM:SS format
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00"; // Return "00:00" if the seconds are invalid
    }
    //using const to declare variable  as we dont want to reassign 
    const minutes = Math.floor(seconds / 60); // Calculate minutes
    const remainingSeconds = Math.floor(seconds % 60); // Calculate remaining seconds
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`; // Return formatted time
    //convert to string as .padStarrt() method is available in strings.
    //This method is used to ensure that both the minutes and remainingSeconds are always at least two digits.
    //For example, if minutes = 5, String(5).padStart(2, '0') would return '05'.
}

// Fetch and display songs in the library section
async function getSongs(folder) {
    console.log(`Fetching songs from folder: ${folder}`); // Log the folder being fetched
    currFolder = folder; // Set the current folder
    try {
        // Fetch the directory content of the folder
        let response = await fetch(`${folder}/`);//response variable fetches everything from folder
        if (!response.ok) {
            console.error(`Error fetching folder: ${folder}. Status: ${response.status}`);
            return [];
        }

        let directoryHTML = await response.text(); // Get the HTML content of the folder
        let div = document.createElement("div");
        div.innerHTML = directoryHTML;

        let anchors = div.getElementsByTagName("a"); // Get all anchor tags in the folder
        songs = []; // Reset the songs array
        for (let anchor of anchors) {
            if (anchor.href.endsWith(".mp3")) {
                let songName = anchor.href.split(`/${folder}/`)[1]; // Extract song name from the URL
                songs.push(songName); // Add the song to the songs array
            }
        }

        if (songs.length === 0) {
            console.warn("No songs found in folder:", folder); // Warn if no songs found
        }

        // Update the library section dynamically with the fetched songs
        updateLibrary(songs);
    } catch (error) {
        console.error(`Error fetching songs for folder: ${folder}`, error); // Log error if fetching fails
    }
    return songs; // Return the array of songs
}

// Update the library section with the list of songs
function updateLibrary(songs) {
    console.log("Updating library with songs:", songs); // Log the songs being added to the library
    let songUL = document.querySelector(".songList ul");
    if (!songUL) {
        console.error("Library element (.songList ul) not found in the DOM.");
        return;
    }
    songUL.innerHTML = ""; // Clear existing songs in the list
    for (const song of songs) {
        // Remove the ".mp3" extension from the song name for display
        let songNameWithoutExtension = song.replace(".mp3", "");

        songUL.innerHTML += `
            <li>
                <img width="34" src="img/music.svg" alt="">
                <div class="info">
                    <div>${decodeURIComponent(songNameWithoutExtension.replaceAll("%20", " "))}</div>
                    <div>Musify</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="img/play.svg" alt="">
                </div>
                <div class="download">
                    <a href="/${currFolder}/${song}" download="${song}">
                        <img src="img/download.svg" alt="Download">
                    </a>
                </div>
            </li>`;
    }

    // Add click event listeners for each song in the updated list
    Array.from(songUL.getElementsByTagName("li")).forEach((e, index) => {
        e.addEventListener("click", () => playMusic(songs[index])); // When a song is clicked, play it
    });
}

// Play the selected song
function playMusic(track, pause = false) {
    console.log(`Playing music: ${track}`); // Log the song being played
    currentSong.src = `${currFolder}/` + track; // Set the audio source to the selected song
    if (!pause) {
        currentSong.play(); // Play the song if it's not paused
        document.getElementById("play").src = "img/pause.svg"; // Change the play button to pause
    }

    // Remove ".mp3" extension and update the playbar with the song name
    let songNameWithoutExtension = track.replace(".mp3", "");
    document.querySelector(".songinfo").innerHTML = decodeURIComponent(songNameWithoutExtension);

    // Initialize the song time display as "00:00 / 00:00"
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

// Fetch and display available playlists (albums)
async function displayAlbums() {
    console.log("Fetching and displaying albums..."); // Log fetching albums
    try {
        // Fetch the albums list
        let response = await fetch(`songs/`);
        if (!response.ok) {
            console.error(`Error fetching albums. Status: ${response.status}`);
            return;
        }

        let directoryHTML = await response.text(); // Get the HTML content of albums
        let div = document.createElement("div");
        div.innerHTML = directoryHTML;

        let anchors = div.getElementsByTagName("a"); // Get all anchor tags pointing to albums
        let cardContainers = document.querySelectorAll(".cardContainer"); // Select all card containers

        if (cardContainers.length === 0) {
            console.error("No .cardContainer elements found in the DOM.");
            return;
        }

        // Loop over each card container
        cardContainers.forEach(cardContainer => {
            for (let anchor of anchors) {
                // If the anchor points to a valid album folder
                if (anchor.href.includes("songs") && !anchor.href.includes(".htaccess")) {
                    let folder = anchor.href.split("/").slice(-2)[0]; // Get folder name
                    cardContainer.innerHTML += `<div class="play">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round" />
                                </svg>
                            </div>`;
                }
            }
        });

        // Add click event listeners for album cards
        Array.from(document.getElementsByClassName("card")).forEach(e => {
            e.addEventListener("click", async (item) => {
                let folder = item.currentTarget.dataset.folder; // Get folder from the data attribute
                console.log(`Fetching songs for playlist: ${folder}`);
                songs = await getSongs(`songs/${folder}`); // Fetch songs for the clicked playlist
                if (songs.length > 0) {
                    updateLibrary(songs); // Update the library with songs from the clicked album
                    playMusic(songs[0]); // Auto-play the first song of the selected playlist
                }
            });
        });

    } catch (error) {
        console.error("Error displaying albums:", error); // Log error if displaying albums fails
    }
}


// Main function to initialize the app
async function main() {
    await getSongs("songs/30toddlersongs"); // Fetch songs from a default playlist
    if (songs.length > 0) playMusic(songs[0], true); // Auto-play the first song if songs are available

    await displayAlbums(); // Display albums (playlists)

    // Player controls - Play/Pause toggle
    document.getElementById("play").addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play(); // Play the song if it's paused
            document.getElementById("play").src = "img/pause.svg"; // Change play button to pause
        } else {
            currentSong.pause(); // Pause the song if it's playing
            document.getElementById("play").src = "img/play.svg"; // Change pause button to play
        }
    });

    // Update song time on timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Event listener for when the song ends
    currentSong.addEventListener("ended", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if (index + 1 < songs.length) {
            playMusic(songs[index + 1]); // If it's not the last song, play the next one
        } else {
            currentSong.pause(); // Pause the song if it's the last song
            document.getElementById("play").src = "img/play.svg"; // Reset play button
        }
    });

    // Seekbar functionality
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%"; // Move the circle indicator
        currentSong.currentTime = ((currentSong.duration) * percent) / 100; // Set the current time based on the click position
    });

    // Hamburger menu toggle for the left side menu
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"; // Show the left menu
    });

    // Close the left menu when the close button is clicked
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"; // Hide the left menu
    });

    // Previous and Next song functionality
    previous.addEventListener("click", () => {
        currentSong.pause(); // Pause the current song
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]); // Play the previous song
        }
    });

    next.addEventListener("click", () => {
        currentSong.pause(); // Pause the current song
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]); // Play the next song
        }
    });

    // Volume control functionality
    document.querySelector(".range input").addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100; // Set the volume based on the slider value
        document.querySelector(".volume p").innerText = currentSong.volume * 100 + "%"; // Display the current volume percentage
    });

}

// Run the main function
main(); 
