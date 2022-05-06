import { Link } from "react-router-dom";

const RegisterPage = () =>{
    return (
        <div className="div grid grid-cols-12 gap-0 h-full">
        <div className="left-banner col-span-4"></div>
        <div className="right-regis col-span-8 m-auto w-[500px]">
            <div className="regis-container w-full">
                <h1 className="text-3xl font-bold">Register to PAPIKATERING</h1>

                <form action="" method="get" className="my-8">
                    <div className="name-container container my-6 w-full">
                        <p className="text-lg font-bold">Name</p>
                        <input type="text" name="name" id="name" className="bg-gray-200 rounded-md w-full p-1" />
                    </div>

                    <div className="email-container container my-6 w-full">
                        <p className="text-lg font-bold">Email Address</p>
                        <input type="text" name="email" id="email" className="bg-gray-200 rounded-md w-full p-1" />
                    </div>

                    <div className="phone-container container my-6 w-full">
                        <p className="text-lg font-bold">Phone Number</p>
                        <input type="text" name="phone" id="phone" className="bg-gray-200 rounded-md w-full p-1" />
                    </div>

                    <div className="address-container container my-6 w-full">
                        <p className="text-lg font-bold">Address</p>
                        <textarea name="address" id="address" className="bg-gray-200 rounded-md w-full p-1" />
                    </div>

                    <div className="dob-container container my-6 w-full">
                        <p className="text-lg font-bold">Date of Birth</p>
                        <input type="date" name="dob" id="dob" className="bg-gray-200 rounded-md w-full p-1" />
                    </div>

                    <div className="gender-container container my-6 w-full">
                        <p className="text-lg font-bold">Gender</p>
                        <select name="gender" id="gender" className="bg-gray-200 rounded-md w-full p-1">
                            <option value="default">--Choose Gender--</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="password-container container my-6 w-full">
                        <p className="text-lg font-bold">Password</p>
                        <input type="password" name="password" id="password" className="bg-gray-200 rounded-md w-full p-1" />
                    </div>

                    <div className="confirmPass-container container my-6 w-full">
                        <p className="text-lg font-bold">Confirm Password</p>
                        <input type="password" name="password" id="password" className="bg-gray-200 rounded-md w-full p-1" />
                    </div>
                </form>

                <button className="block px-10 py-2 mt-12 mb-4 bg-emerald-600 hover:bg-emerald-700
                            text-white font-bold
                            rounded-md">Register</button>

                <div className="have-account font-bold">
                    Already have an account? 
                    <Link to="/login" 
                    className="text-emerald-600 hover:text-emerald-700"> Login here</Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default RegisterPage;