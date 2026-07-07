USE aspnet06;
DELIMITER $$
CREATE PROCEDURE reset_database()
BEGIN
    TRUNCATE TABLE Articles;
    INSERT INTO Articles (title, content, pubdate) VALUES
        ('Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse turpis sapien, efficitur et pharetra eu, vestibulum quis urna.', '2026-07-06'),
        ('Integer ullamcorper nisi sit', 'Integer ullamcorper nisi sit amet posuere vestibulum. Etiam tempus, nisl non aliquet scelerisque.', '2026-07-06');
END $$
DELIMITER ;
