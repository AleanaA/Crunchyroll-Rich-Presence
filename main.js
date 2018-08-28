// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const client = require('discord-rich-presence')('460310843792293897');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function newWindow(event,url) {
  console.log("New window, url: " + url)
}
function updateTitle(event,title) {
  console.log("New title: " + title)
  var data = title
  if (data.includes("Season")) {
    var name = data.substring(0, data.lastIndexOf("Season"))
    console.log(name)
    var season = data.substring(data.indexOf("Season"), data.indexOf("Episode"))
    var episode = data.substring(data.indexOf("Episode"), data.lastIndexOf(" - Watch on Crunchyroll"))
    var wintitle = season +  '- ' + episode
    console.log(wintitle)
    var state = name + ' - ' + wintitle
  } else if (data.includes("Crunchyroll - Watch Naruto Shippuden, Bleach, Anime Videos and Episodes Free Online")) {
    var name = "Not Playing"
  } else if (data.includes("Episode")) {
    var name = data.substring(0, data.lastIndexOf("Episode"))
    console.log(name)
    var episode = data.substring(data.indexOf("Episode"), data.lastIndexOf(" - Watch on Crunchyroll"))
    var wintitle = 'Season 1 - ' + episode
    console.log(wintitle)
    var state = name + ' - ' + wintitle
  } else {
    var name = "Not Playing"
  }
  if (wintitle) {
    client.updatePresence({
      details: name,
      state: wintitle,
      largeImageKey: 'crunchyroll',
      instance: true,
    });
  } else {
    client.updatePresence({
      details: name,
      largeImageKey: 'crunchyroll',
      instance: true,
    });
  }
}
function loadURL(event,url) {
  console.log("Loaded Page, url: " + url)
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, title: 'Loading...', icon:'icon.png', webPreferences: {nodeIntegration: false}})

  // and load the index.html of the app.
  mainWindow.loadURL('http://crunchyroll.com')
  mainWindow.webContents.on('new-window', newWindow);
  mainWindow.webContents.on('did-navigate', loadURL);
  mainWindow.on('page-title-updated', updateTitle);
  mainWindow.setMenu(null);
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('ready', function() {
  console.log ('addDevToolsExtension: ' + BrowserWindow.addDevToolsExtension ('CrunchyrollHTML5'))
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

//  console.log(`Server is listening on ${port}`)
//})
