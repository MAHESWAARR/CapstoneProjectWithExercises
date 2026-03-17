const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "1hr" }
  );
};

module.exports = generateToken;


/* 
{
 "id": "userId",
 "role": "USER"
} 
*/