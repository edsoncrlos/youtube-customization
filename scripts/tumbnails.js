Tumbnails = {
    tumbs: document.querySelector('.tumbnails'),
    isActiveExclusion: true,    

    showTumbnails() {
        for (let index = 0; index < Video.allVideos.length; index++) {
            Tumbnails.addTumbnail(Video.allVideos[index].link, index)
        }
    },

    addTumbnail(link, index) {
        const tumb = document.createElement('div')
        tumb.classList.add('tumbnail');

        tumb.innerHTML = Tumbnails.innerHTMLTumbnail(link, index);
        Tumbnails.tumbs.appendChild(tumb);
    },

    innerHTMLTumbnail(link, index) {
        return`
            <a href="./yt-video.html">            
                <div id="icon-x" class="off">
                    <i class="ph-x ph-4x"></i>
                </div>
                <div>
                    <img onclick="Video.setIndex(${index})" src="https://img.youtube.com/vi/${link}/0.jpg">
                </div>
            </a>
        `
    },

    toggleMenuForExclusion() {
        const tumbnails = document.querySelector(".tumbnails");
        const edit = document.querySelector("#edit")
        const iconX = document.querySelectorAll("#icon-x");
        
        tumbnails.classList.toggle("on", Tumbnails.isActiveExclusion);

        Tumbnails.isActiveExclusion = !Tumbnails.isActiveExclusion;

        iconX.forEach((x) => {
            x.classList.toggle("off", Tumbnails.isActiveExclusion);
        })

        if (!Tumbnails.isActiveExclusion) {
            edit.innerText = "Pronto";
        } else {
            edit.innerText = "Editar";
        }
    }
}

Tumbnails.showTumbnails()

Controler.setLinkReturn("./tumbnails.html");
