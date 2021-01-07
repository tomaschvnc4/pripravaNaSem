const validation = (schema) => async (req, res, next) => {
   const body = req.body;
   console.log(req.body);
   try {
      await schema.validate(body);
      next();
   } catch (error) {
      res.status(403).json({ error });
   }
};

module.exports = validation;
