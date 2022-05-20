let show = true;

Utils = {
    toggle () {    
        const background = document.
        querySelector('.yt-video-background')
        
        background.classList.toggle("on", show) 
        show = !show;
    }
}

const Form = {
    "url-link": document.querySelector('input#url-link'),
    "select-width": document.querySelector('input#select-width'),

    getValues() {
        return {
            "url-link": Form["url-link"].value,
            "select-width": Form["select-width"].value,
        }
    },

    submit(event) {
        event.preventDefault()

        try {
            Utils.toggle()
            
        } catch (error) {
            alert(error.message)
        }
        console.log(Form.getValues())
    }
}
