const db = require('../db');

const initDb = {
	async init() {
		await db.query(`
            CREATE TABLE IF NOT EXISTS youtube_videos (
                link VARCHAR(20) NOT NULL UNIQUE,
                width smallint NOT NULL CHECK (width >= 320 and width <= 7680)
            );
        `);
	}
};

initDb.init();