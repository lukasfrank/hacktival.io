//2 Minutes
const MAX_AGE = 1 * 10 * 1000;

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

const refreshProducts = () => {
    const notFresh = Object.values(productsDB).filter(el => !isFresh(el));
    console.log(`Bad products:`);
    console.log(notFresh);

    productsDB = {
        ...toDB(Object.values(productsDB).filter(isFresh))
    };

    console.log(`Products updated!`);

    return notFresh;
};


const updateProducts = (newProducts) => {
    const products = newProducts
        .map(name => ({
            name,
            date: Date.now()
        }));

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
