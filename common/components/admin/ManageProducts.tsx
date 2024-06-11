import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";
import {IProduct, IProductToCreate} from "@/types/IProduct";
import {createProductAction} from "@/common/store/product/product.slice";
import ProductListElem from "@/common/components/ProductListElem";

const initProduct: IProductToCreate = {
  name: '',
  price: 0,
  description: '',
  category: "",
  brand: "",
  characteristics: '',
  stock: 0,
  imageUrl: ''
}

const ManageProducts = () => {
  const dispatch = useAppDispatch();

  const [productCreate, setProductCreate] = useState<IProductToCreate>(initProduct)

  const {category, brand } = useAppSelector(state => state.rootReducer)


  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createProductAction(productCreate))
    setProductCreate(initProduct)
  };

  return (
    <div className="manage manage__multi-value">
      <form onSubmit={handleProductSubmit} className="auth-form">
        <h1>Add Product</h1>
        <input
          type="text"
          value={productCreate.name}
          onChange={(e) => setProductCreate(prevState => ({...prevState, name: e.target.value}))}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={productCreate.imageUrl}
          onChange={(e) => setProductCreate(prevState => ({...prevState, imageUrl: e.target.value}))}
          placeholder="Image Url"
          required
        />
        <textarea
          value={productCreate.description}
          onChange={(e) => setProductCreate(prevState => ({...prevState, description: e.target.value}))}
          placeholder="Id Description"
          required
        ></textarea>
        <textarea
          value={productCreate.characteristics}
          onChange={(e) => setProductCreate(prevState => ({...prevState, characteristics: e.target.value}))}
          placeholder="Id Characteristics"
          required
        ></textarea>
        <input
          type="number"
          value={productCreate.price || ""}
          onChange={(e) => setProductCreate(prevState => ({...prevState, price: Number(e.target.value)}))}
          placeholder="Id Price"
          required
        />



        <select
          value={productCreate.category}
          onChange={(e) => setProductCreate(prevState => ({...prevState, category: e.target.value}))}
          required
        >
          <option value="" disabled>Select Category</option>
          {category.categoryList.map((item) => (
            <option key={(item._id as string)  ?? item.name} value={(item._id as string)}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          value={productCreate.brand}
          onChange={(e) => setProductCreate(prevState => ({...prevState, brand: e.target.value}))}
          required
        >
          <option value="" disabled>Select Brand</option>
          {brand.brandList.map((item) => (
            <option key={(item._id as string) ?? item.name} value={(item._id as string)}>
              {item.name}
            </option>
          ))}
        </select>



        <input
          type="number"
          value={productCreate.stock || ""}
          onChange={(e) => setProductCreate(prevState => ({...prevState, stock: Number(e.target.value)}))}
          placeholder="Id Stock"
          required
        />
        <button type="submit">Add Id</button>
      </form>
    </div>
  );
};

export default ManageProducts;