const fs = require("fs/promises");

(async () => {
  const createFile = async (path) => {
    existingFileHandle = await fs.open(path, "r");
    // fs.writeFile("newfile.txt", "");
  };

  //commands
  const CREATE_FILE = "create a file";

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
      const filePath = command.substring(CREATE_FILE + 1);
      createFile(filePath);
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
