const fs = require("fs").promises;
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const dataFile = path.join(dataDir, "dataDir.json");

const DEFAULT_PLAYER = {
  name: "Wasim Choudhary",
  email: "wasim666choudhary@gmail.com",
  devRole: "SmartContract Developer",
};

/**
 * @notice It Ensures the data directory and user file exist.
 * @dev Creates the directory if its not there. If the file does not exist,it writes the DEFAULT_PLAYER object to the file
 */
async function ensureDataFile() {
  try {
    await fs.mkdir(dataDir, { recursive: true });

    try {
      await fs.access(dataFile);
    } catch (err) {
      await fs.writeFile(
        dataFile,
        JSON.stringify(DEFAULT_PLAYER, null, 2),
        "utf8"
      );
      console.log("Default Player Wasim created in data.json");
    }
  } catch (err) {
    console.error("Error encountered while creating data directory/file", err);
    throw err;
  }
}

/**
 * @notice Reading the current user object from the JSON file.
 * @dev the function reads the file contents and parses the JSON before returning it.
 * @returns {Promise<Object>} The parsed user object stored inside the JSON file.
 */
async function readUser() {
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw);
}

/**
 * @notice Writes a new user object to the JSON file,overwritting the existing file contents with the provided object.
 * @param {Object} newObj - The updated user data to be included.
 * @returns {Promise<Object>} Returns the same object after writing.
 */
async function writeUser(newObj) {
  await fs.writeFile(dataFile, JSON.stringify(newObj, null, 2), "utf8");
  return newObj;
}

module.exports = {
  ensureDataFile,
  readUser,
  writeUser,
  dataFile,
};
