// src/middleware/auth.js
import axios from 'axios';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token with the auth service
    const response = await axios.get(
      'https://login-dev.bymyassistant.com/validate-token',
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 200) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;
