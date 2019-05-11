//2 Minutes
const MAX_AGE = 2 * 60 * 1000;

let productsDB = {};

const toDB = (array) => {
    return array.reduce((obj, item) => {
        obj[item.name] = item;
        return obj
    }, {});
};

const isFresh = (product) => {
    const diff = Date.now() - product.date;
    console.log(diff);

    return diff < MAX_AGE;
};

const updateProducts = (newProducts) => {
    const products = newProducts
        .map(name => ({
            name,
            date: Date.now()
        }));

    productsDB = {...productsDB, ...toDB(products)};

    console.log('New state');
    console.log(productsDB);
};

const getProducts = () => {
    productsDB = {
        ...toDB(Object.values(productsDB).filter(isFresh))
    };
    return productsDB;
};

module.exports = {
    updateProducts,
    getProducts
};
