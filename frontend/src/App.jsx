import React, { useState, useEffect  } from 'react';
import './App.css'
import axios from "axios";
import Navbar from "./components/Navbar";
import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';


function App() {
  const [customers, setCustomers] = useState([]);
  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:5000/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/customers/${id}`);
    fetchCustomers();
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <CustomerForm onCustomerAdded={fetchCustomers} />
        <CustomerTable customers={customers} onDelete={handleDelete} />
      </div>
    </>
  )
}

export default App
