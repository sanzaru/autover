/**
 * AutoVer
 * Simple tool to automatically increment the version number inside the pakage.json
 *
 * @author Martin Albrecht <martin.albrecht@javacoffee.de>
 * @license MIT
 */
const fs = require('fs')
const path = require('path')

// Some globals
const cwd = process.cwd()
const packagePath = path.join(cwd, '/package.json')

/**
 * The main AutoVer class
 * @class
 */
module.exports = class AutoVer {
    constructor() {
        // Read package.json content
        this.packageJsonContent = null
        this._readPackageJson()

        // Initialize the scheme
        this.scheme = {
            major: false,
            minor: false,
            patch: true
        }
        this._setScheme()

        // Initialize version
        this.version = {
            major: 0,
            minor: 0,
            patch: 0
        }
        this._parseVersion()

        // Increment version and write new content
        this._incrementVersion()
        this._writeNewContent()
    }

    /**
     * Return version array as formatted string
     */
    _formatVersion() {
        const parts = []

        for (let key in this.version) {
            parts.push(this.version[key])
        }

        return parts.join('.')
    }

    /**
     * Write the new content to package.json file
     */
    _writeNewContent() {
        this.packageJsonContent.version = this._formatVersion()
        fs.writeFileSync(packagePath, JSON.stringify(this.packageJsonContent, null, "\t"))
    }

    /**
     * Read in the package.json
     * @throws
     */
    _readPackageJson() {
        if (fs.existsSync(packagePath)) {
            this.packageJsonContent = JSON.parse(fs.readFileSync(packagePath))
        } else {
            throw (new Error(`Cannot find package.json in ${packagePath}`))
        }
    }

    /**
     * Increment version number based on chosen scheme
     */
    _incrementVersion() {
        if (this.scheme.major) {
            this.version.major++
            this.version.minor = 0
            this.version.patch = 0
        } else if (this.scheme.minor) {
            this.version.minor++
            this.version.patch = 0
        } else {
            this.version.patch++
        }
    }

    /**
     * Parse version number into internal array
     * @throws
     */
    _parseVersion() {
        if (this.packageJsonContent) {
            if (!this.packageJsonContent.hasOwnProperty('version')) {
                throw (new Error('Cannot find property "version in package.json"'))
            }

            const parts = this.packageJsonContent.version.split('.')
            if (!parts.length || parts.length !== 3) {
                throw (new Error(`Invalid version scheme. Expected: x.x.x, have ${this.packageJsonContent.version}`))
            }

            this.version.major = parseInt(parts[0], 10) || 0
            this.version.minor = parseInt(parts[1], 10) || 0
            this.version.patch = parseInt(parts[2], 10) || 0
        }
    }

    /**
     * Determine which part of the version number to change
     */
    _setScheme() {
        if (process.argv.indexOf('--major') !== -1) {
            this.scheme.major = true
            this.scheme.minor = false
            this.scheme.patch = false
        } else if (process.argv.indexOf('--minor') !== -1) {
            this.scheme.major = false
            this.scheme.minor = true
            this.scheme.patch = false
        }
    }
}