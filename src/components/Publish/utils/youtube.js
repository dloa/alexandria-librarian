import Promise from 'bluebird';
import remote from 'remote';
import path from 'path';
import Youtube from 'youtube-api';
var browserWindow = remote.require('browser-window');

import publishStore from '../../stores/publishStore';
import publishActions from '../../actions/publishActions';


module.exports = {
    getAuthorization: function() {
        var authWindow = new browserWindow({
            'use-content-size': true,
            center: true,
            show: false,
            resizable: false,
            'always-on-top': true,
            'standard-window': true,
            'auto-hide-menu-bar': true,
            'node-integration': false
        });

        var oauth2Client = Youtube.authenticate({
            type: "oauth",
            client_id: '505529391426-bgan2gpcpbfjmci5e6gv6p17m25b36ic.apps.googleusercontent.com',
            client_secret: '1VytBoacd7a9-kNb3VnCEQ0_',
            redirect_url: 'http://localhost'
        });


        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/youtube.force-ssl']
        });

        authWindow.loadUrl(authUrl);
        authWindow.show();
        return new Promise((resolve, reject) => {
            authWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl) {

                var raw_code = /code=([^&]*)/.exec(newUrl) || null,
                    code = (raw_code && raw_code.length > 1) ? raw_code[1] : null,
                    error = /\?error=(.+)$/.exec(newUrl);
                if (code || error) {
                    authWindow.close();
                }
                if (code) {
                    oauth2Client.getToken(code, function(err, tokens) {
                        if (!err) {
                            publishActions.youtubeAuthorized(tokens);
                            oauth2Client.setCredentials(tokens);
                            resolve(tokens);
                        } else {
                            alert('Oops! Something went wrong: ' + err);
                        }
                    });
                } else if (error) {
                    alert("Oops! Something went wrong and we couldn't log you in using Youtube. Please try again.");
                }
            });
        });
    },
    download: function() {
        return new Promise((resolve, reject) => {

        });
    },
    getContent: function(pid) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.getUploadPlaylists()
                .then(function(pids) {
                    let totalitems = [];
                    let checked = 0;
                    pids.forEach(function(pid) {
                        self.getPlaylistItems(pid)
                            .then(function(uploads) {
                                checked++;
                                uploads.items.forEach(function(item) {
                                    totalitems.push(item.snippet)
                                });
                                if (checked === pids.length) {
                                    publishActions.youtubeContent(totalitems);
                                    resolve(totalitems);
                                }
                            })
                    });
                })
        });

    },
    getPlaylistItems: function(playlist) {
        return new Promise((resolve, reject) => {
            Youtube.playlistItems.list({
                playlistId: playlist,
                part: 'snippet',
                maxResults: 50
            }, function(err, data) {
                if (err)
                    return reject(err);
                resolve(data)
            });
        });
    },
    getUploadPlaylists: function() {
        return new Promise((resolve, reject) => {
            Youtube.channels.list({
                mine: true,
                part: 'contentDetails'
            }, function(err, data) {
                if (err)
                    return reject(err);
                var uploadPlaylists = [];
                data.items.forEach(function(item) {
                    uploadPlaylists.push(item.contentDetails.relatedPlaylists.uploads);
                });
                resolve(uploadPlaylists);
            });
        });
    },
    info: function(url, creds) {
        return new Promise((resolve, reject) => {

        });
    }
}