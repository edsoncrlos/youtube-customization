const Form = {
    urlLink: document.querySelector('input#url-link'),
    width: document.querySelector('input#select-width'),

    getValues() {
        return {
            link: Form.getVideoLink(Form.urlLink.value),
            width: Form.width.value
        }
    },

    getVideoLink(urlLink) {
        
        let link;
    
        if (urlLink.indexOf("watch") != -1) {
            const indexEndLink = urlLink.indexOf("&") == -1 ? urlLink.length : urlLink.indexOf("&");

            link = urlLink.slice(urlLink.indexOf("=")+1, indexEndLink)
        } else if (urlLink.indexOf("youtu.be") != -1) {
            const indexStart = urlLink.indexOf("youtu.be")+9;

            link = urlLink.slice(indexStart);
        }
        return link;
    },

    formatValues() {
        const {link, width} = Form.getValues();

        if (link == undefined && width==undefined) {
            throw new Error('Not exist value')
        }
        return {
            link,
            width: Number(width)
        }
    },

    submit(event) {
        event.preventDefault()
        
        try {
            const data = Form.formatValues()
            const object = Video.allVideos.find(object => object.link === data.link)
            let index = 0;

            if (object != undefined) {
                index = Video.allVideos.indexOf(object);
                Video.allVideos[index].width = data.width;
            } else {
                Video.allVideos.push(data);
                index = Video.allVideos.length-1;
            }
            
            Video.setIndex(index);
            Controler.thereVideo()
            Storage.set(Video.allVideos);
            window.location.href = "./yt-video.html"
        } catch (error) {
            console.log(error.message)
        }
    }
}


Controler.setLinkReturn("./form.html");
