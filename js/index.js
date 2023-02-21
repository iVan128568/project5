
let albums = [
    {
        name: `Revival`,
        mainArtist: `Eminem`,
        year: 2004,
        cover: `assets/albums/revival/revival.jpg`,
        color: `#ff8686`,
        choosed: false,
        songFound: false,
        songsList: [
            {
                name: `Walk on water`,
                path: `assets/albums/revival/Walk-on-water.mp3`,
                featArtists: [`Beyonce`],
                audioNode: ``,
                visualNode: ``,
                duration: ``,
                processedDuration: ``,
            },
            {
                name: `Believe`,
                path: `assets/albums/revival/Believe.mp3`,
                featArtists: [],
                audioNode: ``,
                visualNode: ``,
                duration: ``,
                processedDuration: ``,
            },
            {
                name: `Chloraseptic`,
                path: `assets/albums/revival/Chloraseptic.mp3`,
                featArtists: [`Phresher`],
                audioNode: ``,
                visualNode: ``,
                duration: ``,
                processedDuration: ``,
            },
            {
                name: `Untouchable`,
                path: `assets/albums/revival/Untouchable.mp3`,
                featArtists: [],
                audioNode: ``,
                visualNode: ``,
                duration: ``,
                processedDuration: ``,
            },
            {
                name: `River`,
                path: `assets/albums/revival/River.mp3`,
                featArtists: [`Ed Sheeran`],
                audioNode: ``,
                visualNode: ``,
                duration: ``,
                processedDuration: ``,
            },
            {
                name: `Revival (Interlude)`,
                path: `assets/albums/revival/Revival-(Interlude).mp3`,
                featArtists: [],
                audioNode: ``,
                visualNode: ``,
                duration: ``,
                processedDuration: ``,
            },
            {
                name: `Remind Me`,
                path: `assets/albums/revival/Remind-Me.mp3`,
                featArtists: [],
                audioNode: ``,
                visualNode: ``,
                duration: ``,
                processedDuration: ``,
            },
            {
                name: `Bad Husband`,
                path: `assets/albums/revival/Bad-Husband.mp3`,
                featArtists: [`X Ambassadors`],
                audioNode: ``,
                visualNode: ``,
                duration: ``,
                processedDuration: ``,
            },
            {
                name: `Like Home`,
                path: `assets/albums/revival/Like-Home.mp3`,
                featArtists: [`Alicia Keys`],
                audioNode: ``,
                visualNode: ``,
                duration: ``,
                processedDuration: ``,
            },
            {
                name: `Remind Me (Intro)`,
                path: `assets/albums/revival/Remind-Me-(Intro).mp3`,
                featArtists: [],
                audioNode: ``,
                visualNode: ``,
                duration: ``,
                processedDuration: ``,
            },
            {
                name: `Remind Me (Intro)`,
                path: `assets/albums/revival/Remind-Me-(Intro).mp3`,
                featArtists: [],
                audioNode: ``,
                visualNode: ``,
                duration: ``,
                processedDuration: ``,
            },
        ]
    },
    {
        name: `Encore`,
        mainArtist: `Eminem`,
        year: 2004,
        cover: `assets/albums/encore/Encore.jpeg`,
        color: `#3aa9ff`,
        choosed: false,
        songFound: false,
        songsList: [
            {
                name: `Rain man`,
                path: `assets/albums/encore/Rain-man.mp3`,
                featArtists: [],
                audioNode: ``,
                visualNode: ``,
                duration: ``,
                processedDuration: ``,
            }
        ]
    }
];


let headerNode = document.querySelector(`.main-header`);
let headerNodes = {
    backButton: headerNode.querySelector(`.back.button`),
    backButton: {
        node: headerNode.querySelector(`.back.button`),
        closed: true,
    },
    searchGroup: {
        node: headerNode.querySelector(`.search-group`),
        showInput: false,
    },
    searchInput: headerNode.querySelector(`.search-group input`),
    searchButton: headerNode.querySelector(`.search.button`),
    searchButton: {
        node: headerNode.querySelector(`.search.button`),
        secondClick: false,
    },
};



let mainNode = document.querySelector(`main`);
let mainNodes = {
    allAlbums: mainNode.querySelector(`.all-albums > div`),
    oneAlbum: mainNode.querySelector(`.one-album`),
    oneAlbumHeader: mainNode.querySelector(`header`),
    oneAlbumSongsList: mainNode.querySelector(`.songs-list`),
};

let audioPlayerNode = document.querySelector(`.audio-player`);
let audioPlayerNodes = {
    pad: audioPlayerNode.querySelector(`.pad`),
    header: audioPlayerNode.querySelector(`header`),
    prevButton: {
        node: audioPlayerNode.querySelector(`.prev`),
        closed: true,
    },
    togglePlayingButton: audioPlayerNode.querySelector(`.toggle-playing`),
    nextButton: {
        node: audioPlayerNode.querySelector(`.next`),
        closed: true,
    },
    scrollLine: {
        node: audioPlayerNode.querySelector(`.scroll-line`),
        showInput: false,
    },
    scrollLineTimes: audioPlayerNode.querySelectorAll(`.time`),
    scrollLineProgress: audioPlayerNode.querySelector(`.line-progress`),
    scrollLineInput: audioPlayerNode.querySelector(`input`),
};




let choosedSong = {
    id: ``,
    inList: ``,
    playing: false,
    defined: false
};





function switchPage(){
    headerNodes.backButton.closed = !(headerNodes.backButton.closed); 
    renderButtonClosed(headerNodes.backButton);
    mainNodes.allAlbums.classList.toggle(`move`);
    mainNodes.oneAlbum.classList.toggle(`move`);
};
function getCardInnerHTML(album){
    return `
        <img src="${album.cover}" alt="${album.name} cover">
        <div class="text">
            <h5>${album.name}</h5>
            <p>${album.year}</p>
        </div>
    `;
};
function getFeatArtistsString(artistsArray){
    if (artistsArray.length < 1){
        return ``
    }
    let artistsString = ``
    for (i in artistsArray){
        let artistsDivider = `, `
        if (i == (artistsArray.length - 1)){
            artistsDivider = ` и `
        }
        if (i == 0){
            artistsDivider = ``
        }
        artistsString += artistsDivider + artistsArray[i]
    }
    return `(feat. ${artistsString})`
};
function deleteSpaces(string){
    let result = ``;
    for (i in string){
        if (string[i] != ` `){
            result += string[i];
        }
    }
    return result;
};
function convertTime(time){
    let seconds = String(time % 60);
    let minutes = Math.floor(time / 60);
    if (seconds.length < 2){
        seconds = `0` + seconds;
    }
    if (minutes >= 60){
        return `9:99+`;
    }
    return `${minutes}:${seconds}`;
};
function getChoosedSongTimes(){
    let timeBefore = choosedSong.inList.audioNode.currentTime;
    let timeAfter = Math.round(choosedSong.inList.duration) - Math.round(timeBefore);
    let timePercent = timeBefore / choosedSong.inList.duration;
    return [convertTime(Math.round(timeBefore)),convertTime(timeAfter),timePercent];
};







function renderButtonClosed(button){
    if (button.closed){
        button.node.classList.add(`closed`);
    }
    else {
        button.node.classList.remove(`closed`);
    }
}

function renderAllAlbums(){
    mainNodes.allAlbums.innerHTML = ``;
    for (let i = 0; i < albums.length; i++){
        let nowAlbumInList = albums[i]
        let nowAlbumNode = document.createElement(`div`);
        nowAlbumNode.classList.add(`album-card`);
        if (nowAlbumInList.choosed){
            nowAlbumNode.classList.add(`choosed`);
        }
        if (nowAlbumInList.songFound){
            nowAlbumNode.classList.add(`song-found`);
        }
        nowAlbumNode.innerHTML = getCardInnerHTML(nowAlbumInList)
        if (i != 0){
            let dividerNode = document.createElement(`div`);
            dividerNode.classList.add(`divider`);
            mainNodes.allAlbums.appendChild(dividerNode);
        }
        mainNodes.allAlbums.appendChild(nowAlbumNode);
        nowAlbumNode.addEventListener(`click`, function(){
            if (nowAlbumInList.choosed == false){
                renderOneAlbum(album = nowAlbumInList,albumIndex = i);
                for (let i = 0; i < albums.length; i++){
                    albums[i].choosed = false;
                }
                nowAlbumInList.choosed = true;
            }
            switchPage();
        });
    };
};

function renderOneAlbum(album, albumIndex){
    mainNodes.oneAlbum.style.backgroundImage = `linear-gradient(${album.color}, #000000 50%)`;
    let dividerNode = document.createElement(`div`);
    dividerNode.classList.add(`divider`);
    mainNodes.oneAlbumHeader.innerHTML = getCardInnerHTML(album);
    mainNodes.oneAlbumSongsList.innerHTML = ``;
    choosedSong.defined = false;
    choosedSong.playing = false;
    renderAudioPlayer();
    for (let i = 0; i < album.songsList.length; i++){
        let nowSongInList = album.songsList[i];
        let nowSongNode = document.createElement(`div`);
        nowSongNode.classList.add(`song-card`);
        nowSongNode.innerHTML = `
            <div class="name">
                <img src="assets/music-playing.gif" alt="music-playing">
                <div>
                    <h5>${nowSongInList.name} ${getFeatArtistsString(nowSongInList.featArtists)}</h5>
                    <p>${album.mainArtist}</p>
                </div>
            </div>
            <p class="time">
                ?:??
            </p>
            <audio src="${nowSongInList.path}" preload="metadata"></audio>
        `;
        if (i != 0){
            let dividerNode = document.createElement(`div`);
            dividerNode.classList.add(`divider`);
            mainNodes.oneAlbumSongsList.appendChild(dividerNode);
        }
        nowSongInList.audioNode = nowSongNode.querySelector(`audio`);
        nowSongInList.visualNode = nowSongNode;
        nowSongInList.audioNode.onloadedmetadata = function(){
            nowSongInList.duration = nowSongInList.audioNode.duration;
            nowSongInList.processedDuration = convertTime(Math.round(nowSongInList.audioNode.duration));
            nowSongNode.querySelector(`.time`).innerHTML = nowSongInList.processedDuration;
        };
        mainNodes.oneAlbumSongsList.appendChild(nowSongNode);
        nowSongNode.addEventListener(`click`, function(){
            changeSong(newSongId = String(albumIndex) + String(i), nowSongInList);
        });
    }
};

function renderSearch(){
    for (let i = 0; i < albums.length; i++){
        albums[i].songFound = false;
    }
    if (deleteSpaces(headerNodes.searchInput.value) != ``){
        for (i in albums){
            let nowSongList = albums[i].songsList;
            let passed = false;
            for (i in nowSongList){
                if (nowSongList[i].name.toLowerCase().includes(headerNodes.searchInput.value.toLowerCase())){
                    passed = true
                }
            }
            if (passed){
                albums[i].songFound = true;
            }
        }
    }
    renderAllAlbums();
};

function renderShowInput(node){
    if (node.showInput){
        node.node.classList.add(`show-input`);
    }
    else {
        node.node.classList.remove(`show-input`);
    }
    node.node.querySelector(`input`).disabled = !(node.showInput);
};

function renderTimeEvents(){
    if (choosedSong.defined){
        let currentTimes = getChoosedSongTimes();
        audioPlayerNodes.scrollLineTimes[0].innerHTML = currentTimes[0];
        audioPlayerNodes.scrollLineTimes[1].innerHTML = currentTimes[1];
        audioPlayerNodes.scrollLineInput.value = currentTimes[2] * 100;
        audioPlayerNodes.scrollLineProgress.style.width = `${audioPlayerNodes.scrollLineInput.value}%`
        if (choosedSong.playing){ 
            choosedSong.inList.visualNode.querySelector(`.time`).innerHTML = `${currentTimes[0]} / ${currentTimes[1]}`
            if (choosedSong.inList.audioNode.currentTime < (choosedSong.inList.duration - 0.3)){
                requestAnimationFrame(renderTimeEvents);
            }
            else {
                if (audioPlayerNodes.nextButton.closed == false){
                    playPrevOrNextSong(true)
                }
                else {
                    changeSong(newSongId = (choosedSong.id[0]) + `0`, newSongInList = `not given`, playIt = false);
                }
                audioPlayerNodes.scrollLineInput.disabled = true;
                audioPlayerNodes.scrollLineInput.disabled = false;
            }
        }
        else {
            choosedSong.inList.visualNode.querySelector(`.time`).innerHTML = choosedSong.inList.processedDuration;
            requestAnimationFrame(renderTimeEvents);
        }
    }
}

function renderAudioPlayer(){
    if (choosedSong.defined){
        let choosedSongAlbum = albums[Number(choosedSong.id[0])];
        audioPlayerNodes.header.innerHTML = `
            <img src="${choosedSongAlbum.cover}" alt="${choosedSongAlbum.name} cover">
            <div>
                <h5>${choosedSong.inList.name} ${getFeatArtistsString(choosedSong.inList.featArtists)}</h5>
                <p>${choosedSongAlbum.mainArtist}</p>
            </div>
        `;
        choosedSong.inList.visualNode.classList.add(`playing`);
        audioPlayerNode.classList.remove(`hidden`);
        renderTimeEvents();
        audioPlayerNodes.pad.style.backgroundColor = choosedSongAlbum.color
    }
    else {
        audioPlayerNode.classList.add(`hidden`);
    }
    renderShowInput(audioPlayerNodes.scrollLine);
};

function renderTogglePlayingButton(){
    if (choosedSong.playing){
        audioPlayerNodes.togglePlayingButton.classList.add(`song-playing`);
    }
    else {
        audioPlayerNodes.togglePlayingButton.classList.remove(`song-playing`);
    }
};






function changeSong(newSongId, newSongInList = `not given`, playIt = true){
    if (choosedSong.defined){
        choosedSong.inList.visualNode.querySelector(`.time`).innerHTML = choosedSong.inList.processedDuration;
        choosedSong.inList.visualNode.classList.remove(`playing`);
        choosedSong.inList.audioNode.pause();
    }
    choosedSong.playing = false;
    choosedSong.id = newSongId;
    if (newSongInList != `not given`){
        choosedSong.inList = newSongInList;
    }
    else {
        choosedSong.inList = albums[newSongId[0]].songsList[newSongId[1]];
    }
    choosedSong.defined = true;
    choosedSong.inList.audioNode.load();
    if (playIt){
        choosedSong.inList.audioNode.play();
        choosedSong.playing = true;
    }
    if (Number(newSongId[1]) == 0){
        audioPlayerNodes.prevButton.closed = true;
    }
    else {
        audioPlayerNodes.prevButton.closed = false;
    }
    if (Number(newSongId[1]) == (albums[Number(newSongId[0])].songsList.length - 1)){
        audioPlayerNodes.nextButton.closed = true;
    }
    else {
        audioPlayerNodes.nextButton.closed = false;
    }
    renderButtonClosed(audioPlayerNodes.nextButton);
    renderAudioPlayer();
    renderTogglePlayingButton();
}

function toggleSongPlaying(){
    if (choosedSong.defined){
        if (choosedSong.playing){
            choosedSong.inList.audioNode.pause();
        }
        else {
            choosedSong.inList.audioNode.play();
        }
        choosedSong.playing = !(choosedSong.playing);
    };
    renderTogglePlayingButton();
};

function playPrevOrNextSong(direction, rewindToStart = false){
    let albumIndex = Number(choosedSong.id[0]);
    let songIndex = Number(choosedSong.id[1]);
    if (((direction == false) && (choosedSong.inList.audioNode.currentTime > 2)) || (rewindToStart)){
        changeSong(newSongId = choosedSong.id, newSongInList = choosedSong.inList, playIt = choosedSong.playing);
    }
    else {
        changeSong(newSongId = String(albumIndex) + String(songIndex + ((Number(direction) * 2) - 1)), newSongInList = `not given`, playIt = choosedSong.playing);
    }
};









headerNodes.backButton.node.addEventListener(`click`, function(){
    if (headerNodes.backButton.closed == false){
        renderAllAlbums();
        switchPage();
    }
});


headerNodes.searchButton.node.addEventListener(`click`, function(){
    if (headerNodes.searchGroup.showInput == false){
        headerNodes.searchGroup.showInput = true;
    }
    else if (headerNodes.searchGroup.showInput == true){
        if ((deleteSpaces(headerNodes.searchInput.value) == ``) || (headerNodes.searchButton.secondClick)){
            headerNodes.searchGroup.showInput = false;
            headerNodes.searchInput.value = ``;
            renderSearch();
            headerNodes.searchButton.secondClick = false;
        }
        else {
            headerNodes.searchButton.secondClick = true;
        }
    }
    renderShowInput(headerNodes.searchGroup);
});


headerNodes.searchInput.addEventListener(`input`, renderSearch);



audioPlayerNodes.prevButton.node.addEventListener(`click`, function(){
    if (audioPlayerNodes.prevButton.closed == false){
        playPrevOrNextSong(false);
    }
    else {
        playPrevOrNextSong(false, rewindToStart = true);
    }
});

audioPlayerNodes.togglePlayingButton.addEventListener(`click`, toggleSongPlaying);

audioPlayerNodes.nextButton.node.addEventListener(`click`, function(){
    if (audioPlayerNodes.nextButton.closed == false){
        playPrevOrNextSong(true);
    }
});

function toggleAudioPlayerShowInput(){
    audioPlayerNodes.scrollLine.showInput = !(audioPlayerNodes.scrollLine.showInput);
    renderShowInput(audioPlayerNodes.scrollLine);
    audioPlayerNodes.scrollLineInput.disabled = !(audioPlayerNodes.scrollLine.showInput);
};

audioPlayerNodes.scrollLine.node.addEventListener(`click`, function(){
    if (audioPlayerNodes.scrollLine.showInput == false){
        toggleAudioPlayerShowInput();
    }
});
audioPlayerNodes.header.addEventListener(`click`, toggleAudioPlayerShowInput);

audioPlayerNodes.scrollLineInput.addEventListener(`input`, function(){
    choosedSong.inList.audioNode.currentTime = ((audioPlayerNodes.scrollLineInput.value / 100) * choosedSong.inList.duration);
});



renderButtonClosed(headerNodes.backButton);
renderAllAlbums();
renderShowInput(headerNodes.searchGroup);
renderAudioPlayer();

