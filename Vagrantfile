# -*- mode: ruby -*-
# vi: set ft=ruby :


Vagrant.configure(2) do |config|
  config.vm.box = "hashicorp/precise32"

  config.vm.network "forwarded_port", guest: 8080, host: 8080
  
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
	apt-get install -y curl
	curl -sL https://deb.nodesource.com/setup_4.x | sh
	apt-get install -y nodejs
	
	npm install --no-sys-links express
	
	# Node will not run app.js out of a remote directory
	cp /vagrant/app.js .
	
  SHELL

end
