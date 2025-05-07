export enum BackendUrls {
    baseUrl = 'http://localhost:5000',
    findProductById = baseUrl + '/product',
    addProduct = baseUrl + '/admin/add-product',
    editProduct = baseUrl + '/admin/edit-product',
    cart = baseUrl + '/cart',
    addToCart = baseUrl + '/cart/add-product',
    removeCartItem = baseUrl + '/cart/remove-product'
}

export enum FrontendRoutes {
    products = '/products',
    findProductById = '/product',
    addProduct = '/admin/add-product',
    editProduct = '/admin/edit-product',
    cart = '/cart',
    addToCart = '/cart/add-product',
    removeCartItem = '/cart/remove-product',
    order= '/order'
}
