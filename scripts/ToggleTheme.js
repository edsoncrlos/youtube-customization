let isThemeDark = true;

const StorageColor = {
    getColors() {
        return JSON.parse(localStorage.getItem("Youtube-customization-theme")) || 0;
    },

    setColors(indexColor) {
        localStorage.setItem("Youtube-customization-theme", JSON.stringify(indexColor))
    }
}

const getStyle = (element, style) =>
    window
    .getComputedStyle(element)
    .getPropertyValue(style)



darkTheme = {
    bg: getStyle(html, "--bg"),
    bgToggle: getStyle(html, "--bg-toggle"),
    colorX: getStyle(html, "--color-x")
}

lightTheme = {
    bg: "#fff",
    bgToggle: "gray",
    colorX: "#000"
}


const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const ToggleTheme = {
    theme: StorageColor.getColors(),

    changeColors (colors) {
        Object.keys(colors).map(key =>
            html.style.setProperty(transformKey(key), colors[key])
        )
    },

    toggleTheme () {
        const backgroundToggleTheme = document.querySelector('.theme')
        
        if (!isThemeDark) {
            ToggleTheme.changeColors(darkTheme);
            StorageColor.setColors(darkTheme)
        } else {
            ToggleTheme.changeColors(lightTheme);
            StorageColor.setColors(lightTheme)
        }
        
        backgroundToggleTheme.classList.toggle("on", isThemeDark)
        isThemeDark = !isThemeDark;
    },
    
    currentTheme () {
        let isDark = true;

        Object.keys(ToggleTheme.theme).map(key => {
            if (ToggleTheme.theme[key] != darkTheme[key] && isDark) {
                isDark = false;
            }
        })

        if (!isDark) 
            ToggleTheme.toggleTheme()  
    }
}

ToggleTheme.currentTheme()
