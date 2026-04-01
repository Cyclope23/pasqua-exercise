-- ============================================================
--  DDL - Creazione struttura DB Device Mobile
-- ============================================================

CREATE TABLE os (
    id          INT          PRIMARY KEY AUTO_INCREMENT,
    descrizione VARCHAR(100) NOT NULL,
    company     VARCHAR(100) NOT NULL,
    open_source BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE marca (
    id          INT         PRIMARY KEY AUTO_INCREMENT,
    brand       VARCHAR(50) NOT NULL,
    nazionalita VARCHAR(50) NOT NULL
);

CREATE TABLE smartphone (
    id                 INT           PRIMARY KEY AUTO_INCREMENT,
    nome               VARCHAR(100)  NOT NULL,
    ram                INT           NOT NULL COMMENT 'GB',
    cpu                VARCHAR(100)  NOT NULL,
    display_ppi        INT,
    display_size       DECIMAL(4,1)  COMMENT 'pollici',
    display_resolution VARCHAR(20),
    dimensioni         VARCHAR(50),
    peso               DECIMAL(6,1)  COMMENT 'grammi',
    note               TEXT,
    id_marca           INT           NOT NULL,
    id_os              INT           NOT NULL,
    FOREIGN KEY (id_marca) REFERENCES marca(id),
    FOREIGN KEY (id_os)    REFERENCES os(id)
);
