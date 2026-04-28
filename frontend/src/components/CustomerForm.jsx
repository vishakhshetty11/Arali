import { useState } from "react";
import axios from "axios";

function CustomerForm({ onCustomerAdded }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone } = form;

        if (!name || !email || !phone) {
            alert("All fields are required");
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            alert("Invalid email");
            return;
        }

        if (phone.length < 10) {
            alert("Phone must be 10 digits");
            return;
        }

        await axios.post("http://localhost:5000/customers", form);

        setForm({ name: "", email: "", phone: "" });
        onCustomerAdded();
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h3>Add Customer</h3>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
            <button type="submit">Add Customer</button>
        </form>
    );
}

export default CustomerForm;