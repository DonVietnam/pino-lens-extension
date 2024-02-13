# pino-pretty-lens-extension

The pino-pretty-lens-extension provides a pino-pretty log viewer for Lens.

Inspiration came from the [bunyan-lens-ext ](https://github.com/jdinsel-xealth/bunyan-lens-ext) extension.

## Features

This plugin adds a menu item to the Pods menu in Lens. When clicked, it will open a new terminal with the pino-pretty log viewer.

## Requirements

Install pino-pretty globally:

```bash
npm install -g pino-pretty
```

## Installation Instructions

Start the Lens is running, and follow these simple steps:

1. Go to Extensions view (Menu -> File -> Extensions)
2. Enter the name of this extension, `@donvietnam/pino-pretty-lens-extension`
3. Click on the Install button
4. Make sure the extension is enabled (Lens → Extensions)

You may need to refresh (or re-open) Lens for the plugin to render the menu item. This may be necessary if Lens is already open on the Pods workload.

## Release Notes

### 1.0.0

Initial release of the pino-pretty-lens-extension contains minimal functionality and allows
for the viewing of Logs through the use of the `pino-pretty` command line tool.
