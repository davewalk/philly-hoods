%w[wget curl ack python-software-properties autoconf bison flex libyaml-dev libtool make vim].each do |pkg|
  package pkg do
    action :install
  end
end

install_prefix = "/usr/local"

["add-apt-repository ppa:ubuntugis/ubuntugis-unstable -y", "apt-get update"].each do |cmd|
  execute cmd do
    user "root"
  end
end

# Geo packages
%w[
  libproj-dev
  libgeos-dev
  libgdal-dev
  gdal-bin
  python-dev
  python-setuptools
  python-pip
  python-gdal
  postgresql-9.1
  postgresql-server-dev-9.1
  postgresql-plpython-9.1
  libjson0-dev
  libxslt-dev
  unzip
  unp
  osm2pgsql
  osmosis
  protobuf-compiler
  libprotobuf-dev
  libtokyocabinet-dev
  python-psycopg2
].each do |pkg|
  package pkg do
    action :install
  end
end

install_prefix = "/usr/local"

execute "apt-get update" do
  user "root"
end

execute "install PostGIS 2.x" do
  command <<-EOS
    if [ ! -d /usr/local/src/postgis-2.0.1 ]
    then
      cd /usr/local/src &&
      wget http://postgis.org/download/postgis-2.0.1.tar.gz &&
      tar xfvz postgis-2.0.1.tar.gz &&
      cd postgis-2.0.1 &&
      ./configure &&
      make &&
      make install &&
      ldconfig &&
      make comments-install &&
      ln -sf /usr/share/postgresql-common/pg_wrapper /usr/local/bin/shp2pgsql &&
      ln -sf /usr/share/postgresql-common/pg_wrapper /usr/local/bin/pgsql2shp &&
      ln -sf /usr/share/postgresql-common/pg_wrapper /usr/local/bin/raster2pgsql &&
      curl -s https://raw.github.com/gist/c83798ee55a08b7a5de5/813a2ba7543697789d2b5af6fae2cabf547cef54/pg_hba.conf -o /etc/postgresql/9.1/main/pg_hba.conf &&
      curl -s https://raw.github.com/gist/bdf5accb7b328f7f596a/0f3a969132150655c861e2ea22852fdd16eac02c/postgresql.conf -o /etc/postgresql/9.1/main/postgresql.conf &&
      /etc/init.d/postgresql restart &&
      echo "CREATE ROLE philly-hoods LOGIN;"                  | psql -U postgres &&
      echo "CREATE DATABASE philly-hoods;"                    | psql -U postgres &&
      echo "ALTER USER philly-hoods SUPERUSER;"               | psql -U postgres &&
      echo "ALTER USER vagrant WITH PASSWORD 'philadelphia';" | psql -U postgres &&
      echo "CREATE DATABASE template_postgis;"           | psql -U postgres &&
      echo "CREATE EXTENSION postgis;"                   | psql -U postgres -d template_postgis &&
      echo "CREATE EXTENSION postgis_topology;"          | psql -U postgres -d template_postgis &&
      echo "GRANT ALL ON geometry_columns TO PUBLIC;"    | psql -U postgres -d template_postgis &&
      echo "GRANT ALL ON spatial_ref_sys TO PUBLIC;"     | psql -U postgres -d template_postgis
    fi
  EOS
  action :run
  user 'root'
end

ENV['PATH'] = "/home/#{node[:user]}/local:#{ENV['PATH']}"

directory "/home/#{node[:user]}/local" do
  owner node[:user]
  group node[:user]
  mode "0755"
  action :create
end

directory "/home/#{node[:user]}/local/src" do
  owner node[:user]
  group node[:user]
  mode "0755"
  action :create
end

directory "#{install_prefix}/src" do
  owner "root"
  group "root"
  mode "0755"
  action :create
end

execute "install pip" do
  command "easy_install pip"
  action :run
  user 'root'
end