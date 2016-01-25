import Promise from 'bluebird';
import audioMetaData from 'audio-metadata';
import path from 'path';
import fs from 'fs';
import {
    exec
}
from 'child_process';

module.exports = {
    audioTag(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path.normalize(filePath), (err, file) => {
                if (err) return reject(err);
                let meta = audioMetaData.id3v1(file);
                resolve(meta ? meta : audioMetaData.id3v2(file));
            });
        });
    },

    mediaInfo(file) {
        return new Promise((resolve, reject) => {
            let cmd = '"' + path.join(process.cwd(), 'resources/bin', ((process.platform === 'win32') ? 'mediaInfo.exe' : 'mediaInfo')) + '" --Inform="Audio;::%Duration%::%BitRate%" "' + path.normalize(file) + '"';
            exec(cmd, (error, stdout, stderr) => {
                if (error !== null || stderr !== '')
                    reject('MediaInfo exec error:', (error || stderr));
                else
                    resolve(stdout.replace('::', '').replace('\n', '').split('::'));
            });
        });
    }

}