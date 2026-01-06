const pool = require('../models/connect'); 


exports.getDiet = async (req, res) => {
  try {
    const sql = `
      SELECT json_agg(
        json_build_object(
          'id', id,
          'diet', diet,
          'image', image
        )
      ) AS diets
      FROM public.diet
    `;

    const result = await pool.query(sql);
    res.json(result.rows[0]?.diets ?? []);
  } catch (err) {
    console.error('getDiet error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
