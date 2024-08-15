import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";
import {createCategoryAction, set_fail_category} from "@/common/store/category/category.slice";

const ManageCategories = () => {
  const dispatch = useAppDispatch();
  const [categoryName, setCategoryName] = useState('');
  const {categoryList, fail} = useAppSelector(state => state.rootReducer.category)


  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName){
      dispatch(set_fail_category("Field is required"))
      return
    }
    else if (fail){
      dispatch(set_fail_category(""))
    }

    dispatch(createCategoryAction(categoryName));
    setCategoryName('');
  };

  return (
    <div className="manage manage__single-value">
      <form onSubmit={handleCategorySubmit} className="auth-form">
        <h1>Add Category</h1><br/>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
        />
        {fail && <p>{fail}</p>}
        <button type="submit">Add Category</button>
      </form>
      <ul>
        {
          categoryList.map(item => (
            <li key={item.name}>{item.name}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default ManageCategories;