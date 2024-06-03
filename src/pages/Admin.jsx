import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import PizzaForm from "../components/PizzaForm";
import { setItems } from "../redux/slices/pizzaSlice";

function Admin() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.pizza.items);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPizza, setCurrentPizza] = useState(null);

  const defaultPizzaFormData = {
    title: "",
    price: 0,
    imageURL: "",
    rating: 0,
  };

  const fetchingPizza = async () => {
    const { data } = await axios.get(
      "https://pizzas-backend.azurewebsites.net/pizzas"
    );
    dispatch(setItems(data));
  };

  useEffect(() => {
    fetchingPizza();
  }, []);

  const handleDelete = (id) => {
    // const { data } = axios.delete(
    //   `https://pizzas-backend.azurewebsites.net/pizzas/${id}`
    // );
    // dispatch(setItems(data));
    console.log("delete: ", id);
  };

  const handleEdit = (pizza) => {
    setCurrentPizza(pizza);
    setIsFormVisible(true);
    console.log(`Edit pizza with id: ${pizza}`);
  };

  const handleFormSubmit = async (data) => {
    if (currentPizza) {
      console.log("edited pizza", data._id);
    } else {
      console.log("new pizza", data);
    }

    setIsFormVisible(false);
    setCurrentPizza(null);
    fetchingPizza();
  };

  const sorting = (sortingType) => {
    console.log(sortingType);
  };

  return (
    <div className="container">
      <div className="createPizzaWrapper">
        <div className="createNewPizza">
          {isFormVisible && (
            <PizzaForm
              onSubmit={handleFormSubmit}
              defaultValues={currentPizza || defaultPizzaFormData}
            />
          )}
        </div>
        {!isFormVisible ? (
          <div className="createPizzaButton">
            <button
              className="button button--delivery"
              onClick={() => {
                setCurrentPizza(null);
                setIsFormVisible(true);
              }}
            >
              Create pizza
            </button>
          </div>
        ) : (
          <div className="controlButtons">
            <button onClick={handleFormSubmit} className="button ">
              Save changes
            </button>
            <button
              onClick={() => {
                setIsFormVisible(false);
                setCurrentPizza(null);
              }}
              className="button button--black"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="adminTable">
        <table>
          <thead>
            <tr>
              <th className="imageUrlmain">imageUrl</th>
              <th onClick={() => sorting("title")}>Title*</th>
              <th>
                Types <a id="anchorElementTypes">❗</a>
                <Tooltip anchorSelect="#anchorElementTypes" place="top">
                  0-thin 1-traditional
                </Tooltip>
              </th>
              <th>Sizes</th>
              <th onClick={() => sorting("price")}>Price*</th>
              <th>Category</th>
              <th onClick={() => sorting("rating")}>Rating*</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((pizza) => (
              <tr key={pizza._id}>
                <td className="imageUrl">
                  <div>{pizza.imageUrl}</div>
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
                  <button onClick={() => handleEdit(pizza)}>Edit</button>
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
