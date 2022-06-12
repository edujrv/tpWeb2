-- database 'campeonato'
-- Table: public.scoreboard

-- DROP TABLE IF EXISTS public.scoreboard;

CREATE TABLE IF NOT EXISTS public.scoreboard
(
    id bigserial NOT NULL,
    numero_fecha character varying COLLATE pg_catalog."default",
    local character varying COLLATE pg_catalog."default",
    goles_local bigint,
    goles_visit bigint,
    visitante character varying COLLATE pg_catalog."default",
    CONSTRAINT scoreboard_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.scoreboard
    OWNER to postgres;
	
-- select * from scoreboard;
