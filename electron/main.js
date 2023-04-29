const { app } = require("electron");
const { join } = require("path");
const { readFileSync } = require("fs");
const { createMainWindow } = require("./manager");

// reload mainWindow where save this file
require("electron-reload")(__dirname, { electron: app.getPath("exe"), hardResetMethod: "exit" });

app.whenReady().then(() => {
  // create mainWindow with dimensions and position
  const save = JSON.parse(readFileSync(join(__dirname, "positions.json")));
  createMainWindow(save);
});

// use IPC
require("../src/IPC");
