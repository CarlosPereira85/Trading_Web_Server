import jwt from "jsonwebtoken";

export default   (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1]
   
    if (!token) {
      return res.status(401).json({ msg: "Auth Error!!" });
    }
  
    try {
      const decoded = jwt.verify(token, "randomString");
      req.user = decoded.user; 
      ;//{id: '347294787982498', name: "Apple"}
      next();
    } catch (error) {
      res.status(500).send("Invalid Token!");
    }
  };
  