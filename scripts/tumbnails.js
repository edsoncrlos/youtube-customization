Tumbnails = {
    tumbs: document.querySelector('.tumbnails'),

    showTumbnails() {
        for (let index = 0; index < Video.allVideos.length; index++) {
            Tumbnails.addTumbnail(Video.allVideos[index].link, index)
        }
    },

    addTumbnail(link, index) {
        const tumb = document.createElement('div')
        tumb.classList.add('tumbnail')

        tumb.innerHTML = Tumbnails.innerHTMLTumbnail(link, index)
        Tumbnails.tumbs.appendChild(tumb)
    },

    innerHTMLTumbnail(link, index) {
        return`
            <a href="./yt-video.html">            
                <div id="x">
                    <i class="ph-x ph-4x"></i>
                </div>
                <div>
                    <img onclick="Video.setIndex(${index})" src="https://img.youtube.com/vi/${link}/0.jpg">
                </div>
            </a>
        `
    }
}

Tumbnails.showTumbnails()

Controler.setLinkReturn("./tumbnails.html");
