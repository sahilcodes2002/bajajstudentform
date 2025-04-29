// LoginPage.tsx
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://dynamic-form-generator-9rl7.onrender.com/create-user",
        {
          rollNumber,
          name,
        }
      );
      setLoading(false);
      navigate(`/form/${rollNumber}`);
    } catch (err) {
      setLoading(false);
      navigate(`/form/${rollNumber}`);
      setError("Already exists");
    } finally{
      setLoading(false);
    }
  };

  if(loading){
    return <div>
      <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
      </div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Student Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Roll Number
            </label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
          {/* <div className="w-full text-center text-xs mt-3 ">
           Already logged in?  <button className="text-green-600 underline" onClick={()=>{
            if(rollNumber == ""){
              navigate(`/form/RA2211032010010`);
            }
            navigate(`/form/${rollNumber}`);
           }} >Go to Form!</button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
