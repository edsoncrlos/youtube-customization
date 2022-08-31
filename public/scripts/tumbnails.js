import { Video } from './video.js';

export const Tumbnails = {
	tumbs: document.querySelector('.tumbnails'),
	buttonToggleExclusion: document.querySelector('#edit'),
	themeIconX: document.querySelector('.theme'),
	isActiveExclusion: true,    

	showTumbnails() {
		for (let index = 0; index < Video.allVideos.length; index++) {
			Tumbnails.addTumbnail(Video.allVideos[index].link, index);
		}
	},

	addTumbnail(link, index) {
		const tumb = document.createElement('div');
		tumb.classList.add('tumbnail');
		
		tumb.innerHTML = Tumbnails.innerHTMLTumbnail(link);
		tumb.onclick = () => Video.setIndex(index);
		Tumbnails.tumbs.appendChild(tumb);
	},

	innerHTMLTumbnail(link) {		
		return`
            <a href="/yt-video">            
                <div class="icon-x off">
					<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#fff" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="200" y1="56" x2="56" y2="200" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="200" y1="200" x2="56" y2="56" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                </div>
                <div>
                    <img src="https://img.youtube.com/vi/${link}/0.jpg">
                </div>
            </a>
        `;
	},

	toggleMenuForExclusion() {
		const tumbnails = document.querySelector('.tumbnails');
		const edit = document.querySelector('#edit');
		const tumbs = document.querySelectorAll('.tumbnail a');

		tumbnails.classList.toggle('on', Tumbnails.isActiveExclusion);

		Tumbnails.isActiveExclusion = !Tumbnails.isActiveExclusion;

		tumbs.forEach((tumb, index) => {
			const iconX = tumb.firstElementChild;

			iconX.classList.toggle('off', Tumbnails.isActiveExclusion);
            
			if (Tumbnails.isActiveExclusion) {
				tumb.onclick = () => Video.setIndex(index);
				tumb.href = '/yt-video';
			} else {
				tumb.onclick = () => Video.delete(index);
				tumb.removeAttribute('href');
			}
		});

		if (!Tumbnails.isActiveExclusion) {
			edit.innerText = 'Pronto';
		} else {
			edit.innerText = 'Editar';
		}
	},

	refreshTumbs () {
		Tumbnails.tumbs.innerHTML = '';

		Tumbnails.showTumbnails();
		Tumbnails.isActiveExclusion =  true;
		Tumbnails.toggleMenuForExclusion();
	},

	changeColorIconsx () {
		const html = document.querySelector('html');
		const colorOppsite = window.getComputedStyle(html).getPropertyValue('--bg-oppsite');
		const iconsX = document.querySelectorAll('.icon-x svg line');

		iconsX.forEach((X) => {
			X.style.stroke = colorOppsite;
		});
	}
};
