const banners = require('../data/banners');

// Get all banners, with ?type= (bimbel|tryout)
exports.getBanners = (req, res) => {
  const { type } = req.query;
  let result = banners;
  if (type) {
    result = banners.filter(b => b.type === type);
  }
  res.json(result);
};

// Get 1 banner by id
exports.getBannerById = (req, res) => {
  const id = parseInt(req.params.id);
  const banner = banners.find(b => b.id === id);
  if (!banner) return res.status(404).json({ message: 'Banner not found.' });
  res.json(banner);
};

// Create banner
exports.createBanner = (req, res) => {
  const { type, imageUrl, title, link } = req.body;
  if (!type || !imageUrl || !title) {
    return res.status(400).json({ message: 'type, imageUrl, and title are required.' });
  }
  const id = banners.length ? (banners[banners.length-1].id + 1) : 1;
  const banner = { id, type, imageUrl, title, link };
  banners.push(banner);
  res.status(201).json(banner);
};

// Update banner
exports.updateBanner = (req, res) => {
  const id = parseInt(req.params.id);
  const idx = banners.findIndex(b => b.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Banner not found.' });
  const { type, imageUrl, title, link } = req.body;
  if (type) banners[idx].type = type;
  if (imageUrl) banners[idx].imageUrl = imageUrl;
  if (title) banners[idx].title = title;
  if (link) banners[idx].link = link;
  res.json(banners[idx]);
};

// Delete banner
exports.deleteBanner = (req, res) => {
  const id = parseInt(req.params.id);
  const idx = banners.findIndex(b => b.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Banner not found.' });
  const deleted = banners.splice(idx, 1);
  res.json(deleted[0]);
};
