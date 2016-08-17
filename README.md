# ΛLΞXΛNDRIΛ Librarian

### Purpose
Alexandria is a protocol in development, designed to create a means for permissionless publishing, distribution and sales of digital content.  
Alexandria's application stack is composed of:  
####A network layer: 
Florincoin blockchain: Index of published media, including digital rights attribution and file transport information [local-wallet](https://github.com/florincoin/florincoin/) | [hosted-wallet](https://flovault.alexandria.io/) | [explorer](http://florincoin.info/)  
Bitcoin blockchain: The default payments network, but the protocol is payment token agnostic. [software](https://github.com/bitcoin/bitcoin/) | [hosted-wallet & explorer](https://blockchain.info/)  
IPFS Peer to Peer Network: The file distribution network. [software](ipfs.io) 
####API Layer/protocol daemon:  
[Libraryd](https://github.com/dloa/libraryd) (currently a private repo), a Go application to be run locally in the background on a user's machine, communicates via RPC with Florincoind and Bitcoind. [hosted-endpoint](https://api.alexandria.io/alexandria/v1/media/get/all)  
[Libraryd-JS](https://github.com/dloa/libraryd-js), a JS application run on web server front ends to allow interaction with a web-server hosted Florincoin blockchain.
####Application Layer:  
[Alexandria Browser](https://github.com/dloa/alexandria-browser): Two applications in one; first a web server hosted application to be used inside a web browser, [alexandria.io/browser/](http://alexandria.io/browser/), and second, a NodeJS standalone application to be used by end users, either with web-hosted API endpoints, or locally hosted API endpoints by users running Librarian.  
[Alexandria Librarian](https://github.com/dloa/alexandria-librarian): A NodeJS application with the purpose of installing, keeping up-to-date, and turning on and off the various daemons of the Alexandria application stack, to let users run a "full node" of Alexandria, which includes at least Libraryd, Florincoind, and IPFS Daemon. [See also](https://github.com/dloa/alexandria-librarian-old)  

###Librarian Details  
Runs a local web server API endpoint, allowing interaction with the user's settings and preferences, and GUI-less operation. Note: The primary use of Librarian is not to be looked at - users should open up a settings panel from time to time to make adjustments to things, but largely it should run exclusively in the background, managing daemons according to the user's preferences.
Runs as a Node-JS standalone application or in a browser window via the API endpoint (for example, http://localhost:12345)  

[![Build Status](https://travis-ci.org/dloa/alexandria-librarian.svg?branch=development)](https://travis-ci.org/dloa/alexandria-librarian)
[![Dependency Status](https://david-dm.org/dloa/alexandria-librarian.svg)](https://david-dm.org/dloa/alexandria-librarian) [![devDependency Status](https://david-dm.org/dloa/alexandria-librarian/dev-status.svg)](https://david-dm.org/dloa/alexandria-librarian#info=devDependencies) [![optionalDependency Status](https://david-dm.org/dloa/alexandria-librarian/optional-status.svg)](https://david-dm.org/dloa/alexandria-librarian#info=optionalDependencies)

![](http://i.imgur.com/azl3qlL.png)

### Getting Started

- `npm install`

To run the app in development:

- `npm start`

Running `npm start` will download and install [Electron](http://electron.atom.io/).

### Building & Release

- `npm run release`

## Architecture

### Overview

ΛLΞXΛNDRIΛ Librarian is an application built using [electron](https://github.com/atom/electron). While it's work in progress, the goal is to make ΛLΞXΛNDRIΛ Librarian a high-performance, portable Javascript ES6 application built with React and Flux (using [alt](https://github.com/goatslacker/alt). It adopts a single data flow pattern:

```
╔═════════╗       ╔════════╗       ╔═════════════════╗
║ Actions ║──────>║ Stores ║──────>║ View Components ║
╚═════════╝       ╚════════╝       ╚═════════════════╝
     ^                                      │
     └──────────────────────────────────────┘
```

There are three primary types of objects:
- **Actions**: Interact with the system
- **Views**: Views make up the UI, and trigger available actions.
- **Stores**: Stores store the state of the application.

and since ΛLΞXΛNDRIΛ Librarian has a large amount of interaction with outside systems, we've added utils:
- **Utils**: Utils interact with APIs, outside systems, CLI tools and generate. They are called by user-generated actions and in return, also create actions based on API return values, CLI output etc.

### Guidelines

- Avoid asynchronous code in Stores or Views. Instead, put code involving callbacks, promises or generators in utils or actions.

## Copyright and License

Code released under the [GPLv3](LICENSE.md).
