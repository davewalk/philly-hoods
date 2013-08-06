# Philly Hoods - A neighborhood API for Philadelphia

Use this API to find out what neighborhood you're in. Give it a pair of coordinates and it'll tell you:

You can also give it a neighborhood's name to get that neighborhood's geometry in GeoJSON format:

Yes, you can specify callbacks. Sigh:

That's it for now.

### About the Data

The neighborhood boundaries dataset used in this API is graciously provided by [Azavea](http://www.azavea.com) under a  [Creative Commons Attribution 3.0](http://creativecommons.org/licenses/by/3.0/us/) license meaning it can be freely used and shared. Azavea is not involved in any way with this project.  

Please also keep in mind that there is no official neighborhood boundary dataset. There are many different versions for Philadelphia, I just think Azavea's is the best. In the future I'd like to include others (see below) to give the user more options.

### Installation

This repo's Vagrant box is based off of the [geobox](https://github.com/zhm/geobox) Vagrant box repo. I basically took out the stuff I didn't need for this app and tried not to screw it up. Full installation instructions coming soon...

### Future
In the future this API may be able to:
* Take an address and tell you the neighborhood
* Take coordinates systems besides Web Mercator
* Include other neighborhood boundaries besides Azavea's

Have a question or want to help? Open an issue or contact me [@ddw17](http://www.twitter.com/ddw17) 