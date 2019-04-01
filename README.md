# @sanzaru/autover
Simple tool to automatically increment the version number inside a pakage.json file of a nodeJS project. You can specify which part of the version to increment (major, minor, patch).

> **Note:** You have to use a semantic versioning. Any custom versioning scheme is not supported, yet. More information about semantic versioning can be found on https://semver.org

## Requirements
* NodeJS >= 10.x.x: http://nodejs.org

> The script could alsp run on older versions of NodeJS, but were never tested with them.

## Getting started
Install the package
```sh
npm install @sanzaru/autover --save-dev
```

To increment the version number you can either run the script manually

```sh
node node_modules/@sanzaru/autover/dist/autover.js
```

or via npm script
```json
{
    "scripts": {
        "autover": "autover"
    }
}
```

This will increase the patch version inside the package.json file.

### Options
You can specify which part of the version number to change via command line arguments. Providing no arguments will increase the patch version.

**--major:** Increase the major version. This will set minor and patch to 0.

**--minor:** Increase the minor version. This will set patch to 0.

**--patch:** Increase the patch version.

**Example:**
```sh
./node_modules/@sanzaru/autover/dist/autover.js --minor
```

```json
{
    "scripts": {
        "autover": "autover",
        "autover:minor": "autover --minor"
    }
}
```

After running the script the version inside the package.json file will be changed.

## Development
> This section is only revelant if you want to build your own version of autover. For simple usage the upper part of this document is all you need.

For the development repository visit: https://github.com/sanzaru/autover

### Installation
Install all dependencies
```sh
npm install
```

### Build the code
```sh
npm run build
```

**Important:** You should create a seperate package.json file for testing, otherwise you overwrite the project's version number.