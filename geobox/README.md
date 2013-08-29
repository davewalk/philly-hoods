# GeoBox - A hackbox for geo stuff

Props to [zhm](https://github.com/zhm/geobox) for the original. I've removed some things that I didn't need for my project.'

### Included in VM

* Ubuntu 12.04 Precise Pangolin
* GEOS 3.3.3
* Proj 4.7
* GDAL 1.9.1
* PostgreSQL 9.1
* PostGIS 2.0.1
* NodeJS stable (currently 0.8.x)
* Ruby 1.9.3 + Bundler
* osm2pgsql
* osmosis
* Imposm 2.4

### Requirements for host machine

* Ruby
* VirtualBox [Download](https://www.virtualbox.org/wiki/Downloads)
* Vagrant `gem install vagrant`

### Installation

    git clone https://github.com/davewalk/geobox
    cd geobox
    git submodule init
    git submodule update
    vagrant box add precise http://files.vagrantup.com/precise64.box

### Usage & Setup

to build the VM from the base image and ssh into it:

    vagrant up
    vagrant ssh

exiting ssh from the VM:

    exit

or to stop it from the host:

    vagrant suspend

to destroy the VM from the host (to either delete it completely or rebuild it):

    vagrant destroy

then to rebuild everything:

    vagrant up

Note: Starting the machine for the first time will take about 20-30 minutes since it builds ruby, node, and PostGIS from source.

### Connecting to PostgreSQL

To access the postgres instance from outside the VM (e.g. psql or pgAdmin), use 22.22.22.22 and username `vagrant` and password `vagrant`.
This can be convenient for loading data that's on your local machine or being able to use pgAdmin to get to the database.

### Hacking

If you want to add your own stuff, you will want to take a look at [default.rb](https://github.com/zhm/geobox/blob/master/cookbooks/core/recipes/default.rb). It has most of the hackish code that installs and sets up the box. Improvements are welcome since I have no idea what I'm doing.
