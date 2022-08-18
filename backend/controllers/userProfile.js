const UserProfile = require("../models/UserProfile.schema");

const save = async ({ google_id, gender }) => {
  const user_profile = await new UserProfile({
    google_id,
    gender,
  }).save();

  return user_profile;
};

module.exports = {
  save,
};
