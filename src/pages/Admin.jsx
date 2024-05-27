import axios from "axios";
import React, { useState, useEffect } from "react";

function Admin() {
  const [pizzas, setPizzas] = useState([]);
  const [showText, setShowText] = useState(false); //Add info box which explains [0,1] pizza`s type

  useEffect(() => {
    axios
      .get("https://pizzas-backend.azurewebsites.net/pizzas")
      .then((response) => {
        setPizzas(response.data);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://pizzas-backend.azurewebsites.net/pizzas/${id}`)
      .then(() => {
        setPizzas(pizzas.filter((pizza) => pizza._id !== id));
      });
  };

  const handleEdit = (id) => {
    console.log(`Edit pizza with id: ${id}`);
  };

  return (
    <div className="container">
      <div className="adminTable">
        <table>
          <thead>
            <tr>
              <th className="imageUrlmain">imageUrl</th>
              <th>Title</th>
              <th>Types❗</th>
              <th>Sizes</th>
              <th>Price</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pizzas.map((pizza) => (
              <tr key={pizza._id}>
                <td className="imageUrl">
                  <div className="scrollable">{pizza.imageUrl}</div>
                </td>
                <td>{pizza.title}</td>
                <td>
                  <ul>
                    {pizza.types.map((type, index) => (
                      <li key={index}>{type}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {pizza.sizes.map((size, index) => (
                      <li key={index}>{size}</li>
                    ))}
                  </ul>
                </td>
                <td>{pizza.price}</td>
                <td>{pizza.category}</td>
                <td>{pizza.rating}</td>
                <td>
                  <button onClick={() => handleEdit(pizza._id)}>Edit</button>
                  <button onClick={() => handleDelete(pizza._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
