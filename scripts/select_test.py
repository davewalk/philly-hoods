import json
import psycopg2

conn = psycopg2.connect('dbname=philly_hoods user=vagrant')

cur = conn.cursor()

# For locations/
cur.execute("SELECT name, alias, ST_AsGeoJSON(geom) FROM azavea_hoods WHERE ST_Contains(geom, ST_GeomFromText('POINT(-75.156083 39.939737)'));")

# For neighborhoods/
# cur.execute("SELECT name, alias, ST_AsGeoJSON(geom) FROM azavea_hoods WHERE name = 'Newbold';")

print cur.fetchone()

cur.close()
conn.close()

