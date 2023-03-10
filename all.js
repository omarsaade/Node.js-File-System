pwd command   (print working directory)
unlink command   (delete file)
rm a.txt zoom.txt (delete multiple file or dir at the same time)
rm -rf dir    (delete directory recursively force)
dont use -rf / ..it will delete ur operating system..
its very dangerous



A file is a sequence of bits
we have three different ways to do the same exact thing in nodejs
we could use 
      
      Promises API   (Async)
      Callback API   (Async)
      Synchronous API

  we have three different ways to do the same exact thing in nodejs using
  the file system actually "fs"

Fa nehna fina na3mul for example create file using one of them
so we have these three ways of doing the same thing

const fs = require("fs/promises");

// ******* Promise API ********* //

(async () => {
  try {
    await fs.copyFile("text.txt", "copied-promise.txt");
  } catch (error) {
    console.log(error);
  }
})();

// ******* Callback API ********* //

const fs = require("fs");

fs.copyFile("text.txt", "copied-promise.txt", (error) => {
  if (error) {
    console.log(error);
  }
});

// ******* Synchronous API ********* //

const fs = require("fs");
fs.copyFileSync("text.txt", "copied-promise.txt");

===================================


const fs = require("fs/promises");
// const content = fs.readFileSync("./text.txt");
// console.log(content.toString("utf-8"));

====================================================



// import { watch } from "node:fs";
// // Example when handled through fs.watch() listener
// watch("./tmp", { encoding: "buffer" }, (eventType, filename) => {
//   if (filename) {
//     console.log(filename);
//     // Prints: <Buffer ...>
//   }
// });

const fs = require("fs/promises");

(async () => {
  //                    watch the whole directory ("./")
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    // if (event.eventType === "change" && event.filename === "command.txt") {
    if (event.eventType === "change") {
      // the file was changed...
      console.log("The file was changed.");
    }
  }
})();


==========================================


/*
open (32 33 d3) these numbers are called a file descriptor
each opened file has a unique file descriptor
its like an id..so each file when we open has a unique file descriptor
read or write
*/

A <FileHandle> object is an object wrapper for a numeric file descriptor.




========================================




const fs = require("fs/promises");

/*
open (32 33 d3) these numbers are called a file descriptor
read or write
*/

(async () => {
  //  we u open you are not reading file u are just saving a number
  //  to your memory so later u could read or write or...
  // its really important to close ur file after you opened
  const commandFileHandler = await fs.open("./command.txt", "r");
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      console.log("The file was changed.");
    }
  }
})();




===============================================================================



const fs = require("fs/promises");

/*
open (32 33 d3) these numbers are called a file descriptor
read or write
*/

(async () => {
  //  we u open you are not reading file u are just saving a number
  //  to your memory so later u could read or write or...
  // its really important to close ur file after you opened cz of memory
  const commandFileHandler = await fs.open("./command.txt", "r");
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      console.log("The file was changed.");
      // we want to read the content
      //get the size of our file
      const size = (await commandFileHandler.stat()).size;
      const buff = Buffer.alloc(size);
      //   console.log(buff.byteLength);
      const offset = 0;
      const length = buff.byteLength;
      // const length = size;
      //should always be 0
      const position = 0;
      //   console.log(size);
      const content = await commandFileHandler.read(
        buff,
        offset,
        length,
        position
      );
      console.log(content);//{ bytesRead: 10, buffer: <Buffer 6f 6d 61 72 20 73 61 61 64 65> }
    }
  }
})();




===================================================================



const fs = require("fs/promises");

(async () => {
  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    //get the size of our file
    const size = (await commandFileHandler.stat()).size;
    // allocate our buffer with the size of the file
    const buff = Buffer.alloc(size);
    // the location at which we want to start filling our buffer
    const offset = 0;
    //how many bytes we want to read
    const length = buff.byteLength;
    //the position that we want to start reading the file from
    const position = 0;
    // we always want to read the whole content (from beginning all the way to the end )
    const content = await commandFileHandler.read(
      buff,
      offset,
      length,
      position
    );
    //         turn
    //decoder 01 => something meaningful
    //encoder meaningful => 01

    console.log(content); // { bytesRead: 10, buffer: <Buffer 6f 6d 61 72 20 73 61 61 64 65> }
    //   console.log(content.buffer.toString()); // { bytesRead: 10, buffer: <Buffer 6f 6d 61 72 20 73 61 61 64 65> }
  });

  // watcher...
  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();


=====================================================================================

const fs = require("fs/promises");

(async () => {
  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    //get the size of our file
    const size = (await commandFileHandler.stat()).size;
    // allocate our buffer with the size of the file
    const buff = Buffer.alloc(size);
    // the location at which we want to start filling our buffer
    const offset = 0;
    //how many bytes we want to read
    const length = buff.byteLength;
    //the position that we want to start reading the file from
    const position = 0;
    // we always want to read the whole content (from beginning all the way to the end )
    await commandFileHandler.read(buff, offset, length, position);
    //         turn
    //decoder 01 => something meaningful
    //encoder meaningful => 01
    // utf-8 hye el default fine shila..
    console.log(buff.toString("utf-8")); // { bytesRead: 10, buffer: <Buffer 6f 6d 61 72 20 73 61 61 64 65> }
    //   console.log(content.buffer.toString()); // { bytesRead: 10, buffer: <Buffer 6f 6d 61 72 20 73 61 61 64 65> }
  });

  // watcher...
  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();


===================================================================================
//create a file /Users/10User/Desktop/test/m.js
//delete the file /Users/10User/Desktop/test/ram.txt
//rename the file /Users/10User/Desktop/test/m.js to /Users/10User/Desktop/test/dm.js
//rename the file m.js to box/dm.js
// add to the file /Users/10User/Desktop/test/m.js this content: this is some text


===============================================================================








const fs = require("fs/promises");

(async () => {
  //commands
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  const ADD_TO_FILE = "add to the file";

  const createFile = async (path) => {
    try {
      // we want to check whether or not we already have that file
      //flags : w , r....
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();
      // we already have that file...
      return console.log(`The File ${path} already exists`);
    } catch (e) {
      //we dont have the file , now we should create it
      const newFileHandle = await fs.open(path, "w");
      console.log("A new File was Successfully created.");
      newFileHandle.close();
    }
  };

  const deleteFile = async (path) => {
    console.log(`Deleting ${path}`);
  };

  const renameFile = (oldPath, newPath) => {
    console.log(`Rename ${oldPath} to ${newPath}`);
  };

  const addToFile = (path, content) => {
    console.log(`Adding to ${path}`);
    console.log(`Content : ${content}`);
  };

  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    const size = (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);
    const offset = 0;
    const length = buff.byteLength;
    const position = 0;
    await commandFileHandler.read(buff, offset, length, position);
    const command = buff.toString("utf-8");
    // create a file:
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // delete a file
    //delete the file <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    //rename file:
    //rename the file <path> to <new-path>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ");
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4);
      renameFile(oldFilePath, newFilePath);
    }

    //add to file:
    // add to the file <path> this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);
      addToFile(filePath, content);
    }
  });

  // watcher...
  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();


============= ===================================================================================
appendFile          add to file
unlink              delete file
rename              rename file
open(path,"w")      create the file

============================================================================
create file   open w
add to file  appendFile  or open flag a
rename file rename
delete file  unlink

====================================================================
 

 My Solution : for reading ..but u have to see the next solution

 const fs = require("fs/promises");

(async () => {
  //commands
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  const ADD_TO_FILE = "add to the file";

  const createFile = async (path) => {
    try {
      // we want to check whether or not we already have that file
      //flags : w , r....
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();
      // we already have that file...
      return console.log(`The File ${path} already exists`);
    } catch (e) {
      //we dont have the file , now we should create it
      const newFileHandle = await fs.open(path, "w");
      console.log("A new File was Successfully created.");
      newFileHandle.close();
    }
  };

  const deleteFile = async (path) => {
    try {
      await fs.unlink(path);
      console.log(`Deleting ${path}`);
    } catch (error) {
      console.log(`This File ${path} doesn't exist`);
    }
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log(`Rename ${oldPath} to ${newPath}`);
    } catch (error) {
      console.log(`This File ${oldPath} doesn't exist`);
    }
  };

  const addToFile = async (path, content) => {
    try {
      await fs.appendFile(path, content);
      console.log(`Adding to ${path}`);
      console.log(`Content : ${content}`);
    } catch (error) {}
  };

  // Event Emitter
  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    const size = (await commandFileHandler.stat()).size; //11
    const buff = Buffer.alloc(size); //<Buffer 62 07 92..>
    const offset = 0;
    const length = buff.byteLength; //11
    const position = 0;
    await commandFileHandler.read(buff, offset, length, position);
    const command = buff.toString("utf-8"); // hello

    /*



    create a file:
    create a file <path>
*/
    if (command.includes(CREATE_FILE)) {
      // ballesh men hon w 5od el be2e
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    /*



    delete a file
    delete the file <path>
    */
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    /*



    rename file:
    rename the file <path> to <new-path>
    */
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ");
      console.log(_idx); //47
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4); //51
      renameFile(oldFilePath, newFilePath);
    }

    /*



    add to file:
    add to the file <path> this content: <content>
    */

    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(" this content: "); //47
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);
      addToFile(filePath, content);
    }
  });

  // watcher...
  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();


====================================================================

      


