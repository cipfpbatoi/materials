#!/bin/bash


wget http://security.debian.org/debian-security/dists/bullseye-security/main/i18n/Translation-en.xz;
mkdir -p /var/www/html/deb_new/mirror/security.debian.org/debian-security/dists/bullseye-security/main/i18n
mv Translation-en.xz /var/www/html/deb_new/mirror/security.debian.org/debian-security/dists/bullseye-security/main/i18n

for dist in main contrib non-free; do

    wget http://security.debian.org/debian-security/dists/bullseye-security/updates/${dist}/i18n/Translation-en.xz;
    mkdir -p /var/www/html/deb_new/mirror/security.debian.org/debian-security/dists/bullseye-security/updates/${dist}/i18n
    mv Translation-en.xz /var/www/html/deb_new/mirror/security.debian.org/debian-security/dists/bullseye-security/updates/${dist}/i18n/
done
