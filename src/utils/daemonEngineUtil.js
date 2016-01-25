import Promise from 'bluebird';
import child_process from 'child_process';
import DecompressZip from 'decompress-zip';
import fs from 'fs';
import child from 'child';
import path from 'path';
import ps from 'xps';
import ipfsAPI from 'ipfs-api';
import chmod from 'chmod';
import _ from 'lodash';
import {
	app, dialog
}
from 'remote';
import DaemonActions from '../actions/daemonEngineActions';
import DaemonStore from '../stores/daemonEngineStore';
import florincoindUtil from './daemon/florincoind';
import CommonUtil from './commonUtil';


const killPID = pid => {
	return new Promise((resolve, reject) => {
		ps.kill(pid).fork(
			error => {
				reject(error);
			}, () => {
				resolve(true);
			}
		);
	});
}

const exec = (execPath, args = [], options = {}) => {
	return new Promise((resolve, reject) => {
		child_process.exec(`${execPath} ${args.join(' ')}`, options, (error, stdout, stderr) => {
			if (error) {
				console.error(stderr);
				return reject(stderr)
			}
			console.log(stdout);
			resolve(stdout);
		});
	});
}

const generateAPI = daemon => {
	switch (daemon) {
		case 'ipfs':
			return ipfsAPI('/ip4/127.0.0.1/tcp/5001');
			break;
		case 'florincoind':
			return false;
			break;
		case 'libraryd':
			return false;
			break;
	}
}

const extractZIP = (sourcePath, targetPath) => {
	let files = [];
	return new Promise((resolve, reject) => {
		new DecompressZip(sourcePath)
			.on('error', reject)
			.on('extract', log => {
				files.forEach(file => chmod(path.join(targetPath, file.path), {
					read: true,
					write: true,
					execute: true
				}));
				resolve();
			})
			.extract({
				path: targetPath,
				filter: entry => {
					return files.push({
						path: entry.path,
						mode: entry.mode.toString(8)
					});
				}
			});
	});
}

const handelListener = (mode = 'install', daemon, input = '') => {
	return new Promise((resolve, reject) => {
		switch (daemon) {
			case 'ipfs':
				console.log(daemon + ':', input.toString());

				switch (mode) {
					case 'install':
						var okay = ['ipfs configuration file already exists', 'to get started, enter:', 'generating 2048-bit RSA keypair...done'];
						var fail = [];

						if (new RegExp(okay.join('|')).test(input)) {
							DaemonActions.enabling({
								id: 'ipfs',
								code: 3
							});
							resolve();
						} else {
							DaemonActions.enabling({
								id: 'ipfs',
								code: 8,
								error: 'Installation Error'
							});
							reject();
						}
						break;
					case 'enable':
						var okay = ['Daemon is ready'];
						var fail = ['no ipfs repo found', 'repo.lock": has non-zero size', 'ipfs daemon is running'];

						if (new RegExp(okay.join('|')).test(input)) {
							DaemonActions.enabling({
								id: 'ipfs',
								code: 7,
								update: {
									key: 'api',
									api: generateAPI('ipfs')
								}
							});

						} else if (new RegExp(fail.join('|')).test(input)) {
							DaemonStore.getState().enabled['ipfs'].daemon.stop();
							DaemonActions.enabling({
								id: 'ipfs',
								code: 8,
								error: 'Initialization Error'
							});
						}
						break;
				}
				break;
			case 'florincoind':
				switch (mode) {
					case 'enable':
						_.throttle(() => console.log(daemon + ':', input.toString()), 100)

						var okay = ['init message: Loading wallet'];
						var fail = ['FAIL'];

						if (new RegExp(okay.join('|')).test(input)) {
							console.info(input)
							DaemonActions.enabling({
								id: 'florincoind',
								code: 7
							});

						} else if (new RegExp(fail.join('|')).test(input)) {
							DaemonStore.getState().enabled['florincoind'].daemon.stop();
							console.error(input)
							DaemonActions.enabling({
								id: 'florincoind',
								code: 8,
								error: 'Initialization Error'
							});
						} else {
							parseSync('florincoind', input.split('\n'))
						}

						break;
				}
				break;
			case 'libraryd':
				console.log(daemon + ':', input.toString());
				switch (mode) {
					case 'enable':

						var okay = ['Listening on port 41289'];
						var fail = ['connectex: No connection could be made because the target machine actively refused it.', 'Only one usage of each socket address', 'Error reading json message: Authentication error.'];

						if (new RegExp(okay.join('|')).test(input)) {
							DaemonActions.enabling({
								id: 'libraryd',
								code: 7
							});

						} else if (new RegExp(fail.join('|')).test(input)) {
							DaemonStore.getState().enabled['libraryd'].daemon.stop();
							DaemonActions.enabling({
								id: 'libraryd',
								code: 8,
								error: 'Initialization Error'
							});
						} else {
							parseSync('libraryd', input.split('\n'))
						}

						break;
				}
				break;
		}
	});
}

const enablingThrottle = _.throttle(params => DaemonActions.enabling(params), 500);


const parseSync = (daemon, output) => {
	switch (daemon) {
		case 'florincoind':
			output.forEach(line => {
				if ((line.indexOf('SetBestChain: new best=') > -1) && (line.indexOf('progress=') > -1)) {
					let progress = line.split('progress=')[1];

					if (!isNaN(progress)) {
						progress = (progress * 100).toFixed(2);
						enablingThrottle({
							id: 'florincoind',
							code: 6,
							task: 'Syncing Blockchain: ' + progress + '%',
							percent: progress
						})
					}
				}
			});
			break;
		case 'libraryd':

			break;
	}
}


module.exports = {

	binDir: path.join('./', 'bin'),
	installDir: path.join(app.getPath('userData'), 'bin'),

	enable(daemon) {
		DaemonActions.enabling({
			id: daemon.id,
			code: 4
		});
		let installPath = path.join(this.installDir, this.getExecName(daemon.id));
		let daemonObj = this.generate({
			exec: installPath,
			id: daemon.id
		}, daemon.args, daemon.env);
		try {
			daemonObj.start(pid => {
				DaemonActions.enabled({
					daemon: daemonObj,
					id: daemon.id,
					pid: pid
				});
			});
		} catch (e) {
			console.error(e);
			DaemonActions.enabling({
				id: daemon.id,
				code: 8,
				error: 'Initialization Error'
			});
		}
	},

	disable(daemon) {
		if (DaemonStore.getState().enabled[daemon].daemon) {
			DaemonStore.getState().enabled[daemon].daemon.stop(DaemonActions.disabled.bind(this, daemon));
		}
		DaemonActions.disabled({
			id: daemon,
			code: 0
		});
	},

	install(daemon, unzip = false) {
		return new Promise((resolve, reject) => {
			DaemonActions.enabling({
				id: daemon.id,
				code: 2
			});
			if (!unzip) {
				let execName = this.getExecName(daemon.id)
				let installPath = path.join(this.installDir, execName);
				let sourcePath = path.join(this.binDir, execName);

				this.checkConfig(daemon.id)
					.then(CommonUtil.copy.bind(this, sourcePath, installPath))
					.then(() => {
						return new Promise(resolve => {
							chmod(installPath, {
								read: true,
								write: true,
								execute: true
							});
							resolve();
						});
					})
					.then(opts => {
						if (!(daemon.args.length > 0))
							return resolve();

						let execCMD = (process.platform === 'win32') ? installPath : "'" + installPath + "'";
						exec(execCMD, daemon.args, {
							cwd: this.installDir
						})
							.then(output => {
								handelListener('install', daemon.id, output.toString())
									.then(resolve)
									.catch(reject);
							})
							.catch(output => {
								handelListener('install', daemon.id, output.toString())
									.then(resolve)
									.catch(reject);
							});
					})
					.catch(reject);

			} else {
				this.checkConfig(daemon.id)
					.then(extractZIP.bind(this, this.getExecName(daemon.id, true), this.installDir))
					.then(this.checkConfig.bind(this, daemon))
					.catch(reject);

			}


		});
	},
	generate(daemon, args = [], env = {}, autoRestart = false, detached = false) {
		return child({
			command: daemon.exec,
			args: args,
			options: {
				detached: detached,
				cwd: this.installDir,
				env: _.defaultsDeep(env, process.env)
			},
			autoRestart: autoRestart,
			restartTimeout: 200,
			cbRestart: data => {
				if (data)
					console.log(daemon.id + ':', 'restarting with PID:', data.toString());
			},
			cbStdout: data => {
				if (data) {
					handelListener('enable', daemon.id, data.toString())
				}
			},
			cbStderr: data => {
				if (data) {
					handelListener('enable', daemon.id, data.toString())
				}
			},
			cbClose: exitCode => {
				if (exitCode) {
					console.log(daemon.id + ':', 'exiting with code:', exitCode.toString());
				}
			},
		});
	},
	checkInstalled(daemon) {
		DaemonActions.enabling({
			id: daemon,
			code: 1
		});
		let daemonPath = path.join(this.installDir, this.getExecName(daemon))
		return new Promise((resolve) => {
			fs.stat(daemonPath, (err, status) => {
				if (err) return resolve(false);
				resolve(status);
			});
		});
	},
	shutdown(daemon) {
		return new Promise((resolve, reject) => {
			if (daemon.daemon)
				daemon.daemon.stop(resolve);
			else
				return killPID(daemon.pid)
		});
	},
	checkRunning(daemon) {
		return new Promise((resolve, reject) => {
			ps.list().fork(
				error => {
					reject(error);
				},
				list => {
					resolve(_.filter(list, value => {
						if (value.name === daemon) return value;
					})[0]);
				}
			);
		});
	},
	checkConfig(daemon) {
		return new Promise((resolve, reject) => {
			switch (daemon) {
				case 'florincoind':
					return florincoindUtil.loadConf();
					break;
				default:
					return resolve();
			}
		});
	},
	getExecName(daemon, extract = false) {
		switch (daemon) {
			case 'ipfs':
				return (process.platform === 'win32') ? 'ipfs.exe' : 'ipfs';
				break;
			case 'florincoind':
				if (extract)
					return 'florincoind.zip'
				else
					return (process.platform === 'win32') ? 'florincoind.exe' : 'florincoind';
				break;
			case 'libraryd':
				return (process.platform === 'win32') ? 'libraryd.exe' : 'libraryd';
				break;

		}
	}
}