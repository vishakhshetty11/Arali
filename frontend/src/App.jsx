import React, { useState, useEffect  } from 'react';
import './App.css'
import Navbar from "./components/Navbar";
import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';
import API from './api';


function App() {
  const [customers, setCustomers] = useState([]);
  const fetchCustomers = async () => {
    const res = await API.get("/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/customers/${id}`);
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
