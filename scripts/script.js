let interval;
const html = document.querySelector("html"); 

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("Youtube-customization")) || []
    },
    set () {
        localStorage.setItem("Youtube-customization", JSON.stringify(Video.allVideos))
    }
}

Utils = {
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

    getValueCookie (property) {
        const cookies = document.cookie.split(";") || "";

        for (let index = 0; index < cookies.length; index++) {
            propertyValue = cookies[index].trim().split("=");
            
            if (propertyValue[0] == property)
                return propertyValue[1];           
        }
    }
}

const Video = {
    allVideos: Storage.get(), 

    getIndex () {
        return Utils.getValueCookie("index");
    },
    
    setIndex (index) {
        document.cookie = `index=${index}`
    }
}

const Controler = {
    
    thereVideo() {
        try {
            if (Video.allVideos.length > 0) {
                
                const buttonVideoHistory = document.querySelector('.menu div:nth-child(2)')
                if (buttonVideoHistory.classList.contains('off')) {
                    buttonVideoHistory.classList.remove('off')
                }
            }
        } catch (e) {
            console.log(e.message)
        }
    },

    getLinkReturn () {
        return Utils.getValueCookie("returnLink");
    },

    setLinkReturn (link) {
        document.cookie = `returnLink=${link}`;
    }
}

Controler.thereVideo()
