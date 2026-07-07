USE aspnet06;
DELIMITER $$
CREATE PROCEDURE reset_database()
BEGIN
    TRUNCATE TABLE Articles;
    INSERT INTO Articles (title, content, pubdate) VALUES
        ('Titre 1', 'Voici mon texte.', '2026-01-13'),
        ('Titre 2', 'Voici mon texte.', '2026-05-25');
END $$
DELIMITER ;
