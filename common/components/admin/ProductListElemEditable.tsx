import React, {useEffect, useState} from "react";
import {IProduct, IProductToCreate} from "@/types/IProduct";
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";
import productToProductCreate from "@/common/components/helpers/productToProductCreate";
import Link from "next/link";
import {deleteProductAction, editProductAction} from "@/common/store/product/product.slice";

const ProductListElemEditable: React.FC<{ data: IProduct }> = ({data}) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [product, setProduct] = useState<IProductToCreate>(productToProductCreate(data))
  const {category, brand} = useAppSelector(state => state.rootReducer)
  const dispatch = useAppDispatch()

  const handleOk = () => {
    if (product.category === 'No category')
      return

    dispatch(editProductAction(product))
    setIsEditMode(prevState => !prevState)
    setProduct(productToProductCreate(data))
  }
  const handleCancel = () => {
    setProduct(productToProductCreate(data))
    setIsEditMode(prevState => !prevState)
  }

  const handleDelete = () => {
    dispatch(deleteProductAction(product._id as string))
  }

  useEffect(() => {
    if (isEditMode) {
      setProduct({
        ...product,
        category: category.categoryList.find(item => item.name === product.category)?._id as string ?? data.category.name,
        brand: brand.brandList.find(item => item.name === product.brand)?._id as string ?? data.brand.name
      })
    }
  }, [isEditMode]);

  useEffect(() => {
    setProduct(productToProductCreate(data))
  }, [data]);

  return (
    <div className="product-card">
      {
        isEditMode
          ? <>

            <img src={product.imageUrl} alt={product.name} className="product-card__image"/>
            <input type="text" value={product.imageUrl}
                   onChange={(e) => setProduct(prevState => ({...prevState, imageUrl: e.target.value}))}
            />
            <div className="product-card__details">
              <input type="text" value={product.name}
                     onChange={(e) => setProduct(prevState => ({...prevState, name: e.target.value}))}
              />
              <input type="number" value={product.price}
                     onChange={(e) => setProduct(prevState => ({...prevState, price: Number(e.target.value)}))}
              />
              <div className="product-card__meta">
                <select
                  style={product.brand === 'No brand' ? {borderColor: "red"} : {}}
                  value={
                    brand.brandList.find(item => item.name === product.brand)?.name ??
                    product.brand === 'No brand'
                      ? ""
                      : product.brand
                  }
                  onChange={(e) => setProduct(prevState => ({...prevState, brand: e.target.value}))}
                  required
                >
                  <option value="" disabled>Select Brand</option>
                  {brand.brandList.map((item) => (
                    <option key={item.name} value={(item._id as string)}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  style={product.category === 'No category' ? {borderColor: "red"} : {}}
                  value={
                    category.categoryList.find(item => item.name === product.category)?.name ??
                    product.category === 'No category'
                      ? ""
                      : product.category
                  }
                  onChange={(e) => setProduct(prevState => ({...prevState, category: e.target.value}))}
                  required
                >
                  <option value="" disabled>Category</option>
                  {category.categoryList.map((item) => (
                    <option key={item.name} value={(item._id as string)}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={"product-card__more"}>
                <input className="product-card__stock" type="number" value={product.stock}/>
                <textarea
                  className="product-card__description"
                  value={product.characteristics}
                  onChange={(e) => setProduct(prevState => ({...prevState, characteristics: e.target.value}))}
                  placeholder="Characteristics"
                  required
                ></textarea>
                <textarea
                  className="product-card__characteristics"
                  value={product.description}
                  onChange={(e) => setProduct(prevState => ({...prevState, description: e.target.value}))}
                  placeholder="Description"
                  required
                ></textarea>
              </div>
            </div>

          </>

          : <>
            <img src={product.imageUrl} alt={product.name} className="product-card__image"/>
            <div className="product-card__details">
              <h2 className="product-card__name">{product.name}</h2>
              <p className="product-card__price">{product.price.toFixed(2)}</p>
              <div className="product-card__meta">
                <div className="product-card__brand">
                  {data.brand.name}
                </div>
                <div className="product-card__category">
                  {data.category.name}
                </div>
              </div>
              <div className={"product-card__more"}>
                <p className="product-card__stock">Stock: {product.stock} шт.</p>
                <p className="product-card__characteristics">{product.characteristics}</p>
                <p className="product-card__description">{product.description}</p>
              </div>
            </div>
          </>
      }

      <div className="manage-buttons">
        {
          isEditMode
            ? <>
              <button className={''} onClick={handleOk}>OK</button>
              <button className={''} onClick={handleCancel}>Cancel</button>
            </>
            : <>
              <button className={''} onClick={() => setIsEditMode(prevState => !prevState)}>Edit</button>
              <Link href={`/product/${product._id}`}>Link</Link>
              <button className={''} onClick={handleDelete}>Delete</button>
            </>
        }
      </div>
    </div>
  )
    ;
};

export default ProductListElemEditable