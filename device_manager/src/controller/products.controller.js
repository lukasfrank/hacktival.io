const _ = require('lodash');

//2 Minutes
const MAX_AGE_FRESH = 1 * 20 * 1000;
const MAX_AGE_TAKEN = 1 * 120 * 1000;

let productsDB = {};

const toDB = (array) => {
    return array.reduce((obj, item) => {
        obj[item.name] = item;
        return obj
    }, {});
};

const isFresh = (product) => {
    const diff = Date.now() - product.first_seen;
    console.log(diff);

    return diff < MAX_AGE_FRESH;
};

const isTaken = (product) => {
    const diff = Date.now() - product.updated;
    console.log(diff);

    return diff < MAX_AGE_TAKEN;
};

const refreshProducts = () => {
    const notFresh = Object.values(productsDB).filter(el => !isFresh(el));
    console.log(`Bad products:`);
    console.log(notFresh);

    productsDB = {
        ...toDB(Object.values(productsDB).filter(isTaken))
    };

    console.log(`Products updated! Not fresh are ${notFresh}`);

    return notFresh;
};


const updateProducts = (newProducts) => {
    
    const products = newProducts
    .map(name => {
        const productInDb = productsDB[name];
        let first_seen = Date.now();

        if (productInDb && productInDb.first_seen) {
            console.log("is there");
            first_seen = productInDb.first_seen;
        }

        return {
            name,
            first_seen,
            updated: Date.now()};
    });

    productsDB = {...toDB(products), ...productsDB, };

    console.log('New state');
    console.log(productsDB);
};

const getProducts = () => {
    refreshProducts();
    return Object.values(productsDB);
};

module.exports = {
    updateProducts,
    getProducts,
    refreshProducts
};
