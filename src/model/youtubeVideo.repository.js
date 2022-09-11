const db = require('db');

module.exports = class youtubeVideo {
	async findAllVideos() {

		const query = `
            SELECT * FROM youtube_videos;
        `;

		const { rows } = await db.query(query);

		return rows ?? [];
	}

	async create (link, width) {

		const script = `
            INSERT INTO (link, width) 
            VALUES ($1, $2);
        `;

		const values = [link, width];
		return await db.query(script, values);
	}

	async update (link, width) {

		const script = `
            UPDATE youtube_videos 
            SET link = $1, width = $2
            WHERE link = $1;
        `;

		const values = [link, width];
		return await db.query(script, values);
	}

	async delete (link) {
		const script = `
            DELETE FROM youtube_videos
            WHERE link = $1;
        `;

		const values = [link];

		return await db.query(script, values);
	}
};
