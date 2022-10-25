import { Tumbnails } from './tumbnails.js';

let interval;

const html = document.querySelector('html');

export const Storage = {
	get() {
		return JSON.parse(localStorage.getItem('Youtube-customization')) || [];
	},
	set () {
		localStorage.setItem('Youtube-customization', JSON.stringify(Video.allVideos));
	}
};

export const Utils = {
	showButtons () {
		const showHeader = document.querySelector('.menu-section');
		if (showHeader.classList.contains('off')) {
			showHeader.classList.remove('off');     
		}
        
		clearInterval(interval, 0);
		interval = setInterval(Utils.hideButtons, 4000);
	},
    
	hideButtons () {
		const backButton = document.querySelector('.menu-section');
		if (!backButton.classList.contains('off')) {
			const hideHeader = document.querySelector('.menu-section');
			hideHeader.classList.add('off');
		}
	},

	getValueCookie (property) {
		const cookies = document.cookie.split(';') || '';

		for (let index = 0; index < cookies.length; index++) {
			let propertyValue = cookies[index].trim().split('=');
            
			if (propertyValue[0] == property)
				return propertyValue[1];           
		}
	}
};

export const Controler = {
    
	thereVideo() {
		try {
			if (Video.allVideos.length > 0) {
                
				const buttonVideoHistory = document.querySelector('.menu div:nth-child(2)');
				if (buttonVideoHistory.classList.contains('off')) {
					buttonVideoHistory.classList.remove('off');
				}
			}
		} catch (e) {
			console.log(e.message);
		}
	},

	getLinkReturn () {
		return Utils.getValueCookie('returnLink');
	},

	setLinkReturn (link) {
		document.cookie = `returnLink=${link}`;
	}
};

export const Video = {
	allVideos: Storage.get(), 

	delete (index) {
		Video.allVideos.splice(index, 1);
		Storage.set();
		Tumbnails.refreshTumbs();
	},

	getIndex () {
		return Utils.getValueCookie('index');
	},
    
	setIndex (index) {
		document.cookie = `index=${index}`;
	}
};

export const ytVideo = {
	addVideo(index = Video.getIndex()) {
		try {
			const {link, width} = Video.allVideos[index];
        
			const height = width*9/16;
			const ytVideo = document.querySelector('.yt-video');
            
			ytVideo.innerHTML = `
                <div id="video">
                    <div class="corner top left"></div>
                    <div class="side horizontal top"></div>
                    <div class="corner top right"></div>
                    <div class="side vertical left"></div>
                    
                    <iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${link}?start=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    
                    <div class="side vertical right"></div>
                    <div class="corner bottom left"></div>
                    <div class="side horizontal bottom"></div>
                    <div class="corner bottom right"></div>
                </div>
            `;

			interval = setInterval(Utils.hideButtons, 4000);
			html.addEventListener('mousemove', Utils.showButtons);
		} catch (e) {
			console.log(e.message);
		}
	},

	returnLink() {
		const anchorHeaderYtVideo = document.querySelector('.menu-section div a');

		anchorHeaderYtVideo.href = Controler.getLinkReturn();
	},
	
	resize (positionMouseAxisX, isCornerLeft = false) {
		const video = document.querySelector('#video iframe');

		const initAxis = Number(video.getBoundingClientRect().x);
		
		const width = Math.abs(isCornerLeft 
			? (initAxis - positionMouseAxisX) + video.getBoundingClientRect().width 
			: (initAxis - positionMouseAxisX)
		);
	
		const height = width*9/16;

		video.setAttribute('width', `${width}px`);
		video.setAttribute('height', `${height}px`);
	},

	addDragListener() {
		const corners = document.querySelectorAll('.corner');

		corners.forEach((corner) => {
			
			corner.addEventListener('drag', (e) => {
	
				if (e.clientX != 0) {
					ytVideo.resize(e.clientX, corner.classList.contains('left'));
				}
			});
		});
	}
};
