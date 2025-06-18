#!/usr/bin/sh

# Check root permissions
if [ "$(id -u)" -ne 0 ]; then
    echo "Please run this script as root or using sudo!"
	exit 1
fi

# Update package list and install conntrack
apt-get update -y
apt-get upgrade -y
apt install -y conntrack

# Install Minikube
curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
install minikube-linux-amd64 /usr/local/bin/minikube && rm -f minikube-linux-amd64
