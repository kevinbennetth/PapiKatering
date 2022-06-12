import { useEffect, useState } from "react";
import Alert from "../alert/Alert";
import Button from "../button/Button";
import UploadButton from "../button/UploadButton";
import Dropdown from "../Dropdown";
import Input from "../input/Input";
import TextArea from "../input/TextArea";
import BaseModal from "./BaseModal";

const defaultMenuImage =
  "https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg";

const emptyMenuItems = [
  {
    menuitemid: "",
    menutime: "Breakfast",
    menuname: "",
    menuimage: "",
    menudescription: "",
  },
  {
    menuitemid: "",
    menutime: "Lunch",
    menuname: "",
    menuimage: "",
    menudescription: "",
  },
  {
    menuitemid: "",
    menutime: "Dinner",
    menuname: "",
    menuimage: "",
    menudescription: "",
  },
];

const dayDropdown = [
  { value: 0, show: "-- Choose Day --" },
  { value: 1, show: "Monday" },
  { value: 2, show: "Tuesday" },
  { value: 3, show: "Wednesday" },
  { value: 4, show: "Thursday" },
  { value: 5, show: "Friday" },
  { value: 6, show: "Saturday" },
  { value: 7, show: "Sunday" },
];

export default function MenuModal(props) {
  const { menu, menuInfo } = props;
  const [menuDay, setMenuDay] = useState(0);
  const [menuItems, setMenuItems] = useState(emptyMenuItems);
  const [error, setError] = useState(null);
  const [unavailableDays, setUnavailableDays] = useState([]);

  useEffect(() => {
    
    if (menu !== null) {
      setMenuItems(menu.menuitems);
      setMenuDay(menu.menuday);
    } else {
      setMenuItems(emptyMenuItems);
      setMenuDay(0);
    }
  }, [menu]);

  useEffect(() => {
    let unavailable = menuInfo.map(menuinf => menuinf.menuday)
    console.log(unavailable)
    setUnavailableDays(unavailable);
  }, [menuInfo]);

  const validateFormFields = () => {
    const submissionError = {
      header: "",
      detail: "",
    };

    if (menuDay === 0) {
      submissionError.header = "Menu Day Error";
      submissionError.detail = `Please choose a day !`;
    } else {
      for (let index = 0; index < menuItems.length; index++) {
        const menuitem = menuItems[index];
        if (menuitem.menuname.trim().length === 0) {
          submissionError.header = "Menu Name Error";
          submissionError.detail = `Menu Name (${menuitem.menutime}) can't be empty`;
          break;
        } else if (menuitem.menudescription.trim().length === 0) {
          submissionError.header = "Menu Description Error";
          submissionError.detail = `Menu Description (${menuitem.menutime}) can't be empty`;
          break;
        }
      }
    }

    return submissionError;
  };

  const createMenuHandler = () => {
    const menuID = menu === null ? "" : menu.menuid;

    const submissionError = validateFormFields();
    if (submissionError.header !== "" && submissionError.detail !== "") {
      setError(submissionError);
    } else {
      const newMenu = {
        menuid: menuID,
        menuday: menuDay,
        menuitems: menuItems,
      };
      console.log(newMenu)

      if (menu === null) {
        props.onUpdate(newMenu, "ADD");
      } else {
        props.onUpdate(newMenu, "UPDATE");
      }
      setMenuItems(emptyMenuItems);
      setMenuDay(0);
    }
  };

  const deleteMenuHandler = () => {
    props.onUpdate(menu.menuid, "DELETE");
  };

  const formDayHandler = (_, value) => {
    setMenuDay(parseInt(value));
  };

  const formMenuValueHandler = (name, value) => {
    const key = name.split("-");

    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((menuitem) => {
        if (menuitem.menutime === key[0]) {
          return {
            ...menuitem,
            [key[1]]: value,
          };
        }
        return menuitem;
      })
    );
  };

  return (
    <>
      <BaseModal show={props.show} onHideModal={props.onHideModal}>
        {error && (
          <Alert
            onFinishError={setError}
            header={error.header}
            detail={error.detail}
          />
        )}
        <h3 className="text-xl font-bold mb-6">Categories</h3>
        <Dropdown
          name="menuday"
          id="menuday"
          color="white"
          value={menuDay}
          options={dayDropdown.filter(day => !unavailableDays.includes(day.value))}
          onChange={formDayHandler}
        />
        {menuItems?.map((menuitem, idx) => (
          <div className="flex flex-col gap-4 mt-8" key={idx}>
            <h4 className="font-bold text-xl">{menuitem.menutime}</h4>
            <div className="flex flex-row gap-10">
              <div className="flex flex-col w-1/3 gap-4 items-center">
                <img
                  src={
                    typeof menuitem.menuimage === "string" ||
                    menuitem.menuimage instanceof String
                      ? menuitem.menuimage === ""
                        ? defaultMenuImage
                        : menuitem.menuimage
                      : URL.createObjectURL(menuitem.menuimage)
                  }
                  className="object-cover rounded-md aspect-square w-full"
                  alt=""
                />
                <UploadButton
                  onFileSelect={formMenuValueHandler}
                  name={`${menuitem.menutime}-menuimage`}
                  id={`${menuitem.menutime}-menuimage`}
                >
                  Edit
                </UploadButton>
              </div>
              <div className="w-2/3 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <strong htmlFor="name">Menu Name</strong>
                  <Input
                    type="text"
                    name={`${menuitem.menutime}-menuname`}
                    id={`${menuitem.menutime}-menuname`}
                    color="white"
                    value={menuitem.menuname}
                    onChange={formMenuValueHandler}
                    // onChange={(event) => menuChangeHandler(event, 0, "name")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <strong htmlFor="name">Description</strong>
                  <TextArea
                    type="text"
                    name={`${menuitem.menutime}-menudescription`}
                    id={`${menuitem.menutime}-menudescription`}
                    color="white"
                    value={menuitem.menudescription}
                    onChange={formMenuValueHandler}
                    rows="8"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-row justify-end gap-6 pr-2 mt-5">
          {menu && (
            <Button type="button" onClick={deleteMenuHandler}>
              Delete
            </Button>
          )}
          <Button type="button" onClick={createMenuHandler}>
            Save
          </Button>
        </div>
      </BaseModal>
    </>
  );
}
