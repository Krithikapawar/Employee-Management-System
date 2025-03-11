import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <nav className="bg-black p-4 text-white shadow-lg flex justify-between items-center">
      <h1 className="text-2xl font-extrabold tracking-wide">Employee Management</h1>

      <div className="flex items-center gap-6">
        <Link 
          to="/employees" 
          className="text-md font-medium hover:text-gray-200 transition duration-300"
        >
          Employee List
        </Link>

        <Link 
          to="/register" 
          className="text-md font-medium hover:text-gray-200 transition duration-300"
        >
          Add Employee
        </Link>

        <button 
          onClick={handleLogout} 
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full shadow-md transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
