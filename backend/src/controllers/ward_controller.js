const pool = require('../models/connect');



exports.getWard = async (req, res) => {
  try {
    const { osm_id } = req.query;

    const sql = !osm_id
      ? `
SELECT json_build_object(
  'type', 'FeatureCollection',
  'features', COALESCE(json_agg(
    json_build_object(
      'type', 'Feature',
      'geometry', ST_AsGeoJSON(geom)::json,
      'properties', json_build_object(
        'full_id', full_id,
        'osm_id', osm_id,
        'name', name,
        'name_en', name_en,
        'image', image
      )
    )
  ), '[]'::json)
) AS geojson
FROM hanoi_basemap.xaphuong_hanoi
`
      : `
SELECT json_build_object(
  'type', 'FeatureCollection',
  'features', COALESCE(json_agg(
    json_build_object(
      'type', 'Feature',
      'geometry', ST_AsGeoJSON(geom)::json,
      'properties', json_build_object(
        'full_id', full_id,
        'osm_id', osm_id,
        'name', name,
        'name_en', name_en,
        'image', image
      )
    )
  ), '[]'::json)
) AS geojson
FROM hanoi_basemap.xaphuong_hanoi
WHERE osm_id = $1
`;

    const result = osm_id
      ? await pool.query(sql, [osm_id])
      : await pool.query(sql);

    res.json(result.rows[0].geojson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getWardLatLon = async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    if (isNaN(lat) || isNaN(lon)) {
      return res
        .status(400)
        .json({ error: 'lat lon is required' });
    }

    const sql = `
WITH input_point AS (
  SELECT ST_SetSRID(ST_MakePoint($1, $2), 4326) AS geom
)
SELECT json_build_object(
  'type', 'FeatureCollection',
  'features', COALESCE(json_agg(
    json_build_object(
      'type', 'Feature',
      'geometry', ST_AsGeoJSON(x.geom)::json,
      'properties', json_build_object(
        'full_id', x.full_id,
        'osm_id', x.osm_id,
        'name', x.name,
        'name_en', x.name_en
      )
    )
  ), '[]'::json)
) AS geojson
FROM hanoi_basemap.xaphuong_hanoi x
JOIN input_point p
ON ST_Contains(x.geom, p.geom);
`;

    const result = await pool.query(sql, [lon, lat]);

    res.json(result.rows[0].geojson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

