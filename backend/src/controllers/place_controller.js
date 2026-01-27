

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';
const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse';




exports.searchPlace = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const url =
      `${NOMINATIM_BASE_URL}?` +
      new URLSearchParams({
        q,
        format: 'geojson',
        addressdetails: '1',
        countrycodes: 'vn'
      });

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('searchPlace error:', error);
    res.status(500).json({ message: 'Failed to search place' });
  }
};


exports.getAddressFromLatLon = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ message: 'lat and lon are required' });
    }

    const url =
      `${NOMINATIM_REVERSE_URL}?` +
      new URLSearchParams({
        lat,
        lon,
        format: 'jsonv2',
        addressdetails: '1'
      });

    const response = await fetch(url);
    const data = await response.json();
console.log(data)
    const place = Array.isArray(data) ? data[0] : data;

res.json({
  displayName: place?.display_name ?? 'Không tìm thấy địa chỉ'
});
  } catch (error) {
    console.error('reverse error:', error);
    res.status(500).json({ message: 'Failed to reverse geocode' });
  }
};
