#!/bin/bash
# launch 'deb-maker.sh ia32 0.0.1' 

arch=$1
if [[ $arch == *"32"* ]]; then
  real_arch="i386"
else
  real_arch="amd64"
fi
cwd="build/deb-package/$arch"
name="ΛLΞXΛNDRIΛ Librarian"
github="https://github.com/dloa/alexandria-librarian"
projectName="alexandria-librarian"
description="Alexandria's background process manager."
icon="images/icons/librarian_icon.png"
author="Decentralized Library of Alexandria || Luigi Poole <luigipoole@outlook.com>"
version=$2
package_name=${name}-${version}-Linux-${real_arch}

### RESET
rm -rf build/deb-package

build () {

### SOURCE TREE
#create package dir
mkdir -p $cwd/$package_name

#create dir tree
mkdir -p $cwd/$package_name/usr/share/applications #desktop
mkdir -p $cwd/$package_name/opt/$projectName #app files
mkdir -p $cwd/$package_name/usr/share/icons #icon

### COPY FILES
#base
cp -r "dist/$name-linux-$arch/" $cwd/$package_name/opt/$projectName/

#icon
cp $icon $cwd/$package_name/usr/share/icons/$projectName.png

### CLEAN
shopt -s globstar
cd $cwd/$package_name/opt/$projectName
cd ../../../../../../
### CREATE FILES

#desktop
echo "[Desktop Entry]
Comment=$description
Name=$projectName
Exec=/opt/$projectName/$projectName
Icon=$projectName.png
StartupNotify=false
Categories=Productivity
Type=Application
" > $cwd/$package_name/usr/share/applications/$name.desktop

### DEBIAN
mkdir -p $cwd/$package_name/DEBIAN

#control
size=$((`du -sb $cwd/$package_name | cut -f1` / 1024))
echo "
Package: $name
Version: $version
Section: web
Priority: optional
Architecture: $real_arch
Installed-Size: $size
Depends:
Maintainer: $author
Description: $projectName
 $description
" > $cwd/$package_name/DEBIAN/control

#copyright
echo "Format: http://www.debian.org/doc/packaging-manuals/copyright-format/1.0
Upstream-Name: $projectName
Upstream-Contact: $author
Source: $github

Files: *
Copyright: (c) 2015, $author
License: GPL-3
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 .
 This package is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 .
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 .
 On Debian systems, the complete text of the GNU General
 Public License version 3 can be found in \`/usr/share/common-licenses/GPL-3'.
 " > $cwd/$package_name/DEBIAN/copyright

#postinstall script
#0777 is bad, but it allows to update & install vpn, and it's only 1 directory
echo "#!/bin/sh
set -e

# Work-around Menu item not being created on first installation
if [ -x /usr/bin/desktop-file-install ]; then
	desktop-file-install /usr/share/applications/$name.desktop
else
	chmod +x /usr/share/applications/$name.desktop
fi

# set permissions
if [ -e /opt/$projectName/$projectName ]; then
	chmod +x /opt/$projectName/$projectName
fi
" > $cwd/$package_name/DEBIAN/postinst

#pre-remove script
echo "#!/bin/sh
set -e

#remove app files
rm -rf /opt/$projectName

#remove icon
rm -rf /usr/share/icons/$projectName.png

#remove desktop
rm -rf /usr/share/applications/$name.desktop
" > $cwd/$package_name/DEBIAN/prerm

#post-remove script if purge
echo "#!/bin/sh
set -e

#remove config and db
if [ \"\$1\" = purge ]; then
	rm -rf \$HOME/.config/$projectName
fi
" > $cwd/$package_name/DEBIAN/postrm

### PERMISSIONS
chmod +x $cwd/$package_name/usr/share/applications/$name.desktop
chmod -R 0755 $cwd/$package_name/DEBIAN

### BUILD
cd $cwd
dpkg-deb --build $package_name

###Move Build to Release
cd ../../../
mv $cwd/$package_name.deb release
}

build
