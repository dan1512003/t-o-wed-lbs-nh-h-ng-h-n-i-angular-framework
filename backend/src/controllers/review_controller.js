const pool = require('../models/connect');

exports.getReview = async (req, res) => {
  try {
    const { osm_id } = req.query;

    const sql = !osm_id
      ? `
SELECT json_agg(
  json_build_object(
    'id', id,
    'ratefood', ratefood,
    'rateservice', rateservice,
    'rateambience', rateambience,
    'overallrating', overallrating,
    'command', command,
    'id_restaurant', id_restaurant,
    'email', email,
    'date', date,
    'like', "like"
  )
) AS reviews
FROM public.review
`
      : `
SELECT json_agg(
  json_build_object(
    'id', id,
    'ratefood', ratefood,
    'rateservice', rateservice,
    'rateambience', rateambience,
    'overallrating', overallrating,
    'command', command,
    'id_restaurant', id_restaurant,
    'email', email,
    'date', date,
    'like', "like"
  )
) AS reviews
FROM public.review r
WHERE r.id_restaurant = $1
`;

    const result = osm_id
      ? await pool.query(sql, [osm_id])
      : await pool.query(sql);

    res.json(result.rows[0]?.reviews ?? []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.addReview = async (req, res) => {
  try {
    const {
      rateFood,
      rateService,
      rateAmbience,
      overallRating,
      command,
      idRestaurant,
      email,
      date,
    } = req.body;

    const sql = `
INSERT INTO public.review (
  id_restaurant,
  email,
  ratefood,
  rateservice,
  rateambience,
  overallrating,
  command,
  date
) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
`;

    await pool.query(sql, [
      idRestaurant,
      email,
      rateFood,
      rateService,
      rateAmbience,
      overallRating,
      command,
      date,
    ]);

    res.json({ result: 'them thanh cong' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getReviewEmail = async (req, res) => {
  try {
    const { email, osm_id } = req.query;

    const sql = !osm_id
      ? `
SELECT json_agg(
  json_build_object(
    'id', id,
    'ratefood', ratefood,
    'rateservice', rateservice,
    'rateambience', rateambience,
    'overallrating', overallrating,
    'command', command,
    'id_restaurant', id_restaurant,
    'email', email,
    'date', date,
    'like', "like"
  )
) AS reviews
FROM public.review r
WHERE r.email = $1
`
      : `
SELECT json_agg(
  json_build_object(
    'id', id,
    'ratefood', ratefood,
    'rateservice', rateservice,
    'rateambience', rateambience,
    'overallrating', overallrating,
    'command', command,
    'id_restaurant', id_restaurant,
    'email', email,
    'date', date,
    'like', "like"
  )
) AS reviews
FROM public.review r
WHERE r.id_restaurant = $1 AND r.email = $2
`;

    const result = osm_id
      ? await pool.query(sql, [osm_id, email])
      : await pool.query(sql, [email]);

    res.json(result.rows[0]?.reviews ?? []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.editReview = async (req, res) => {
  try {
    const {
      idRestaurant,
      email,
      rateFood,
      rateService,
      rateAmbience,
      overallRating,
      command,
      date,
    } = req.body;

    const sql = `
UPDATE public.review
SET
  ratefood = $1,
  rateservice = $2,
  rateambience = $3,
  overallrating = $4,
  command = $5,
  date = $6
WHERE id_restaurant = $7 AND email = $8
`;

    await pool.query(sql, [
      rateFood,
      rateService,
      rateAmbience,
      overallRating,
      command,
      date,
      idRestaurant,
      email,
    ]);

    res.json({ result: 'cap nhat thanh cong' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
