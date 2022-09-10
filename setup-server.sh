#!/bin/bash

sudo apt-get install -y

# Install docker
echo "Installing docker"
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common -y

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo apt-key fingerprint 0EBFCD88

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt-get install docker-ce docker-ce-cli containerd.io -y

# Run docker without sudo
sudo usermod -aG docker $USER
echo "Docker installation complete."

# Install docker-compose
echo "Installing docker-compose"
sudo apt-get update -y
sudo apt-get install docker-compose-plugin
echo "docker-compose installation complete."

