const { send, on } = require("../electron/manager");

// use ipcMain for on
on("send", (e, data) => {
  console.log(data);

  // use webContents from mainWindow for send
  send("rev-send", "Your version Electron is " + process.versions.electron);
});
