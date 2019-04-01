#!/usr/bin/env node

/**
 * AutoVer
 * Simple tool to automatically increment the version number inside the pakage.json
 *
 * @author Martin Albrecht <martin.albrecht@javacoffee.de>
 * @license MIT
 */
const AutoVer = require('./autover')

try {
    new AutoVer()
} catch (e) {
    console.error(e)
}