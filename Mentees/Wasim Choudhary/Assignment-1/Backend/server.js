const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
const { ensureDataFile } = require("./services/fileService");

const app = express();
const PORT = process.env.PORT || 5050;

/**
 * @notice Enables Cross-Origin Resource Sharing.Need to install it to use it.
 * @dev This allows the frontend which runs in a diff port(http://localhost:5173/) to make requests to the backend without being blocked.
 */
app.use(cors());

/**
 * @notice Parses incoming JSON request bodies automatically.
 * @dev Without this middleware, req.body would be undefined for JSON inputs. Key piece!
 */
app.use(express.json());

/**
 * @notice it checks the data folder and user file exist before handling requests.If missing, it creates one with the default user object.
 */
ensureDataFile().catch((err) => {
  console.log("Ensuring Data files failed, Try Again:", err);
  process.exit(1);
});

/**
 * @notice Routes for handling user-related stuff (GET and PUT).
 * @dev All user endpoints are grouped under /api/user.
 */
app.use("/api/user", userRoutes);

/**
 * @notice  route to check if the server is alive or not.
 * @dev Returns a basic JSON object to indicate health status.
 */
app.get("/health", (req, res) => res.json({ status: "ok" }));

/**
 * @notice Starts the backend server.
 * @dev Listens on PORT 5050 by default(NOTE - > not using 5000 as it clasesh with mac airplay receiver) unless overridden by environment variables.
 */
app.listen(PORT, () => {
  console.log(`Hey, Server is live and well on Port ${PORT}`);
});
