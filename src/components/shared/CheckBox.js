import React, {useState, useEffect} from 'react';

const CheckBox = ({categories, handleFilters}) => {

    const [checked, setChecked] = useState([])

    const handleToggle = cat => () => {
        // return the index or -1
        const currentCategoryId = checked.indexOf(cat);
        const newCheckedCategoryId = [...checked];
        // if curently checked was not already in checked state > push
        // else remove 
        if(currentCategoryId === -1) {
            newCheckedCategoryId.push(cat)
        }
        else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    }

    return categories.map( (cat, i) => (
            <li key={i} className="list-unstyled">
                <input 
                onChange={handleToggle(cat._id)} 
                value={cat._id === -1} 
                type="checkbox" 
                className="form-check-input"
            />
                <label className="form-check-label">{cat.name}</label>
            </li>
        ))
}

export default CheckBox;