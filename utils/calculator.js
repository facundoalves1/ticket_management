const calculator = (req) => {
  const { items } = req.body;

  const result = items.reduce((acc, current) => {
    return acc.price + current.price;
  });

  return result;
};

module.exports = { calculator };
