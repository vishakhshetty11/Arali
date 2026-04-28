import { useState, useEffect } from 'react';
import './App.css'
import Navbar from "./components/Navbar";
import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';
import API from './api';

function App() {
  const [showLoader, setShowLoader] = useState(false);
  const [customers, setCustomers] = useState([]);
  const fetchCustomers = async () => {
    const res = await API.get("/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    setShowLoader(true);
    try {
      await API.delete(`/customers/${id}`);
      await fetchCustomers();
    }
    catch (error) {
      console.log("Error", error)
    }
    finally {
      setShowLoader(false)
    }
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <CustomerForm onCustomerAdded={fetchCustomers} />
        <CustomerTable customers={customers} onDelete={handleDelete} showLoader={showLoader} />
      </div>
    </>
  )
}

export default App
