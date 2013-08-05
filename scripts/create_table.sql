CREATE TABLE "hoods"
(
	id serial NOT NULL PRIMARY KEY,
	name varchar(50) NOT NULL,
	alias varchar(50) NOT NULL,
	dataset varchar(20) NOT NULL,
	geom geometry(MultiPolygon)
)