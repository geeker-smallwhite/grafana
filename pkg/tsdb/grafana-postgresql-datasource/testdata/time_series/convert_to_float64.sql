-- SELECT * FROM tbl
-- in timeseries mode, most fields gets converted to float64
CREATE TEMPORARY TABLE tbl (
    "time" timestamp with time zone,
    v1 double precision,
    v1nn double precision NOT NULL,
    v2 real,
    v2nn real NOT NULL,
    t text,
    x1 smallint,
    x1nn smallint NOT NULL,
    x2 integer,
    x2nn integer NOT NULL,
    x3 bigint,
    x3nn bigint NOT NULL
);

INSERT INTO tbl ("time",
v1, v1nn, v2, v2nn,
t,
x1, x1nn, x2, x2nn, x3, x3nn) VALUES
('2023-12-21 11:30:03 UTC',
10.1, 11.1, 12.1, 13.1,
'one',
101, 102, 103, 104, 105, 106),
('2023-12-21 11:31:03 UTC',
NULL, 21.1, NULL, 23.1,
'one',
NULL, 202, NULL, 204, NULL, 206);