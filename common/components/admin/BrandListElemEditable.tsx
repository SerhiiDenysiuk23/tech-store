import React, {FC, useState} from 'react';
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {IBrand} from "@/types/IBrand";
import {deleteBrandAction, editBrandAction} from "@/common/store/brand/brand.slice";

const CategoryListElemEditable: FC<{ item: IBrand }> = ({item}) => {
  const dispatch = useAppDispatch();
  const [isEditMode, setIsEditMode] = useState(false)
  const [brand, setBrand] = useState({_id: item._id, name: item.name})


  const handleOk = () => {
    dispatch(editBrandAction({_id: brand._id as string, name: brand.name}))
    setIsEditMode(prevState => !prevState)
    setBrand({_id: item._id, name: item.name})
  }
  const handleCancel = () => {
    setBrand({_id: item._id, name: item.name})

    setIsEditMode(prevState => !prevState)
  }

  const handleDelete = () => {
    dispatch(deleteBrandAction(brand._id as string))
  }


  return (
    <li>
      {
        isEditMode
          ?
          <input type="text" value={brand.name} onChange={(e) => setBrand({...brand, name: e.target.value})}/>
          : <span>{item.name}</span>
      }
      <div>
        <div className="manage-buttons">
          {
            isEditMode
              ? <>
                <button className={''} onClick={handleOk}>OK</button>
                <button className={''} onClick={handleCancel}>Cancel</button>
              </>
              : <>
                <button className={''} onClick={() => setIsEditMode(prevState => !prevState)}>Edit</button>
                <button className={''} onClick={handleDelete}>Delete</button>
              </>
          }
        </div>
      </div>
    </li>
  );
};

export default CategoryListElemEditable;