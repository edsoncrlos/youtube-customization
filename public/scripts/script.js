import { Tumbnails } from './tumbnails.js';
import { ytVideo, Controler } from './video.js';
import { Form } from './form.js';

const route = document.URL.split('/')[3];
if (route === '') {
	Controler.thereVideo();

} else if (route.indexOf('tumbnails') !== -1) {
	Tumbnails.showTumbnails();
	Controler.setLinkReturn('/tumbnails');
	Tumbnails.buttonToggleExclusion.addEventListener('click', Tumbnails.toggleMenuForExclusion);


} else if (route.indexOf('form') !== -1) {
	Controler.setLinkReturn('/form');
	const form = document.querySelector('#form form');
	form.addEventListener('submit', (event) => Form.submit(event));
	
} else if (route.indexOf('yt-video') !== -1) {
	ytVideo.addVideo();
	ytVideo.returnLink();
}