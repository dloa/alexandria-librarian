import Promise from 'bluebird';
import path from 'path';
import request from 'request';
import twitter from 'twitter';
import acoustid from 'node-acoustid';

module.exports = {
    findtxid: function(txid) {
        return new Promise((resolve, reject) => {
            var payload = {
                protocol: 'publisher',
                'search-on': 'txid',
                'search-for': txid
            };

            this.get('http://libraryd.alexandria.media/alexandria/v1/search', payload)
                .then(function(response) {
                    console.log(response)
                });


        }).bind(this);
    },
    verify_song: function(tweetid, txid, song) {
        if (!this.twitterClient)
            this.authTwitter();

    },
    verify_tweet: function(tweetid, txid) {
        if (!this.twitterClient)
            this.authTwitter();


    },
    authTwitter: function() {
        this.twitterClient = new Twitter({
            consumer_key: 'pvVMheQrbLpVf5S0ZFB2kDFfh',
            consumer_secret: '6HwpjVBGCGO0TrQ4GrsMc4FbbVnS7wmLcKwGQbZp9aAPvH0Zzp',
            access_token_key: '6661012-wKLHzit2xUDbMGlF0i7LzQXPcpDDmKA1Zp3mjl0Qfx',
            access_token_secret: 'Cj5qqv5ysn8Siec8BZ0D3SNKolz8Yr3IoCSAPKtkj0AGj'
        });
    },
    get: function(url) {
        return new Promise((resolve, reject) => {
            request(url, function(err, response, body) {
                if (err || response.statusCode !== 200)
                    return reject(err || body)
                resolve(body);
            })
        });
    },
    post: function(url, params) {
        return new Promise((resolve, reject) => {
            request.post({
                url: url,
                form: params
            }, function(err, response, body) {
                if (err || response.statusCode !== 200)
                    return reject(err || body);
                resolve(body);
            })
        });
    }
}