const QuizPage = () => {
  return (
    <div className=" min-h-full absolute w-full bg-white top-0 flex flex-row z-10">
      <img
        src="https://images2.alphacoders.com/100/1003810.jpg"
        alt=""
        className="w-3/12 object-cover object-left"
      />
      <div className="flex flex-col p-20 gap-10">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-4">Papi's Advisor</h3>
          <p>
            Hi ! Papi would like to know your food preferences, so please answer
            the questions below 👏
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="font-bold">Category</h4>
          <div className="flex flex-col gap-3">
            <p>Would you like your food to be halal?</p>
            <div className="flex flex-row gap-4">
              <input type="radio" name="halal" id="" />
              <p>Only halal</p>
            </div>
            <div className="flex flex-row gap-4">
              <input type="radio" name="halal" id="" />
              <p>Only non-jalal</p>
            </div>
            <div className="flex flex-row gap-4">
              <input type="radio" name="halal" id="" />
              <p>Both are fine</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p>Would you like your food to be vegetarian?</p>
            <div className="flex flex-row gap-4">
              <input type="radio" name="vegetarian" id="" />
              <p>Only vegetarian</p>
            </div>
            <div className="flex flex-row gap-4">
              <input type="radio" name="vegetarian" id="" />
              <p>Only non-vegetarian</p>
            </div>
            <div className="flex flex-row gap-4">
              <input type="radio" name="vegetarian" id="" />
              <p>Both are fine</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="font-bold">Price Range</h4>
          <p>How much are you willing to spend in a day?</p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row border-2 border-[#686868] rounded-sm">
                <p className="p-2 bg-[#686868] text-white font-bold">Rp</p>
                <input type="number" className="w-full px-4 focus:outline-none" placeholder="Minimum Price" />
            </div>
            <div className="flex flex-row border-2 border-[#686868] rounded-sm">
                <p className="p-2 bg-[#686868] text-white font-bold">Rp</p>
                <input type="number" className="w-full px-4 focus:outline-none" placeholder="Maximum Price" />
            </div>
          </div>
        </div>

        <button className="px-8 py-3 rounded text-white font-semibold bg-primary self-start mt-2 hover:opacity-75">
          Save
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
