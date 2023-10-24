const calculator = (req) => {
  const { items } = req.body;
  console.log(items);
  const result = items.reduce((acc, current) => {
    console.log(current.price)
    return acc + current.price;
  }, 0);
  console.log(result);
  return result;
};

module.exports = { calculator };
