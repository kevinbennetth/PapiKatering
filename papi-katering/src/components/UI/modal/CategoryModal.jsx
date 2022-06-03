import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";

export default function CategoryModal(props) {
  const [tempSelectedCategory, setTempSelectedCategory] = useState(
    props.selectedCategory
  );

  const selectCategoryHandler = (e) => {
    const checked = e.target.checked;
    const value = parseInt(e.target.value);
    if (checked) {
      setTempSelectedCategory((prevCategory) => [...prevCategory, value]);
    } else {
      setTempSelectedCategory((prevCategory) =>
        prevCategory.filter((category) => category !== value)
      );
    }
  };

  const updateCategoryHandler = (e) => {
    e.preventDefault();
    props.onUpdateSelectedCategory(tempSelectedCategory);
    props.onHideModal();
    console.log(tempSelectedCategory);
  };

  return (
    props.category.length > 0 && (
      <BaseModal show={props.show} onHideModal={props.onHideModal}>
        <h3 className="text-xl font-bold mb-6">Categories</h3>
        <div className="flex flex-col gap-4 mr-20">
          <div className="flex flex-col gap-2">
            <strong className="mb-2">Is your food halal ?</strong>

            {props.category.map((category) => (
              <div className="flex flex-row gap-4" key={category.categoryid}>
                <input
                  type="checkbox"
                  value={category.categoryid}
                  onChange={selectCategoryHandler}
                  defaultChecked={props.selectedCategory.includes(
                    category.categoryid
                  )}
                  id=""
                />
                <p>{category.categoryname}</p>
              </div>
            ))}
          </div>
          <button
            onClick={updateCategoryHandler}
            className="px-16 py-3 rounded text-white font-bold bg-primary self-start mt-2 hover:opacity-75"
          >
            Save
          </button>
        </div>
      </BaseModal>
    )
  );
}
