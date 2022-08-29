import { Tumbnails } from './tumbnails.js';
import { ytVideo, Controler } from './video.js';
import { Form } from './form.js';

try {
	const regexURLLastPath = /\/[\w-]*($|(?=\?))/g;
	const path = document.URL.match(regexURLLastPath);

	if (path != null) {
		if (path[0] === '/') {
			Controler.thereVideo();
		
		} else if (path[0] ==='/tumbnails') {
			Tumbnails.showTumbnails();
			Controler.setLinkReturn('/tumbnails');
			Tumbnails.buttonToggleExclusion.addEventListener('click', Tumbnails.toggleMenuForExclusion);
		
		
		} else if (path[0] === '/form') {
			Controler.setLinkReturn('/form');
			const form = document.querySelector('#form form');
			form.addEventListener('submit', (event) => Form.submit(event));
			
		} else if (path[0] === '/yt-video') {
			ytVideo.addVideo();
			ytVideo.returnLink();
		}		
	} else {
		throw new Error('invalid URL');
	}
} catch (e) {
	console.log(e);
}