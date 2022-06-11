import React, { useState } from "react";
import MenuCard from "../../components/UI/card/MenuCard";
import MenuModal from "../../components/UI/modal/MenuModal";
import ItemsCarousel from "react-items-carousel";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function MenuForm(props) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [menuModal, setMenuModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const hideModalHandler = () => {
    setMenuModal(false);
  };

  const deleteMenu = (id) => {
    const updatedMenu = props.menu.filter((menu) => menu.menuid !== id);
    props.onUpdate("menu", updatedMenu);
  };

  const updateMenu = (data) => {
    const updatedMenu = props.menu.map((menu) => {
      if (menu.menuid === data.menuid) {
        return data;
      }
      return menu;
    });
    props.onUpdate("menu", updatedMenu);
  };

  const addMenu = (data) => {
    let index = 0;
    while (index < props.menu.length) {
      const menu = props.menu[index];
      if (menu.menuday > data.menuday) {
        break;
      }
      index++;
    }
    const updatedMenu = props.menu;
    updatedMenu.splice(index, 0, data);
    props.onUpdate("menu", updatedMenu);
  };

  const editMenu = (id) => {
    setSelectedMenu(...props.menu.filter((menu) => menu.menuid === id));
    setMenuModal(true);
  };

  const menuCardUpdateHandler = (id, action) => {
    if (action === "EDIT") {
      editMenu(id);
    } else if (action === "DELETE") {
      deleteMenu(id);
    }
  };

  const menuChangeHandler = (data, action) => {
    if (action === "DELETE") {
      deleteMenu(data);
    } else if (action === "ADD") {
      addMenu(data);
    } else if (action === "UPDATE") {
      updateMenu(data);
    }
    setMenuModal(false);
  };

  const addMenuModal = () => {
    setSelectedMenu(null);
    setMenuModal(true);
  };
  return (
    <>
      <MenuModal
        show={menuModal}
        onHideModal={hideModalHandler}
        menu={selectedMenu}
        onUpdate={menuChangeHandler}
        menuInfo={props.menu}
      />
      <div className="flex flex-col gap-6">
        <h4
          className="text-xl font-bold text-primary cursor-pointer self-end"
          onClick={addMenuModal}
        >
          + Add Menu
        </h4>
        <ItemsCarousel
          requestToChangeActive={(e) => setActiveItemIndex(e)}
          activeItemIndex={activeItemIndex}
          numberOfCards={3}
          gutter={20}
          leftChevron={
            <button>
              <AiOutlineLeft className="fill-primary mx-1" />
            </button>
          }
          rightChevron={
            <button>
              <AiOutlineRight className="fill-primary mx-1" />
            </button>
          }
          outsideChevron
          chevronWidth={40}
        >
          {props.menu.map((menu) => (
            <MenuCard
              menu={menu}
              key={menu.menuid}
              onUpdate={menuCardUpdateHandler}
              type="EDIT"
            />
          ))}
        </ItemsCarousel>
      </div>
    </>
  );
}
