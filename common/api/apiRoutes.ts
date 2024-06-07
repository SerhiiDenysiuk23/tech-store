export const GET_USER = (id: string) => {
  return `users/getUser/${id}`
}

export const LOGIN = "users/login"
export const REGISTER = "users/register"
export const GET_USER_BY_TOKEN = "users/getUserByToken"
export const GET_CATEGORY_LIST = "categories/categoryList"
export const CREATE_CATEGORY = "categories/categoryCreate"
export const GET_BRAND_LIST = "brands/brandList"
export const CREATE_BRAND = "brands/brandCreate"
export const GET_PRODUCT_LIST = "products/productList"
export const CREATE_PRODUCT = "products/productCreate"