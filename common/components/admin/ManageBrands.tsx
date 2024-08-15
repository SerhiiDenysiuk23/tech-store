import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";
import {createBrandAction, set_fail_brand} from "@/common/store/brand/brand.slice";
import BrandListElemEditable from "@/common/components/admin/BrandListElemEditable";

const ManageBrands = () => {
  const dispatch = useAppDispatch();
  const [brandName, setBrandName] = useState('');
  const {brandList, fail} = useAppSelector(state => state.rootReducer.brand)


  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName){
      dispatch(set_fail_brand("Field is required"))
      return
    }
    else if (fail){
      dispatch(set_fail_brand(""))
    }

    dispatch(createBrandAction(brandName));
    setBrandName('');
  };

  return (
    <div className="manage manage__single-value">
      <form onSubmit={handleCategorySubmit} className="auth-form">
        <h1>Add Brand</h1><br/>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Brand Name"
        />
        {fail && <p>{fail}</p>}
        <button type="submit">Add Brand</button>
      </form>

      <ul>
        {
          brandList.map(item => <BrandListElemEditable item={item}/>)
        }
      </ul>
    </div>
  );
};

export default ManageBrands;