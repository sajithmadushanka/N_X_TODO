'use client'


import { ModelHandelBtn } from './ModelHandelBtn';
import { UserStateContext } from '../context/ContextProvider';


import { logoutService } from '../services/authService';
const Header = () => {
    const modal = UserStateContext();

  const handleLogout = async () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if(confirm){
        modal.setUser({userId: "", email: "", name: ""});
    }
    // clear cookies userid
    try{
        const res = await logoutService();
        if(!res.ok){
            console.log("error logout")
        }
        console.log("logout success", res.message)
    }catch(e){
        console.log(e)
    }
    
  }
    return (
        <header className="h-16 w-full bg-white shadow-md flex items-center">
            <div className="w-[80%] mx-auto flex justify-between items-center">
                {/* Logo / Title */}
                <h2 className="text-xl font-bold text-gray-800">Welcome to My TODO</h2>
                
                {/* Navigation */}
                <nav className="flex space-x-6">
                    <h2  className="text-gray-700 hover:text-blue-500 transition-all">{modal.user.name}</h2>
                    {modal.user.userId !== "" ? (
                        <button 
                            onClick={() =>handleLogout()}
                        className="text-red-600 hover:text-red-800 transition-all">Logout</button>
                    ) : (
                        <button 
                        onClick={modal.openModal}
                        className="text-gray-700 hover:text-blue-500 transition-all">Login</button>
                    )}
                </nav>
            </div>
            {/* Modal */}
            {modal.isOpen && (
                <ModelHandelBtn/>
            )}

        </header>
    );
};

export default Header;

