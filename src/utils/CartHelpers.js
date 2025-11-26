export const addItem = (item, next) => {
    let cart = [];
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({ ...item, count : 1 });

        // Remove duplicates create an array from new Set and turn it back into array using Array.from
        // so that later we can re-map it and new set will only allow unique values in it
        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id)
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}

export const totalCartItem = () => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }

    return 0;
}

export const showItems = () => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }

    return [];
}

export const updateItem = (productId, count) => {
    let cart = [];
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, i) => {
            if(product._id === productId) {
                cart[i].count = count;
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export const removeItem = (productId) => {
    let cart = [];
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, i) => {
            if(product._id === productId) {
                cart.splice(i, 1)
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return cart;
}

export const emptyCart = (next) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('cart');
        next();
    }
}
