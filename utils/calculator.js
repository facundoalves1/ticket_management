const calculator = (req) => {
  const { items } = req.body;
  
  const result = items.reduce((acc, current) => {
    console.log(current.price)
    return acc + current.price * current.quantity;
  }, 0);
  
  return result;
};

module.exports = { calculator };
