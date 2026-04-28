import { useState } from "react";
import API from "../api";
import Loader from "./Loader";

function CustomerForm({ onCustomerAdded }) {
    const [showLoader, setShowLoader] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [validation, setValidation] = useState({});
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone } = form;
        let errors = {};
        setValidation({});
        // Name validation
        if (!name) {
            errors.name = "Name is required";
        } else if (name.length < 3) {
            errors.name = "Name should contain at least 3 characters";
        }

        // Email validation
        if (!email) {
            errors.email = "Email is required";
        } else {
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {
                errors.email = "Invalid email format";
            }
        }
        const phoneRegex = /^[6-9]\d{9}$/;
        // Phone validation
        if (!phone) {
            errors.phone = "Phone is required";
        }
        else if (!phoneRegex.test(phone)) {
            errors.phone = "Phone must start with 6-9 and be 10 digits";
        } else if (phone.length !== 10) {
            errors.phone = "Phone must be exactly 10 digits";
        }
        // If errors exist → STOP API CALL
        if (Object.keys(errors).length > 0) {
            setValidation(errors);
            return;
        }

        setShowLoader(true);
        try {
            await API.post("/customers", form);
            await onCustomerAdded();
            setForm({ name: "", email: "", phone: "" });
        }
        catch (error) {
            console.log("Error", error)
        }
        finally {
            setShowLoader(false)
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            {showLoader && <Loader />}
            <h3>Add Customer</h3>
            <div>
                <label>Name :</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
                <p className="validation">{validation?.name}</p>
                <label>Email :</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                <p className="validation">{validation?.email}</p>
                <label>Phone No. :</label>
                <input name="phone" value={form.phone} onChange={handleChange}
                    onKeyPress={handleKeyPress} placeholder="Phone No." maxLength={10} />
                <p className="validation">{validation?.phone}</p>
            </div>
            <button type="submit">Add Customer</button>
        </form>
    );
}

export default CustomerForm;