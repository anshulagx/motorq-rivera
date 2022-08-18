const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const userEventController = require("../controllers/userEvent");
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
router.post("/events/:event_id", async (req, res) => {
  try {
    const v=  await userEventController.save(req.body.user_id, req.params.event_id);
    console.log("s",v);
    console.log("s",req.params.event_id);
    res.send(v);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post("/verify", async (req, res) => {
  try {
    res.send(await userEventController.verify(req.body));
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post("/deregister", async (req, res) => {
  try {
    res.send(await userEventController.dereg(req.body));
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
