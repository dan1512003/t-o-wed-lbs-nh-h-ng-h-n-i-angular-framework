const OSRM_BASE_URL = 'https://router.project-osrm.org';


exports.getRoute = async (req, res) => {
  try {
 const { startLat, startLng, endLat, endLng } = req.body;

    if (!startLat || !startLng || !endLat || !endLng) {
      return res.status(400).json({
        message: 'Missing coordinates',
      });
    }

    const url = `${OSRM_BASE_URL}/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson&steps=true`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        message: 'OSRM request failed',
      });
    }

    const data = await response.json();

    if (data.code === 'Ok' && data.routes?.length) {
      return res.json(data.routes[0]);
    }

    return res.status(404).json({
      message: 'Route not found',
    });
  } catch (error) {
    console.error('Routing error:', error);
    return res.status(500).json({
      message: 'Routing service error',
    });
  }
};
