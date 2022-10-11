#!/bin/bash

for p in "${1:-jammy}"{,-{security,updates,backports}}/{main,restricted,universe,multiverse};
  do >&2 echo "${p}"
	wget -q -c -r -np -R "index.html*" "http://es.archive.ubuntu.com/ubuntu/dists/${p}/cnf/Commands-amd64.xz"
	wget -q -c -r -np -R "index.html*" "http://es.archive.ubuntu.com/ubuntu/dists/${p}/cnf/Commands-i386.xz"
	wget -q -c -r -np -R "index.html*" "http://es.archive.ubuntu.com/ubuntu/dists/${p}/dep11/icons-48x48@2.tar.gz"
	wget -q -c -r -np -R "index.html*" "http://es.archive.ubuntu.com/ubuntu/dists/${p}/dep11/icons-64x64@2.tar.gz"
	wget -q -c -r -np -R "index.html*" "http://es.archive.ubuntu.com/ubuntu/dists/${p}/dep11/icons-128x128@2.tar.gz"
done
