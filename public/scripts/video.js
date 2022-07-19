const ytVideo = {
	addVideo(index = Video.getIndex()) {
		try {
			const {link, width} = Video.allVideos[index];
        
			const height = width*9/16;
			const ytVideo = document.querySelector('.yt-video');
            
			ytVideo.innerHTML = `
            <iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${link}?start=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
	}
};

ytVideo.addVideo();
ytVideo.returnLink();
