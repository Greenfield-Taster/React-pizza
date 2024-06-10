import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import PizzaForm from "../components/PizzaForm/PizzaForm";
import { setItems } from "../redux/slices/pizzaSlice";
import Skeleton from "../components/PizzaForm/Skeleton";

function Admin() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.pizza.items);

  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPizza, setCurrentPizza] = useState(null);

  const defaultPizzaFormData = {
    title: "",
    price: "",
    imageUrl: "",
    rating: 0,
    sizes: [26, 30, 40],
    types: [0, 1],
    category: "",
  };

  const fetchingPizza = async () => {
    const { data } = await axios.get(
      "https://pizzas-backend.azurewebsites.net/pizzas"
    );
    dispatch(setItems(data));
    setIsLoading(false);
  };

  const editPizzaRequest = async (data) => {
    await axios
      .put(`https://pizzas-backend.azurewebsites.net/pizzas/${data._id}`, data)
      .then((response) => {
        fetchingPizza();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addPizzaRequest = async (data) => {
    await axios
      .post("https://pizzas-backend.azurewebsites.net/pizzas", data)
      .then((response) => {
        fetchingPizza();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchingPizza();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`https://pizzas-backend.azurewebsites.net/pizzas/${id}`)
      .then((response) => {
        fetchingPizza();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (pizza) => {
    setCurrentPizza(pizza);
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    if (currentPizza) {
      editPizzaRequest(data);
    } else {
      addPizzaRequest(data);
    }

    setIsFormVisible(false);
    setCurrentPizza(null);
    fetchingPizza();
  };

  const sorting = (sortingType) => {
    let sortedItems;

    if (sortingType === "title") {
      sortedItems = [...items].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortingType === "price") {
      sortedItems = [...items].sort((a, b) => a.price - b.price);
    }
    if (sortingType === "rating") {
      sortedItems = [...items].sort((a, b) => b.rating - a.rating);
    }
    dispatch(setItems(sortedItems));
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

      {isLoading ? (
        [...new Array(1)].map((_, index) => <Skeleton key={index} />)
      ) : (
        <div className="adminTable">
          <table>
            <thead>
              <tr>
                <th className="imageUrlmain">imageUrl</th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => sorting("title")}
                >
                  Title*
                </th>
                <th>
                  Types <a id="anchorElementTypes">❗</a>
                  <Tooltip anchorSelect="#anchorElementTypes" place="top">
                    0-thin 1-traditional
                  </Tooltip>
                </th>
                <th>Sizes</th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => sorting("price")}
                >
                  Price*
                </th>
                <th>Category</th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => sorting("rating")}
                >
                  Rating*
                </th>
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
      )}
    </div>
  );
}

export default Admin;
