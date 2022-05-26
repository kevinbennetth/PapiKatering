import BaseModal from "./BaseModal";

export default function MenuModal(props) {
  return (
    <BaseModal show={props.show} hideModal={props.hideModal}>
      <h3 className="text-xl font-bold mb-6">Categories</h3>
      <select
        defaultValue={0}
        name="day"
        className="w-full bg-white focus:outline-none cursor-pointer border-black border-opacity-50 border-2 p-2 rounded-md mb-10"
      >
        <option value="0">-- Choose Day --</option>
        <option value="1">Monday</option>
        <option value="2">Tuesday</option>
        <option value="3">Wednesday</option>
        <option value="4">Thursday</option>
        <option value="5">Friday</option>
        <option value="6">Saturday</option>
        <option value="7">Sunday</option>
      </select>
      <div className="flex flex-col gap-4">
        <h4 className="font-bold text-xl">Breakfast</h4>
        <div className="flex flex-row gap-10">
          <div className="flex flex-col w-1/3 gap-4">
            <img
              src="https://www.expatica.com/app/uploads/sites/5/2014/05/french-food-1920x1080.jpg"
              className="object-cover rounded-md aspect-square "
              alt=""
            />
            <button
              className="block px-10 py-2 bg-primary hover:bg-emerald-700
                            text-white font-bold rounded-md w-1/2 self-center"
            >
              Edit
            </button>
          </div>
          <div className="w-2/3 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <strong htmlFor="name">Menu Name</strong>
              <input
                type="text"
                name="name"
                id="name"
                className="rounded-md border w-full p-1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <strong htmlFor="name">Description</strong>
              <textarea
                type="text"
                name="description"
                id="description"
                className="rounded-md border w-full p-1 resize-none"
                rows="8"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="font-bold text-xl">Lunch</h4>
        <div className="flex flex-row gap-10">
          <div className="flex flex-col w-1/3 gap-4">
            <img
              src="https://www.expatica.com/app/uploads/sites/5/2014/05/french-food-1920x1080.jpg"
              className="object-cover rounded-md aspect-square "
              alt=""
            />
            <button
              className="block px-10 py-2 bg-primary hover:bg-emerald-700
                            text-white font-bold rounded-md w-1/2 self-center"
            >
              Edit
            </button>
          </div>
          <div className="w-2/3 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <strong htmlFor="name">Menu Name</strong>
              <input
                type="text"
                name="name"
                id="name"
                className="rounded-md border w-full p-1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <strong htmlFor="name">Description</strong>
              <textarea
                type="text"
                name="description"
                id="description"
                className="rounded-md border w-full p-1 resize-none"
                rows="8"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="font-bold text-xl">Dinner</h4>
        <div className="flex flex-row gap-10">
          <div className="flex flex-col w-1/3 gap-4">
            <img
              src="https://www.expatica.com/app/uploads/sites/5/2014/05/french-food-1920x1080.jpg"
              className="object-cover rounded-md aspect-square "
              alt=""
            />
            <button
              className="block px-10 py-2 bg-primary hover:bg-emerald-700
                            text-white font-bold rounded-md w-1/2 self-center"
            >
              Edit
            </button>
          </div>
          <div className="w-2/3 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <strong htmlFor="name">Menu Name</strong>
              <input
                type="text"
                name="name"
                id="name"
                className="rounded-md border w-full p-1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <strong htmlFor="name">Description</strong>
              <textarea
                type="text"
                name="description"
                id="description"
                className="rounded-md border w-full p-1 resize-none"
                rows="8"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-end gap-6 pr-2 mt-5">
        <button className="px-8 py-3 rounded text-white font-semibold bg-primary self-start mt-2 hover:opacity-75">
          Delete
        </button>
        <button className="px-8 py-3 rounded text-white font-semibold bg-primary self-start mt-2 hover:opacity-75">
          Save
        </button>
      </div>
    </BaseModal>
  );
}
