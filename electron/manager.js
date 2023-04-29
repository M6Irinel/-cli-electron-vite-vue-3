const { join } = require("path");
const { writeFileSync } = require("fs");
const { BrowserWindow, ipcMain } = require("electron");

let mainWindow;

const createMainWindow = (save) => {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 800,
    ...save,
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, "bridge.js"),
    },
  });

  // FOR FAST DEV
  mainWindow.loadURL("http://localhost:3000/");

  // FOR BUILD
  // mainWindow.loadFile("./dist/index.html");

  // save dimensions and position from mainWindow
  mainWindow.on("move", () => writeFileSync(join(__dirname, "positions.json"), JSON.stringify(mainWindow.getBounds())));
};

// send data
const send = (channel, data) => {
  mainWindow.webContents.send(channel, data);
};

// on data
const on = (channel, handler) => {
  ipcMain.on(channel, (event, data) => handler(event, data));
};

// get mainWindow
const getMainWindow = () => mainWindow;

module.exports = { createMainWindow, send, on, getMainWindow };
