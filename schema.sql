CREATE TABLE IF NOT EXISTS goods
(
    id    INT AUTO_INCREMENT,
    name  VARCHAR(200) NOT NULL,
    cover VARCHAR(200) NOT NULL,
    price FLOAT        NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users
(
    id       INT AUTO_INCREMENT,
    email    VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100)       NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO goods(name, cover, price)
VALUES ('Смартфон GOOGLE Pixel 7 Pro 256 GB Hazel (Європейская версія)', 'covers/292244166.png', 58520);

INSERT INTO goods(name, cover, price)
VALUES ('Мобільний телефон Samsung Galaxy S22 Ultra 12/512 GB Green (SM-S908BZGHSEK)', 'covers/253281547.jpg', 61099);

INSERT INTO goods(name, cover, price)
VALUES ('Монітор 26.9" Samsung Odyssey G7 C27G75TQSI (LC27G75TQSIXCI) QLED / HDR600 / 8-Bit + FRC / sRGB 125% / G-SYNC Compatible',
        'covers/106656832.jpg', 21999);

INSERT INTO goods(name, cover, price)
VALUES ('Ігрова приставка Sony PlayStation 5 + FIFA 23 у подарунок', 'covers/296243354.jpg', 32999)