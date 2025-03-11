import { useNavigate } from "react-router-dom";

const EmployeeList = ({ employees, deleteEmployee, setEditingEmployee }) => {
  const navigate = useNavigate();

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    navigate("/register");
  };
 

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 my-4 text-center">Employee List</h2>

      {employees.length === 0 ? (
        <div className="text-center text-gray-500 p-6">
          <p className="text-lg">No employees added yet.</p>
          <button
            onClick={() => navigate("/register")}
            className="mt-3 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
             Add Employee
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3 border border-gray-300"> Name</th>
                <th className="p-3 border border-gray-300"> Email</th>
                <th className="p-3 border border-gray-300"> Phone</th>
                <th className="p-3 border border-gray-300"> Department</th>
                <th className="p-3 border border-gray-300"> Designation</th>
                <th className="p-3 border border-gray-300"> Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-100 transition">
                  <td className="p-3 border border-gray-300 text-center">{emp.name}</td>
                  <td className="p-3 border border-gray-300 text-center">{emp.email}</td>
                  <td className="p-3 border border-gray-300 text-center">{emp.phone}</td>
                  <td className="p-3 border border-gray-300 text-center">{emp.department}</td>
                  <td className="p-3 border border-gray-300 text-center">{emp.designation}</td>
                  <td className="p-3 border border-gray-300 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg shadow-md transition"
                        onClick={() => handleEdit(emp)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg shadow-md transition"
                        onClick={() => deleteEmployee(emp.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
