import {IProduct} from "@/types/IProduct";

export default (input: IProduct) => {
  const {
    _id,
    name,
    price,
    description,
    category,
    brand,
    characteristics,
    stock,
    imageUrl
  } = input;

  return {
    _id: _id as string,
    name,
    price,
    description,
    category: category.name,
    brand: brand.name,
    characteristics,
    stock,
    imageUrl
  };
}