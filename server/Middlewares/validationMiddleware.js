const validation = (schema) => (reqq, ress, next) => {
   const body = reqq.body;
   console.log('VAL1');
   console.log(reqq.body);
   try {
      schema.validate(body);
      console.log('VAL2');
      next();
      return next();
   } catch (error) {
      console.log('VAL3');
      return ress.status(400).json({ error });
   }
};

module.exports = validation;
