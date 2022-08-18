const Event = require("../models/Event.schema");
const UserEvent = require("../models/UserEvent.schema");

const hash = require("object-hash");

const save = async (user_id, event_id) => {
  const ticket = hash({ user_id, event_id, datetime: new Date() });

  // Check if user already has registered for the event
  const uEvent = await UserEvent.find({ user_id, event_id }).count();
  if (uEvent != 0)
    throw new Error("You have already registered for this event.");

  //check if reg>capacity, throw error if so

  const new_event = await Event.findOne({ _id: event_id });
  if (new_event.filled >= new_event.event_capacity) {
    throw new Error("The event is completely filled");
  }
  let events = await UserEvent.find({ user_id }, "event_id").populate({
    path: "event_id",
    match: {
      $or: [
        {
          $and: [
            {
              event_start_timestamp: {
                $gt: new_event.event_start_timestamp,
              },
            },
            {
              event_start_timestamp: {
                $lt: new_event.event_end_timestamp,
              },
            },
          ],
        },

        {
          $and: [
            {
              event_start_timestamp: {
                $lt: new_event.event_start_timestamp,
              },
            },
            {
              event_end_timestamp: {
                $gt: new_event.event_end_timestamp,
              },
            },
          ],
        },
        {
          $and: [
            {
              event_start_timestamp: {
                $gt: new_event.event_start_timestamp,
              },
            },
            {
              event_end_timestamp: {
                $lt: new_event.event_end_timestamp,
              },
            },
          ],
        },

        {
          $and: [
            {
              event_end_timestamp: {
                $gt: new_event.event_start_timestamp,
              },
            },
            {
              event_end_timestamp: {
                $lt: new_event.event_end_timestamp,
              },
            },
          ],
        },
      ],
    },
  });
  console.log(events);
  if (events.filter((event) => event.event_id).length === 0) {
    const user_event = await new UserEvent({
      user_id,
      event_id,
      ticket,
    }).save();

    // increment reg count of event
    await Event.findOneAndUpdate({ _id: event_id }, { $inc: { filled: 1 } });
    return user_event;
  }
  throw new Error(
    "The event unfortunately clashed with an already registered event"
  );
};

const verify = async ({ event_code }) => {
  const userEvent = await UserEvent.findOne({ ticket: event_code });
  if (userEvent) {
    const updateStatus = await UserEvent.findOneAndUpdate(
      { ticket: event_code },
       {ticket_used: "true"} 
    );
    console.log("as",updateStatus);
  }
  console.log("anshu",userEvent);
  return userEvent;
};

const dereg = async ({ user_id, event_id }) => {
  console.log("Dereg", user_id, event_id);
  const userEvent = await UserEvent.deleteOne({ user_id, event_id });
  // increment reg count of event
  await Event.findOneAndUpdate({ _id: event_id }, { $inc: { filled: -1 } });

  console.log(userEvent);
  return userEvent;
};
module.exports = {
  save,
  verify,
  dereg,
};
