CREATE TABLE "hoods"
(
	id serial NOT NULL PRIMARY KEY,
	name varchar(50) NOT NULL,
	alias varchar(50) NOT NULL,
	dataset varchar(20) NOT NULL,
	geom geometry
)

ALTER TABLE hoods ADD CONSTRAINT enforce_geotype_geom CHECK (geometrytype(geom) = 'MULTIPOLYGON'::text OR geom IS NULL);
ALTER TABLE hoods ADD CONSTRAINT enforce_dims__geom CHECK (st_ndims(geom) = 2);