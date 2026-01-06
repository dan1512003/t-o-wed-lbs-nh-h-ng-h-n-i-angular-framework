const pool = require('../models/connect');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET_KEY = 'your_secret_key';



function decodeTokenFunc(token) {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return User.fromJson(payload);
  } catch (err) {
    console.log('Token invalid:', err.message);
    return null;
  }
}

function createToken(user) {
  return jwt.sign(user.toJson(), SECRET_KEY, {
    issuer: 'yourapp',
    expiresIn: '30d',
  });
}


exports.checkphone = async (req, res) => {
  try {
    const { phone } = req.body;

    const sql = `
      SELECT json_agg(
        json_build_object(
          'email', email,
          'phone', phone
        )
      ) AS user
      FROM public."user"
      WHERE phone = $1
    `;

    const result = await pool.query(sql, [phone]);
    res.json(result.rows[0]?.user ?? []);
  } catch (err) {
    console.error('checkphone error:', err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.checkemail = async (req, res) => {
  try {
    const { email, phone } = req.body;

    const sql = !phone
      ? `
        SELECT json_agg(
          json_build_object(
            'email', email,
            'name', name,
            'phone', phone,
            'image', image
          )
        ) AS user
        FROM public."user"
        WHERE email = $1
      `
      : `
        SELECT json_agg(
          json_build_object(
            'email', email,
            'name', name,
            'phone', phone,
            'image', image
          )
        ) AS user
        FROM public."user"
        WHERE email = $1 AND phone = $2
      `;

    const result = phone
      ? await pool.query(sql, [email, phone])
      : await pool.query(sql, [email]);

    const users = result.rows[0]?.user ?? [];

    if (users.length === 0) return res.json({ token: '' });

    const user = User.fromJson(users[0]);
    const token = createToken(user);
    res.json({ token });
  } catch (err) {
    console.error('checkemail error:', err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.decodeToken = async (req, res) => {
  try {
    const { token } = req.body;
    const user = decodeTokenFunc(token);
    res.json(user ? user.toJson() : null);
  } catch (err) {
    console.error('decodeToken error:', err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.saveUser = async (req, res) => {
  try {
    const { email, phone, firstname, lastname } = req.body;
    const fullname = `${firstname} ${lastname}`;

    const sql = `
      INSERT INTO public."user" (email, phone, name)
      VALUES ($1, $2, $3)
      RETURNING email, name, phone, image
    `;

    const result = await pool.query(sql, [email, phone, fullname]);

    if (!result.rows.length) return res.json({ token: '' });

    const user = User.fromJson(result.rows[0]);
    const token = createToken(user);
    res.json({ token });
  } catch (err) {
    console.error('saveUser error:', err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { oldemail, email, phone, firstname, lastname } = req.body;
    const fullname = `${firstname} ${lastname}`;
    const oldEmail = oldemail || email;

    const sql = `
      UPDATE public."user"
      SET email = $1, phone = $2, name = $3
      WHERE email = $4
      RETURNING email, name, phone, image
    `;

    const result = await pool.query(sql, [email, phone, fullname, oldEmail]);

    if (!result.rows.length) return res.json({ token: '' });

    const user = User.fromJson(result.rows[0]);
    const token = createToken(user);
    res.json({ token });
  } catch (err) {
    console.error('updateUser error:', err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.getUser = async (req, res) => {
  try {
    const { email } = req.query;

    const sql = `
      SELECT json_agg(
        json_build_object(
          'email', email,
          'name', name,
          'phone', phone,
          'image', image
        )
      ) AS user
      FROM public."user"
      WHERE email = $1
    `;

    const result = await pool.query(sql, [email]);
    res.json(result.rows[0]?.user ?? []);
  } catch (err) {
    console.error('getUser error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
