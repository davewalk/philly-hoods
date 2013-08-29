require 'json'

Vagrant.configure("2") do |config|
  config.vm.box = "precise"

  config.vm.network :forwarded_port, guest: 80, host: 8000
  config.vm.network :forwarded_port, guest: 3000, host: 3030
  config.vm.network :forwarded_port, guest: 3001, host: 3001
  config.vm.network :forwarded_port, guest: 4000, host: 4000
  config.vm.network :forwarded_port, guest: 8080, host: 8080

  config.vm.synced_folder "../", "/philly-hoods"

  config.vm.network :private_network, ip: "22.22.22.22"

  json = JSON.parse(File.open('solo.json').read)

  config.vm.provision :chef_solo do |chef|
    json['run_list'].each do |recipe|
      chef.add_recipe recipe
    end
    chef.json = { :user => 'vagrant' }
  end
end
