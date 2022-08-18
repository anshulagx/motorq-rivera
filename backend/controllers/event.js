const Event = require("../models/Event.schema");
const UserEvent = require("../models/UserEvent.schema");

const save = async ({
  event_name,
  event_desc,
  img_url,
  event_start_timestamp,
  event_end_timestamp,
  event_lat,
  event_lon,
  event_capacity,
  filled = 0,
}) => {
  const event = new Event({
    event_name,
    event_desc,
    img_url,
    event_start_timestamp,
    event_end_timestamp,
    event_lat,
    event_lon,
    event_capacity,
    filled,
  }).save();

  return event;
};

const findSaved = async ({s=""}) => {
  q=[]

  if (s !== "")
  q.push({
    $search: {
      index: "default",
      text: {
        query: s,
        path: {
          wildcard: "*",
        },
      },
    },
  });
  q.push({
    $match: {},
  });

  
  const events = await Event.aggregate(q);

  return events;
};

const findByUser = async (user_id) => {
  const events = await UserEvent.find({ user_id }).populate({
    path: "event_id" 
  });
  console.log("kamal",events);

  const normalized=events.map(({event_id,ticket})=> {
    return {
      event_name:event_id.event_name,
      event_desc:event_id.event_desc,
      img_url:event_id.img_url,
      event_start_timestamp:event_id.event_start_timestamp,
      event_end_timestamp:event_id.event_end_timestamp,
      event_lat:event_id.event_lat,
      event_lon:event_id.event_lon,
      event_capacity:event_id.event_capacity,
      filled:event_id.filled,
      ticket:ticket,
      _id:event_id._id
    }
  })
  console.log(normalized);
  return normalized;
};

const update = async (event_id, data) => {
  const updated = await Event.updateOne({ _id: event_id }, data);

  return updated;
};

const deleteEvent = async (event_id) => {
  const events_deleted = await Event.deleteOne({ _id: event_id });
  const user_events_deleted = await UserEvent.deleteMany({ event_id });
  return { event_id };
};

module.exports = {
  save,
  findSaved,
  findByUser,
  update,
  deleteEvent,
};
