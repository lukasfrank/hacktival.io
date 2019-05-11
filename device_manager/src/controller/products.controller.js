const MAX_AGE = 1 * 60 * 1000;

let products = {};

const updateProducts = (newProducts) => {
    products = newProducts
        .map(name => ({
            name,
            date: Date.now()
        }))
        .reduce((obj, item) => {
            obj[item.name] = item;
            return obj
        }, {});

    console.log('New state');
    console.log(products);
};

const isFresh = (product) => {
    const diff = Date.now() - product.date;
    console.log(diff);

    return diff < MAX_AGE;
};

const getProducts = () => {
    return Object.values(products).filter(isFresh);
};

module.exports = {
    updateProducts,
    getProducts
};
