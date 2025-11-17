const { readUser, writeUser } = require("../services/fileService");

/**
 * @notice Checks whether the provided email looks valid or invalid.
 * @dev Basic pattern check: must contain "@", have text before and after it and include a dot in the domain part.
 * @param {string} email - The email string to check.
 * @returns {boolean} True if the email is in a valid format.
 */
function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * @notice Validates data sent from the frontend before saving it.
 * @dev Ensures only allowed fields are updated and checks that values look correct (no numbers in name or devRole(SHOULD ONLY CONTAIN STRING), valid email format, etc.).
 * @param {Object} payload - The incoming user changes.
 * @returns {Array<string>} A list of error messages, empty if everything is valid.
 */
function validatePayload(payload) {
  const allowedFields = ["name", "email", "devRole"];
  const errors = [];

  Object.keys(payload).forEach((key) => {
    if (!allowedFields.includes(key)) {
      errors.push(`Field Not-Recognizable: ${key}`);
    }
  });

  if ("name" in payload) {
    if (typeof payload.name !== "string" || payload.name.trim() === "") {
      errors.push("Name must be a non-empty string.");
    }

    if (/\d/.test(payload.name)) {
      errors.push("Name cannot contain numbers.");
    }
  }

  if ("email" in payload && !isValidEmail(payload.email)) {
    errors.push("Invalid Email detected.");
  }
  if ("devRole" in payload) {
    if (typeof payload.devRole !== "string" || payload.devRole.trim() === "") {
      errors.push("Please Fill the input box to save scuccessfully.");
    }

    // Prevent digits in role
    if (/\d/.test(payload.devRole)) {
      errors.push(
        "Devleoper Role naming cannot have numbers. Enter Valid Role!"
      );
    }
  }

  return errors;
}

/**
 * @notice Handles requests to fetch the current stored user info.
 * @dev Reads the JSON file and sends its contents back as a response.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
async function getUser(req, res) {
  try {
    const user = await readUser();
    return res.json(user);
  } catch (err) {
    console.error("Encountered GET /api/user error:", err);
  }
}

/**
 * @notice Handles requests to update the user details.
 * @dev Checking and validates the incoming data, merging it with the existing user,saves it to the JSON file, and then returns the updated info.
 * @param {Request} req - Express request containing the body with updates.
 * @param {Response} res - Express response object used to send the result.
 */
async function updateUser(req, res) {
  try {
    const payload = req.body || {};

    const errors = validatePayload(payload);
    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const current = await readUser();
    const updated = { ...current, ...payload };
    await writeUser(updated);
    return res.json({
      message: "Congrats, Player updated successfully -> ",
      user: updated,
    });
  } catch (err) {
    console.error("Encountered PUT /api/user error:", err);
    return res.status(500).json({ error: "Failed to update Player data." });
  }
}

module.exports = {
  getUser,
  updateUser,
};
