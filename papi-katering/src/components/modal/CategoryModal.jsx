import BaseModal from "./BaseModal";

export default function CategoryModal(props) {
  return (
    <BaseModal show={props.show} hideModal={props.hideModal}>
      <h3 className="text-xl font-bold mb-6">Categories</h3>
      <div className="flex flex-col gap-4 mr-20">
        <div className="flex flex-col gap-2">
          <strong className="mb-2">Is your food halal ?</strong>
          <div className="flex flex-row gap-4">
            <input type="radio" name="halal" id="" />
            <p>Halal</p>
          </div>
          <div className="flex flex-row gap-4">
            <input type="radio" name="halal" id="" />
            <p>Not Halal</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <strong className="mb-2">
            Is your packet suitable for vegetarians ?
          </strong>
          <div className="flex flex-row gap-4">
            <input type="radio" name="vegetarian" id="" />
            <p>Vegetarian</p>
          </div>
          <div className="flex flex-row gap-4">
            <input type="radio" name="vegetarian" id="" />
            <p>Non-Vegetarian</p>
          </div>
        </div>
        <button className="px-16 py-3 rounded text-white font-bold bg-primary self-start mt-2 hover:opacity-75">
          Save
        </button>
      </div>
    </BaseModal>
  );
}
