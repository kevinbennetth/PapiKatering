import { FaEdit } from "react-icons/fa";

export default function CheckoutPage() {
  return (
    <div className="flex flex-row px-12 py-20 gap-20 bg-gray-50 items-start">
      <div className="flex flex-col gap-10 w-2/3">
        <h1 className="font-bold text-3xl">Checkout</h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-xl font-medium">Shipping address</h2>
            <div className="flex flex-row items-center gap-2">
              <p className="font-semibold">Change Address</p>
              <FaEdit className="fill-emerald-600 mx-1 w-6 h-6" />
            </div>
          </div>
          <hr className="border-black" />
          <div className="mt-4 flex flex-col gap-4 p-6 shadow-lg rounded-md bg-white">
            <div className="title text-xl font-bold">Rumah</div>
            <p className="text-md">Jl. Pangeran Pangeran 22 Kalimantan Barat</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-medium">Order</h2>
          <hr className="border-black" />
          <div className="flex flex-col gap-8">
            <h3 className="font-medium text-xl">Winter Catering</h3>
            <div className="flex flex-row gap-10 items-center">
              <div className="relative w-1/6">
                <img
                  className="w-full aspect-square object-cover rounded"
                  src="https://media.istockphoto.com/photos/table-top-view-of-spicy-food-picture-id1316145932?b=1&k=20&m=1316145932&s=170667a&w=0&h=feyrNSTglzksHoEDSsnrG47UoY_XX4PtayUPpSMunQI="
                  alt=""
                />
                <p className="absolute right-2 top-2 bg-primary text-center p-2 text-white font-bold w-10 rounded-full aspect-square">
                  3
                </p>
              </div>
              <div className="flex flex-col gap-2 w-4/6">
                <h4 className="font-bold text-2xl">Paket A</h4>
                <p>Breakfast</p>
              </div>
              <div className="flex flex-col gap-2 w-1/6">
                <h4 className="font-bold text-2xl w-full text-right">Rp 30.000</h4>
                <div className="flex flex-row-reverse items-center gap-1">
                  <p className="text-xl text-right w-1/2">Days</p>
                  <input
                    type="number"
                    min={0}
                    className="w-1/3 border-2 rounded text-xl py-1 text-center border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
                <hr className="border-gray-400"/>
                <div className="flex flex-row justify-between">
                <p className="font-semibold text-xl">Sub Total</p>
                <p className="font-semibold text-xl">Rp 180.000</p>
                </div>
                
                <hr className="border-black"/>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-8 shadow-lg gap-8 rounded-md w-1/3 bg-white">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <div className="grid grid-cols-2 gap-y-5">
          <p>Total Price</p>
          <p className="justify-self-end">Rp 180.000</p>
          <p>Shipping</p>
          <p className="justify-self-end">Rp 20.000</p>
          <hr className="col-span-2 border-t-2 border-gray-300" />
          <p className="font-bold">Grand Total</p>
          <p className="justify-self-end font-bold">Rp 200.000</p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-bold">Payment Method</p>
          <select
            name=""
            id=""
            className="w-full bg-white focus:outline-none cursor-pointer border-black border-opacity-50 border-2 p-1 rounded-md"
          >
            <option value="1">Main Card</option>
            <option value="2">Secondary Card</option>
          </select>
        </div>
        <button className="py-3 rounded text-white font-bold bg-primary w-full hover:opacity-75">
          Order
        </button>
      </div>
    </div>
  );
}
