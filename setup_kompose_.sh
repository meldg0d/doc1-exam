#!/usr/bin/sh

# Check root permissions
if [ "$(id -u)" -ne 0 ]; then
    echo "Please run this script as root or using sudo!"
	exit 1
fi

curl -L https://github.com/kubernetes/kompose/releases/download/v1.35.0/kompose-linux-amd64 -o kompose
install kompose /usr/local/bin/kompose
rm kompose

exit 0
