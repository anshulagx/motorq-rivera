const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const userProfileController = require("../controllers/userProfile");
const router = express.Router();

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Record user interaction with a tweet
 *     description: record [share,report,save,click] event.
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           userId:
 *             type: string
 *           tweetId:
 *             type: string
 *           action:
 *             type: string
 *           value:
 *             type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/register", async (req, res) => {
  try {
    res.send(await userProfileController.save(req.body));
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
