import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import Navbar from "./components/Navbar";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("isAuthenticated") ? (
    <>
      <Navbar />  
      {children}
    </>
  ) : (
    <Navigate to="/signin" />
  );
};

function App() {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee) => {
    setEmployees([...employees, { id: Date.now(), ...employee }]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
    setEditingEmployee(null);
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <EmployeeList employees={employees} deleteEmployee={deleteEmployee} setEditingEmployee={setEditingEmployee} />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <EmployeeForm addEmployee={addEmployee} updateEmployee={updateEmployee} editingEmployee={editingEmployee} setEditingEmployee={setEditingEmployee} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
