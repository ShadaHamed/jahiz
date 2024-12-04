exports.handler = async () => {
  const categories = [
    { id: "123", name: "Food" },
    { id: "133", name: "Drinks" },
    { id: "153", name: "Snacks" },
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(categories),
  };
};

