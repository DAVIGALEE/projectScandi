export async function getCategories() {
  let files = {};
  await fetch("http://localhost:4000", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query {
        categories {
            name
        }
    }`,
    }),
  })
    .then((res) => res.json())
    .then((res) => (files = res.data.categories));
  return files;
}

export async function getCurrencies() {
  let files = {};
  await fetch("http://localhost:4000", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query {
        currencies {
            label
            symbol
        }
    }`,
    }),
  })
    .then((res) => res.json())
    .then((res) => (files = res.data.currencies));
  return files;
}

export async function getProductsData() {
  let files = {};
  await fetch("http://localhost:4000", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query {
        category(input: {
          title: "all"
        }){
    	      products{
              id
              name
              brand
              inStock
              prices {
                currency {
                  label
                }
                amount
                }
              gallery
              category
              attributes {
                id
              }
      }
  }
    }`,
    }),
  })
    .then((res) => res.json())
    .then((res) => (files = res.data.category));
  return files;
}

export async function getProduct(id) {
  let files = {};
  await fetch("http://localhost:4000", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query {
        product(id: "${id}"){
          		id
              name
              inStock
              prices {
                currency {
                  label
                }
                amount
              }
              gallery
              category
    					description
    					attributes {
                id
                name
                type
                items {
                  id
                  displayValue
                  value
                }
              }
    					brand
        }
    }`,
    }),
  })
    .then((res) => res.json())
    .then((res) => (files = res.data.product));
  return files;
}

export async function getAttributes(id) {
  let files = {};
  await fetch("http://localhost:4000", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query {
        product(id: "${id}"){
    					attributes {
                name
                items {
                  displayValue
                  value
                }
              }
        }
    }`,
    }),
  })
    .then((res) => res.json())
    .then((res) => (files = res.data.product));
  return files;
}

export async function checkAttributes(id) {
  let files = {};
  await fetch("http://localhost:4000", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query {
        product(id: "${id}"){
    					attributes {
                id
              }
        }
    }`,
    }),
  })
    .then((res) => res.json())
    .then((res) => (files = res.data.product));
  return files;
}
