import React, {useEffect} from 'react';
import {IProduct} from "@/types/IProduct";
import {useAppSelector} from "@/common/hooks/useAppDispatch";
import Link from "next/link";

const ProductListElem: React.FC<{ product: IProduct, isShowAll?: boolean }> = ({product, isShowAll}) => {

  useEffect(() => {


  }, []);

  return (
    <Link href={`/product/${product._id}`}>
      <div className="product-card">
        <img src={product.imageUrl} alt={product.name} className="product-card__image"/>
        <div className="product-card__details">
          <h2 className="product-card__name">{product.name}</h2>
          <p className="product-card__price">{product.price.toFixed(2)}</p>
          <div className="product-card__meta">
          <span className="product-card__brand">
            {product.brand.name}
          </span>
            <span className="product-card__category">
            {product.category.name}
          </span>
          </div>
          {
            isShowAll &&
            <div className={"product-card__more"}>
              <p className="product-card__stock">Stock: {product.stock} шт.</p>
              <p className="product-card__characteristics">{product.characteristics}</p>
              <p className="product-card__description">{product.description}</p>
            </div>
          }
        </div>
      </div>
    </Link>
  );
};

export default ProductListElem;