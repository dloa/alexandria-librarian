#!/bin/bash

grunt release --arch=ia32 --platform=linux && grunt shell:packageDEB --arch=ia32
grunt release --arch=x64 --platform=linux && grunt shell:packageDEB --arch=x64