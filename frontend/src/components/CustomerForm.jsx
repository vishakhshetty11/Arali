import { useState } from "react";

function CustomerForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  return (
    <form>
      <input placeholder="Name" />
      <input placeholder="Email" />
      <input placeholder="Phone" />
      <button>Submit</button>
    </form>
  );
}

export default CustomerForm;