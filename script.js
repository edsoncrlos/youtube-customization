let show = true;

Utils = {
    toggle () {    
        const background = document.
        querySelector('.yt-video-background')
        
        background.classList.toggle("on", show) 
        show = !show;
    },
}

const Form = {
    urlLink: document.querySelector('input#url-link'),
    width: document.querySelector('input#select-width'),

    getValues() {
        return {
            urlLink: Form.urlLink.value,
            width: Form.width.value,
        }
    },

    validateFields() {
        /*const {urlLink, width} = Form.getValues();
        
        if (urlLink.trim() === "" || width.trim() === "") {
            
        }*/
    },

    submit(event) {
        event.preventDefault()

        try {
            Utils.toggle()
            Form.validateFields()
        } catch (error) {
            alert(error.message)
        }
        console.log(Form.getValues())
    }
}

const Video = {
    addVideo() {
        const {urlLink, width} = Form.getValues();
        const height = width*9/16;
        console.log(width + " " + height)
        const ytVideo = document.querySelector('.yt-video-background')
        
        console.log(urlLink)

        let ytURLIndex = String(urlLink.indexOf("watch"));
        console.log(ytURLIndex)
        console.log(urlLink[24])

        ytVideo.innerHTML = `
            <iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/ngVU74daJ8Y?start=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `
    }
}

Video.addVideo()