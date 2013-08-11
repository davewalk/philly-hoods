# Philly Hoods - A neighborhood API for Philadelphia (coming soon!)

Use this API to find out what neighborhood you're in. 

You can give it a neighborhood name:

`/v1/neighborhoods/bella vista`

or a pair of coordinates in Web Mercator:

`/v1/locations/39.952335,-75.163789`

### About the Data

The neighborhood boundaries dataset used in this API is graciously provided by [Azavea](http://www.azavea.com) under a  [Creative Commons Attribution 3.0](http://creativecommons.org/licenses/by/3.0/us/) license meaning it can be freely used and shared. Azavea is not involved in any way with this project.  

Please also keep in mind that there is no official neighborhood boundary dataset. There are many different versions for Philadelphia, I just think Azavea's is the best. In the future I'd like to include others (see below) to give the user more options.

### Future
In the future this API may be able to:
* Take an address and tell you the neighborhood
* Take coordinates pairs for coordinates systems besides Web Mercator
* Include other neighborhood boundaries besides Azavea's
* POST a GeoJSON line or polygon geometry and tell you which neighborhood(s) it's in

Have a question or want to help? Open an issue or contact me [@ddw17](http://www.twitter.com/ddw17) 