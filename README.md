# `generator-konga`

## Overview

This is Konga's Yeoman generator. It scaffolds a fully working Konga application, with the sample metadata of a TODO list. 

## Installation

If you don't have Yeoman installed, you must install it first:

```
npm install -g yo
```

* Install `generator-konga` typing `npm install -g generator-konga`.
* Go to your workspace.
* Create a new application via `yo konga my-app-name`.
* Done! You have a working konga app under _my-app-name_ folder. Go there and launch it with `grunt serve`.

### Installation options

TODO

## Submodule generators

Along with crafting your application, `generator-konga` helps you throughout all your app's lifecycle by providing you several generators for konga items:

* `konga:entity`: Generate a new metadata entity via a step-by-step terminal prompt.
* `konga:config`: Add a new configuration parameter globally for your application.
* `konga:action`: Generate a custom action.

## Grunt tasks

TODO