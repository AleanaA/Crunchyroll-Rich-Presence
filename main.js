// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
//const {dialog} = require('electron');
//const window = require('electron').BrowserWindow
//const {ipcMain} = require('electron')
//const http = require('http')
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
//  var data = JSON.parse('{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')["/?data"]
 // console.log(data)
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, title: 'Loading...', icon:'icon.png'})

  // and load the index.html of the app.
  mainWindow.loadURL('http://crunchyroll.com')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  mainWindow.webContents.on('new-window', newWindow);
  mainWindow.webContents.on('did-navigate', loadURL);
  mainWindow.on('page-title-updated', updateTitle);
  //mainWindow.webContents.on('did-navigate', () => {   mainWindow.addDevToolsExtension('/mnt/secondary/aleana/.config/chromium/Default/Extensions/ihegfgnkffeibpmnajnoiemkcmlbmhmi/0.10.4_0')
  //  injectScripts(mainWindow)
  //});
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//const requestHandler = (request, response) => {
//  console.log(request.url)

//if(data !== "closed_tab") {
//client.updatePresence({
//  details: data,
//  largeImageKey: 'crunchyroll',
//  instance: true,
//});
//} else {
//	process.exit()
//}
//}
//
//const server = http.createServer(requestHandler)

//server.listen(port, (err) => {
//  if (err) {
//    return console.log('Something bad happened', err)
//  }

//  console.log(`Server is listening on ${port}`)
//})
