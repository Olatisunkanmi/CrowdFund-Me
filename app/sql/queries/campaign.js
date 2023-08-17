module.exports = {
  createCampaign: `INSERT INTO campaigns ( id, title, description, currency, category, target,  type, location, creator_id, creator_email, created_by) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?  )`,
  fetchCampaigns: `SELECT * FROM campaigns`,
  findCampaignById: `SELECT * FROM campaigns WHERE id = ?`,
  findCampaignByTitle: `SELECT * FROM campaigns WHERE title = ?`,
  findCampaignsByCreatorId: `SELECT * FROM campaigns WHERE creator_id = ?`,
  deleteCampaign: `DELETE FROM campaigns WHERE id = ?`,
};
