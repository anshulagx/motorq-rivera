const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const eventController = require("../controllers/event");
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
router.post("/events", async (req, res) => {
  try {
    console.log(req.body);
    res.send(await eventController.save(req.body));
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get("/events", async (req, res) => {
  let events = null;

  try {
    events = await eventController.findSaved({s:req.query.s});
    res.send(events);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get("/events/:user_id", async (req, res) => {
  try {
    res.send(await eventController.findByUser(req.params.user_id));
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.patch("/events/:event_id", async (req, res) => {
  try {
    const updated = await eventController.update(req.params.event_id, req.body);
    res.send(updated);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.delete("/events/:event_id", async (req, res) => {
  try {
    const deleted = await eventController.deleteEvent(req.params.event_id);
    res.send(deleted);
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
