export const Dessert = {
    image: 'string',
    alt: 'string',
    category: 'string',
    name: 'string',
    price: 'string',
};

export function validateDessert(desserts) {
    const keys = Object.keys(Dessert);
    desserts.forEach(dessert => {
        for (const key of keys) {
            if (typeof dessert[key] !== typeof Dessert[key]) {
                console.error(`Invalid type for ${key}. Expected ${Dessert[key]}, got ${typeof dessert[key]}.`);
                return false;
            }
        }
    });
    return true;
}