let show = true;
let isThemeDark = true;
const html = document.querySelector("html"); 

const Videos = [
    {
        link: "BvhYm0BOLvA"
    },
    
]

const getStyle = (element, style) =>
window
    .getComputedStyle(element)
    .getPropertyValue(style)

const initialColor = {
    bg: getStyle(html, "--bg"),
    bgToggle: getStyle(html, "--bg-toggle"),
}

const lightMode = {
    bg: "#fff",
    bgToggle: "gray",
}

const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

Utils = {
    toggle () {  
        const background = document.
        querySelector('.yt-video-background')
        const backButton = document.querySelector('[onclick="Utils.toggle()"]')
        
        background.classList.toggle("on", show) 
        backButton.classList.toggle("on", show) 
        show = !show;
    },
    
    toggleTheme () {
        const backgroundToggleTheme = document.querySelector('.theme')
        
        if (isThemeDark) {
            Utils.changeColors(lightMode);
        } else {
            Utils.changeColors(initialColor)
        }
        
        backgroundToggleTheme.classList.toggle("on", isThemeDark)
        isThemeDark = !isThemeDark;
    },

    changeColors (colors) {
        Object.keys(colors).map(key =>
            html.style.setProperty(transformKey(key), colors[key])
            )
    },

    showButtons () {
        const showHeader = document.querySelector('.menu-section');
        if (showHeader.classList.contains('off')) {
            showHeader.classList.remove('off')     
        }
        
        clearInterval(interval, 0)
        interval = setInterval(Utils.hideButtons, 3000);
    },
    
    hideButtons () {
        const backButton = document.querySelector('[onclick="Utils.toggle()"]')
        if (backButton.classList.contains('on')) {
            const hideHeader = document.querySelector('.menu-section');
            hideHeader.classList.add('off');
        }
    },
}

let interval = setInterval(Utils.hideButtons, 3000);
html.addEventListener("mousemove", Utils.showButtons);

const Video = {
    tumbs: document.querySelector('.tumbnails'),

    addVideo() {
        const {urlLink, width} = Form.getValues();
        const height = width*9/16;
        const link = Video.getLink(urlLink);
        const ytVideo = document.querySelector('.yt-video')
        
        ytVideo.innerHTML = `
            <iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${link}?start=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `
    },

    getLink(urlLink) {
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

    addTumbnail(link) {
        const tumb = document.createElement('div')
        tumb.classList.add('tumbnail')

        tumb.innerHTML = Video.innerHTMLTumbnail(link)
        Video.tumbs.appendChild(tumb)
    },

    innerHTMLTumbnail(link) {
        return`
            <img src="https://img.youtube.com/vi/${link}/0.jpg">
        `
    }
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
            Video.addVideo()
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init () {
        for (let index = 0; index < Videos.length; index++) {
            console.log(Videos[index].link)
            Video.addTumbnail(Videos[index].link)
        }
    }
}

App.init();
