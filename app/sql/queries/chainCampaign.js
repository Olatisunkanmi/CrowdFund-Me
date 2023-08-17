module.exports = {
  createChainCampaign: `INSERT INTO chained_campaigns (id, title, description, currency, category, target, chain_raised, parent_raised, location, commission, campaign_id, creator_id, creator_email, created_by, ambassador_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  findChainCampaignById: `SELECT * FROM chained_campaigns WHERE id = ?`,
  findAllChainCampaigns: `SELECT * FROM chained_campaigns`,
  findChainCampaignByAmbassadorId: `SELECT * FROM chained_campaigns WHERE ambassador_id = ?`,
};
