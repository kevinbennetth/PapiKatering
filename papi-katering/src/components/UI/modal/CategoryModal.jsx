import { useState } from "react";
import Button from "../button/Button";
import BaseModal from "./BaseModal";

export default function CategoryModal(props) {
  const [category, setCategory] = useState(props.category);

  const categorySaveHandler = () => {
    props.onSave("category", category);
    props.onHideModal();
  };

  const checkHandler = (e) => {
    const value = parseInt(e.target.value);

    if (e.target.checked) {
      setCategory((prevCategory) => [...prevCategory, value]);
    } else {
      setCategory((prevCategory) =>
        prevCategory.filter((ctg) => ctg !== value)
      );
    }
  };

  return (
    <BaseModal show={props.show} onHideModal={props.onHideModal}>
      <h3 className="text-3xl font-bold">Categories</h3>
      <div className="flex flex-col gap-2 my-8">
        <p className="mb-2 text-lg">
          Please check the categories that describes your packet
        </p>

        {props.categoryList?.map((categoryItem) => (
          <div className="flex flex-row gap-4" key={categoryItem.categoryid}>
            <input
              type="checkbox"
              value={categoryItem.categoryid}
              defaultChecked={category.includes(categoryItem.categoryid)}
              onChange={checkHandler}
            />
            <p>{categoryItem.categoryname}</p>
          </div>
        ))}
      </div>
      <Button type="button" onClick={categorySaveHandler}>
        Save
      </Button>
    </BaseModal>
  );
}
