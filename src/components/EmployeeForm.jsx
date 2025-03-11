import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({ addEmployee, updateEmployee, editingEmployee }) => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee); 
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); 
  };

  const validatePhone = (phone) => {
    return /^[0-9]{10}$/.test(phone); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(employee.email)) {
      alert("Invalid email format. Please enter a valid email.");
      return;
    }
    if (!validatePhone(employee.phone)) {
      alert("Invalid phone number. It should be exactly 10 digits.");
      return;
    }

    if (editingEmployee) {
      updateEmployee(employee);
    } else {
      addEmployee({ ...employee, id: Date.now() });
    }

    setEmployee({ name: "", email: "", phone: "", department: "", designation: "" }); 
    setEditingEmployee(null); 
    navigate("/employees"); 
  };

  return (
    <form
      className="bg-white mt-8 p-6 rounded-xl shadow-lg max-w-lg mx-auto border border-gray-300"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        {editingEmployee ? " Edit Employee" : " Register Employee"}
      </h2>

      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        value={employee.name}
        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        onChange={handleChange}
        value={employee.email}
        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        name="phone"
        type="tel"
        placeholder="Phone Number (10 digits)"
        onChange={handleChange}
        value={employee.phone}
        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        name="department"
        placeholder="Department"
        onChange={handleChange}
        value={employee.department}
        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        name="designation"
        placeholder="Designation"
        onChange={handleChange}
        value={employee.designation}
        className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <button
        type="submit"
        className="w-full bg-sky-800 text-white p-3 rounded-lg shadow-md transition text-lg"
      >
        {editingEmployee ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
