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
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log("No file at this path to remove.");
      } else {
        console.log("An error occured while removing the file");
        console.log(e);
      }
    }
  };

  const renameFile = (oldPath, newPath) => {
    // console.log(`Rename ${oldPath} to ${newPath}`);
  };

  const addToFile = (path, content) => {
    // console.log(`Adding to ${path}`);
    // console.log(`Content : ${content}`);
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
