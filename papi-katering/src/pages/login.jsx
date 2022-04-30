import { Link } from "react-router-dom";

const LoginPage = () =>{
    return (
        <div className="page grid grid-cols-12 gap-0 h-full">
        <div className="left-banner col-span-4"></div>
        <div className="right-login col-span-8 m-auto w-[500px]">
            <div className="login-container w-full">
                <h1 className="text-3xl font-bold">Login to PAPIKATERING</h1>
        
                <form action="" method="get" className="my-16">
                    <div className="email-container container my-8 w-full">
                        <p className="text-lg font-bold">Email Address</p>
                        <input type="text" name="email" id="email" 
                            className="bg-gray-200 rounded-md w-full p-1" />
                    </div>
                    
                    <div className="password-container container my-8">
                        <div className="password-labels flex justify-between">
                            <p className="text-lg font-bold">Password</p>
                            <Link to="" className="text-emerald-600">Forgot Password?</Link>
                        </div>
                        
                        <input type="password" name="password" id="password" 
                            className="bg-gray-200 rounded-md w-full p-1" />
                    </div>
                </form>
        
                <button className="block px-10 py-2 mt-12 mb-4 bg-emerald-600 hover:bg-emerald-700
                            text-white font-bold
                            rounded-md">Login</button>
        
                <div className="not-registered font-bold">
                    Not Registered Yet? 
                    <Link to="/register" className="text-emerald-600"> Create an Account</Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default LoginPage;