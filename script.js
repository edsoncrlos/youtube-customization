let isThemeDark = true;
let interval;
const html = document.querySelector("html"); 

const Videos = [

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
    toggleBackButton () {  
        const backButton = document.querySelector('.menu-section>div')
        backButton.classList.toggle("off") 
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
        interval = setInterval(Utils.hideButtons, 4000);
    },
    
    hideButtons () {
        const backButton = document.querySelector('.menu-section')
        if (!backButton.classList.contains('off')) {
            const hideHeader = document.querySelector('.menu-section');
            hideHeader.classList.add('off');
        }
    },
}

const backButton = document.querySelector('#back-button')

const Controler = {

    togglePag (off, on) {
        const turnOff = document.querySelector(off)
        const turnOn = document.querySelector(on)
        
        turnOff.classList.add('off')
        turnOn.classList.remove('off')
    },
    
    formForMenu () {
        Controler.togglePag('#form', '.menu')
        backButton.removeEventListener('click', Controler.formForMenu)

        Utils.toggleBackButton()
    },

    menuForForm () {
        Controler.togglePag('.menu', '#form');
        backButton.addEventListener("click", Controler.formForMenu)
        
        Utils.toggleBackButton()
    },

    ytVideoForForm() {
        Controler.togglePag('.yt-video-background','#form')
        backButton.removeEventListener("click", Controler.ytVideoForForm)
        backButton.addEventListener('click', Controler.formForMenu)
        
        Video.clearVideo()
    },

    formForYtVideo() {
        Controler.togglePag('#form','.yt-video-background') 
        backButton.removeEventListener('click', Controler.formForMenu)
        backButton.addEventListener('click', Controler.ytVideoForForm)
    },

    ytVideoForTumbnails() {
        Controler.togglePag('.yt-video-background', '.tumbnails') 
        backButton.removeEventListener('click', Controler.ytVideoForTumbnails)
        backButton.addEventListener('click', Controler.hideTumbnails)
        
        Video.clearVideo()
    },

    tumbnailsForYtVideo(index) {
        Controler.togglePag('.tumbnails','.yt-video-background');
        backButton.removeEventListener('click', Controler.hideTumbnails);
        backButton.addEventListener('click', Controler.ytVideoForTumbnails);
        console.log("1 -"+ Videos[index].link + " " + Videos[index].width);
        Video.addVideo(index);
    },

    thereVideo() {
        if (Videos.length > 0) {
            
            const buttonVideoHistory = document.querySelector('.menu div:nth-child(2)')
            if (buttonVideoHistory.classList.contains('off')) {
                buttonVideoHistory.classList.remove('off')
            }
        }
    },
    
    hideTumbnails() {
        Controler.togglePag('.tumbnails', '.menu')
        Video.clearTumbnails()
        
        backButton.removeEventListener("click", Controler.hideTumbnails)
       
        Utils.toggleBackButton()
      
    },

    showTumbnails() {
        for (let index = 0; index < Videos.length; index++) {
            Video.addTumbnail(Videos[index].link, index)
        }
        Controler.togglePag('.menu', '.tumbnails')

        backButton.addEventListener("click", Controler.hideTumbnails)
        Utils.toggleBackButton()
    }
}

const Video = {
    tumbs: document.querySelector('.tumbnails'),

    addVideo(index) {
        try {
            const {link, width} = Videos[index];
        
            const height = width*9/16;
            const ytVideo = document.querySelector('.yt-video');
            
            ytVideo.innerHTML = `
            <iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${link}?start=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;

        } catch (e) {
            console.log(e.message);
        }
    },
    
    clearVideo() {
        const ytVideo = document.querySelector('.yt-video');
        ytVideo.innerHTML = "";
    },

    addTumbnail(link, index) {
        const tumb = document.createElement('div')
        tumb.classList.add('tumbnail')

        tumb.innerHTML = Video.innerHTMLTumbnail(link, index)
        Video.tumbs.appendChild(tumb)
    },

    clearTumbnails() {
        const tumbnails = document.querySelector('.tumbnails')

        tumbnails.innerHTML = ""
    },

    innerHTMLTumbnail(link, index) {
        return`
            <img onclick="Video.addVideo(Controler.tumbnailsForYtVideo(${index}))" src="https://img.youtube.com/vi/${link}/0.jpg">
        `
    }
}

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

        return {
            link,
            width: Number(width)
        }
    },

    submit(event) {
        event.preventDefault()
        
        try {
            const data = Form.formatValues()
            const object = Videos.find(object => object.link === data.link)
            let index = 0;

            if (object != undefined) {
                index = Videos.indexOf(object)
            } else {
                Videos.push(data)
                index = Videos.length-1
            }
            Video.addVideo(index)
            Controler.formForYtVideo()

        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init () {
        Controler.thereVideo()      
    }
}

App.init();
