const express = require("express");
const router = express.Router();
const { getUser, updateUser } = require("../controllers/userController");

/**
 * @notice Route to fetch the stored user details.
 * @dev Delegating the request handling to the getUser controller function.
 */
router.get("/", getUser);

/**
 * @notice Route to update user details.
 * @dev Forwards the request body to the updateUser controller function.
 */
router.put("/", updateUser);

module.exports = router;
