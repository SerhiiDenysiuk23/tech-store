import React, {FC, useState} from 'react';
import {ICategory} from "@/types/ICategory";
import {deleteCategoryAction, editCategoryAction} from "@/common/store/category/category.slice";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";

const CategoryListElemEditable: FC<{ item: ICategory }> = ({item}) => {
  const dispatch = useAppDispatch();
  const [isEditMode, setIsEditMode] = useState(false)
  const [category, setCategory] = useState({_id: item._id, name: item.name})


  const handleOk = () => {
    dispatch(editCategoryAction({_id: category._id as string, name: category.name}))
    setIsEditMode(prevState => !prevState)
    setCategory({_id: item._id, name: item.name})
  }
  const handleCancel = () => {
    setCategory({_id: item._id, name: item.name})

    setIsEditMode(prevState => !prevState)
  }

  const handleDelete = () => {
    dispatch(deleteCategoryAction(category._id as string))
  }


  return (
    <li>
      {
        isEditMode
          ?
          <input type="text" value={category.name} onChange={(e) => setCategory({...category, name: e.target.value})}/>
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