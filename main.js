"use strict";

// Import parts of electron to use
const electron = require("electron");
const { app, BrowserWindow } = electron;
const path = require("path");
const url = require("url");

let mainWindow;

// Keep a reference for dev mode
let dev = false;
if (process.env.NODE_ENV !== "production") {
  dev = true;
}

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    minHeight: height,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: true,
      webSecurity: false
    }
  });

  // and load the index.html of the app.
  let indexPath;
  if (dev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:1234",
      pathname: "/",
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true
    });
  }
  mainWindow.loadURL(indexPath);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    if (dev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
