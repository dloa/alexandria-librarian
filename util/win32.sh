#!/bin/bash

grunt release --arch=ia32 --platform=win32 && makensis -v3 util/win32/installer_makensis_ia32.nsi;
grunt release --arch=x64 --platform=win32 && makensis -v3 util/win32/installer_makensis_x64.nsi;