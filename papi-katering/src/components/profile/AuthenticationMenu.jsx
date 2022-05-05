
const AuthenticationMenu = () => {
    return (
        <div className="authentication-menu">
            <div className="title text-3xl border-b-2">Authentication</div>
            <form action="" method="post" className="w-7/12 mt-4 mb-12">
                <div className="new-pass-container">
                    <p>New Password</p>
                    <input type="text" name="pass" id="pass" 
                    className="rounded-md border w-full p-1"/>
                </div>

                <div className="confirm-pass-container mt-4">
                    <p>Confirm New Password</p>
                    <input type="text" name="confirm-pass" id="confirm-pass" 
                    className="rounded-md border w-full p-1"/>
                </div>
            </form>

            <button className="block px-10 py-2 mt-12 mb-4 bg-emerald-600 hover:bg-emerald-700
                text-white font-bold rounded-md">Save</button>
        </div>
    );
}

export default AuthenticationMenu;