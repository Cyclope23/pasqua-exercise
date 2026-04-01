-- ============================================================
--  DML - Popolamento DB Device Mobile
-- ============================================================

INSERT INTO os (descrizione, company, open_source) VALUES
    ('Android 13',  'Google',   TRUE),
    ('Android 14',  'Google',   TRUE),
    ('iOS 16',      'Apple',    FALSE),
    ('iOS 17',      'Apple',    FALSE),
    ('HarmonyOS 4', 'Huawei',   FALSE);

INSERT INTO marca (brand, nazionalita) VALUES
    ('Samsung',  'Corea del Sud'),
    ('Apple',    'Stati Uniti'),
    ('Huawei',   'Cina'),
    ('Xiaomi',   'Cina'),
    ('OnePlus',  'Cina');

INSERT INTO smartphone
    (nome, ram, cpu, display_ppi, display_size, display_resolution,
     dimensioni, peso, note, id_marca, id_os) VALUES
    ('Galaxy S21',          6,  'Exynos 2100 octa-core',         421, 6.2,  '1080x2400', '151.7x71.2x7.9', 169.0, NULL,                        1, 1),
    ('Galaxy A54',          8,  'Exynos 1380 octa-core',         403, 6.4,  '1080x2340', '158.2x76.7x8.2', 202.0, 'Serie Galaxy mid-range',    1, 2),
    ('Galaxy J5',           2,  'Snapdragon 410 dual-core',      267, 5.0,  '1080x1920', '142.1x71.8x7.9', 146.0, 'Serie Galaxy entry-level',  1, 1),
    ('Galaxy J7',           3,  'Exynos 7580 dual-core',         282, 5.5,  '1080x1920', '152.4x78.4x7.9', 170.0, 'Serie Galaxy entry-level',  1, 1),
    ('Galaxy S23 Ultra',   12,  'Snapdragon 8 Gen 2',            500, 6.8,  '1440x3088', '163.4x78.1x8.9', 234.0, 'Serie Galaxy top di gamma', 1, 2),
    ('iPhone 14',           6,  'Apple A15 Bionic',              460, 6.1,  '1170x2532', '146.7x71.5x7.8', 172.0, NULL,                        2, 3),
    ('iPhone 15 Pro',       8,  'Apple A17 Pro',                 460, 6.1,  '1179x2556', '146.6x70.6x8.3', 187.0, NULL,                        2, 4),
    ('P50 Pro',             8,  'Snapdragon 888 octa-core',      460, 6.6,  '1228x2700', '159.2x73.0x8.9', 195.0, NULL,                        3, 5),
    ('Xiaomi 13',           8,  'Snapdragon 8 Gen 2',            413, 6.36, '1080x2400', '152.8x71.5x7.9', 189.0, NULL,                        4, 2),
    ('Xiaomi Redmi 9',      3,  'MediaTek Helio G80 octa-core',  269, 6.53, '1080x2340', '162.3x77.3x9.1', 198.0, NULL,                        4, 1),
    ('OnePlus 11',          8,  'Snapdragon 8 Gen 2',            525, 6.7,  '1440x3216', '163.1x74.1x8.5', 205.0, NULL,                        5, 2);
