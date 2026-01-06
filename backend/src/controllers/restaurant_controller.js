const pool = require("../models/connect");

exports.getRestaurants = async (req, res) => {
  try {
    const { osm_id } = req.query;

    const sql = !osm_id
      ? `
SELECT json_build_object(
  'type','FeatureCollection',
  'features', COALESCE(json_agg(
    json_build_object(
      'type','Feature',
      'geometry', ST_AsGeoJSON(geom)::json,
      'properties', json_build_object(
        'full_id', full_id,
        'osm_id', osm_id,
        'price', price,
        'kids_area', kids_area,
        'baby_feeding', baby_feeding,
        'self_service', self_service,
        'website_me', website_me,
        'image', image,
        'bar', bar,
        'indoor', indoor,
        'contact_in', contact_in,
        'air_conditioning', air_conditioning,
        'outdoor', outdoor,
        'email', email,
        'contact_fa', contact_fa,
        'delivery', delivery,
        'description', description,
        'phone', phone,
        'opening_hour', opening_hour,
        'cuisine', cuisine,
        'website', website,
        'addr_street', addr_street,
        'name', name,
        'payment', payment,
        'diet', diet,
        'starttime', starttime
      )
    )
  ), '[]'::json)
) AS geojson
FROM hanoi_thematic.bando_chuyende_nhahang_hanoi
`
      : `
SELECT json_build_object(
  'type','FeatureCollection',
  'features', COALESCE(json_agg(
    json_build_object(
      'type','Feature',
      'geometry', ST_AsGeoJSON(n.geom)::json,
      'properties', json_build_object(
        'full_id', n.full_id,
        'osm_id', n.osm_id,
        'price', n.price,
        'kids_area', n.kids_area,
        'baby_feeding', n.baby_feeding,
        'self_service', n.self_service,
        'website_me', n.website_me,
        'image', n.image,
        'bar', n.bar,
        'indoor', n.indoor,
        'contact_in', n.contact_in,
        'air_conditioning', n.air_conditioning,
        'outdoor', n.outdoor,
        'email', n.email,
        'contact_fa', n.contact_fa,
        'delivery', n.delivery,
        'description', n.description,
        'phone', n.phone,
        'opening_hour', n.opening_hour,
        'cuisine', n.cuisine,
        'website', n.website,
        'addr_street', n.addr_street,
        'name', n.name,
        'payment', n.payment,
        'diet', n.diet,
        'starttime', n.starttime
      )
    )
  ), '[]'::json)
) AS geojson
FROM hanoi_thematic.bando_chuyende_nhahang_hanoi n
JOIN hanoi_basemap.xaphuong_hanoi x
ON ST_Within(n.geom, x.geom)
WHERE x.osm_id = $1
`;

    const result = osm_id
      ? await pool.query(sql, [osm_id])
      : await pool.query(sql);

    res.json(result.rows[0].geojson);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getRestaurantsID = async (req, res) => {
  try {
    const { osm_id } = req.query;

    if (!osm_id) {
      return res.status(400).json({ error: "osm_id is required" });
    }

    const result = await pool.query(
      `
SELECT json_build_object(
  'type','FeatureCollection',
  'features', COALESCE(json_agg(
    json_build_object(
      'type','Feature',
      'geometry', ST_AsGeoJSON(geom)::json,
      'properties', json_build_object(
        'full_id', full_id,
        'osm_id', osm_id,
        'price', price,
        'kids_area', kids_area,
        'baby_feeding', baby_feeding,
        'self_service', self_service,
        'website_me', website_me,
        'image', image,
        'bar', bar,
        'indoor', indoor,
        'contact_in', contact_in,
        'air_conditioning', air_conditioning,
        'outdoor', outdoor,
        'email', email,
        'contact_fa', contact_fa,
        'delivery', delivery,
        'description', description,
        'phone', phone,
        'opening_hour', opening_hour,
        'cuisine', cuisine,
        'website', website,
        'addr_street', addr_street,
        'name', name,
        'payment', payment,
        'diet', diet,
        'starttime', starttime
      )
    )
  ), '[]'::json)
) AS geojson
FROM hanoi_thematic.bando_chuyende_nhahang_hanoi
WHERE osm_id = $1
`,
      [osm_id]
    );

    res.json(result.rows[0].geojson);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/restaurants/bounds
 */
exports.getRestaurantsBound = async (req, res) => {
  try {
    const { minLon, minLat, maxLon, maxLat } = req.body;

    const result = await pool.query(
      `
WITH bounds AS (
  SELECT ST_MakeEnvelope($1, $2, $3, $4, 4326) AS geom_bbox
)
SELECT json_build_object(
  'type','FeatureCollection',
  'features', COALESCE(json_agg(
    json_build_object(
      'type','Feature',
      'geometry', ST_AsGeoJSON(n.geom)::json,
      'properties', json_build_object(
        'full_id', n.full_id,
        'osm_id', n.osm_id,
        'price', n.price,
        'kids_area', n.kids_area,
        'baby_feeding', n.baby_feeding,
        'self_service', n.self_service,
        'website_me', n.website_me,
        'image', n.image,
        'bar', n.bar,
        'indoor', n.indoor,
        'contact_in', n.contact_in,
        'air_conditioning', n.air_conditioning,
        'outdoor', n.outdoor,
        'email', n.email,
        'contact_fa', n.contact_fa,
        'delivery', n.delivery,
        'description', n.description,
        'phone', n.phone,
        'opening_hour', n.opening_hour,
        'cuisine', n.cuisine,
        'website', n.website,
        'addr_street', n.addr_street,
        'name', n.name,
        'payment', n.payment,
        'diet', n.diet,
        'starttime', n.starttime
      )
    )
  ), '[]'::json)
) AS geojson
FROM hanoi_thematic.bando_chuyende_nhahang_hanoi n
JOIN bounds b
ON ST_Within(n.geom, b.geom_bbox)
`,
      [minLon, minLat, maxLon, maxLat]
    );

    res.json(result.rows[0].geojson);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
