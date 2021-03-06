'use strict';

const { dedupe_syn } = require('../../native/index.node');

/**
 * Exposes a post function to dedupe synonyms on features
 * And also ensure that synonyms do not exceed the 10 Synonym limit
 * @param {Object} feat     GeoJSON Feature to dedupe
 * @param {Object} opts
 * @return {Object}         Output GeoJSON feature to write to output
 */
function post(feat, opts = {}) {
    if (!feat || !feat.properties || !feat.properties['carmen:text']) return feat;

    Object.keys(feat.properties)
        .filter((k) => {
            // Support multi-lingual carmen:text tags
            return k.indexOf('carmen:text') === 0;
        })
        .forEach((k) => {
            const names = dedupe_syn(feat.properties[k]);

            if (names.length > 10) {
                if (opts.warn) {
                    opts.warn.write(`WARN: too many synonyms - truncating!: ${feat.properties[k]}\n`);
                }
            }

            // Names should never exceed 10 syns
            feat.properties[k] = names.splice(0, 10).join(',');
        });


    if (feat.properties['carmen:text'].length === 0) {
        if (opts.warn) {
            opts.warn.write('WARN: no text values - omitting!\n');
        }

        return;
    }


    return feat;
}

module.exports.post = post;
