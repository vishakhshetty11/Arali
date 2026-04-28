function CustomerTable({ customers, onDelete }){
const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      onDelete(id);
    }
  };

  return (
    <div className="customerTableDiv">
      <h3>Customer List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteClick(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;