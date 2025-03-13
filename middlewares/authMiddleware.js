// const jwt = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   try {
//     // Check if authorization header exists
//     if (!req.headers.authorization) {
//       return res.status(401).json({
//         success: false,
//         message: "Authorization token is missing",
//       });
//     }

//     // Extract Token
//     const token = req.headers.authorization.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token format",
//       });
//     }

//     // Verify Token
//     jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
//       if (error) {
//         return res.status(401).json({
//           success: false,
//           message: "Unauthorized user, invalid token",
//         });
//       }

//       // Attach user details to request object
//       req.user = decoded;
//       next();
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error in authentication",
//       error,
//     });
//   }
// };

const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // get token
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).send({
          success: false,
          message: "Un-Authorize User in authMiddleware",
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Please provide Auth Token",
      error,
    });
  }
};
