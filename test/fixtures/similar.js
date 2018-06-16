const data = {a: 1, b: 2, c: 3};

function getElementById(id) {
  const result = data[id];

  return result;
}

function getElementsByIds(ids) {
  const result = ids.map(id => getElementById(id));

  return result;
}

const result = getElementsByIds(['a', 'b', 'c']);

console.log(result);
