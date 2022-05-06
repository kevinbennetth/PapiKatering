

const OngoingOrdersMenu = () => {
    return (
        <div className="ongoingOrders-menu">
            <div className="title text-3xl border-b-2">Ongoing Subscription</div>
            <div className="category flex flex-row justify-end mt-4">
                <select name="" id="" className="rounded-md border-2 border-slate-300">
                    <option value="customer">Customer</option>
                </select>
            </div>
            <div className="orders mt-8">
                <div className="grid grid-cols-12 bg-white p-4 rounded-md drop-shadow-md">
                    <div className="card-header flex flex-row justify-between col-span-12">
                        <div className="font-bold text-xl">Winter Catering</div>
                        <div className="font-bold text-md">12 Jan 2022</div>
                    </div>
                    <div className="content grid grid-cols-12 col-span-12 mt-8">
                        <div className="food-img col-span-2">
                        <img src="https://static.zerochan.net/Ko.Elizabeth.full.2947878.jpg" alt=""
                        className="profile-img-round rounded-md w-[75%]" />
                        </div>
                        <div className="package col-span-6 flex flex-col justify-center">
                            <div className="name font-bold text-2xl">Paket B</div>
                            <div className="price text-md">Rp. 30.000</div>
                        </div>
                        <div className="order-detail col-span-4 flex flex-col items-end">
                            <div className="period text-lg">2 Days</div>
                            <div className="font-bold mt-4">Total purchase</div>
                            <div className="total-price">Rp. 180.000</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OngoingOrdersMenu;