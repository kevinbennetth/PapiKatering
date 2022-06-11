import { useEffect, useState } from "react";
import Button from "../button/Button";
import NewBaseModal from "./NewBaseModal";

export default function CategoryModal(props) {
  const [tempCategory, setTempCategory] = useState(props.tempCategory);

  const categorySaveHandler = () => {
    props.onSave("category", tempCategory);
    props.onHideModal();
  };

  const checkHandler = (e) => {
    const value = parseInt(e.target.value);

    if (e.target.checked) {
      setTempCategory((prevCategory) => [...prevCategory, value]);
    } else {
      setTempCategory((prevCategory) =>
        prevCategory.filter((ctg) => ctg !== value)
      );
    }
  };

  useEffect(() => {
    setTempCategory(props.category);
  }, [props.category]);

  return (
    <NewBaseModal show={props.show} onHideModal={props.onHideModal}>
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
              defaultChecked={props.category.includes(categoryItem.categoryid)}
              onChange={checkHandler}
            />
            <p>{categoryItem.categoryname}</p>
          </div>
        ))}
      </div>
      <Button type="button" onClick={categorySaveHandler}>
        Save
      </Button>
    </NewBaseModal>
  );
}
