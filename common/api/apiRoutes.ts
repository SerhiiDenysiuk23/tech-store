export const GET_USER = (id: string) => {
  return `users/getUser/${id}`
}
export const GET_PRODUCT = (id: string) => {
  return `products/${id}`
}

export const LOGIN = "users/login"
export const REGISTER = "users/register"
export const USER = "users/user"
export const GET_CATEGORY_LIST = "categories/categoryList"
export const CREATE_CATEGORY = "categories/categoryCreate"
export const GET_BRAND_LIST = "brands/brandList"
export const CREATE_BRAND = "brands/brandCreate"
export const PRODUCTS = "products"
export const CREATE_ORDER = "orders/orderCreate"
export const GET_ORDER_LIST = "orders/orderList"