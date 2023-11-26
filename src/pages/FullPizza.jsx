import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import PizzaBlock from "../components/PizzaBlock/index";
import { Link } from "react-router-dom";

const FullPizza = () => {
  const { pizzaId } = useParams();

  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://pizzas-backend.azurewebsites.net/pizzas/${pizzaId}`
        );
        setPizza(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching pizza:", error);
      }
    }

    fetchPizza();
  }, []);

  return (
    <div className="container">
      <div className="contant__items">
        {pizza ? (
          <div>
            <div>
              <Link to="/React-pizza/" className="button button--black">
                <span>Come back</span>
              </Link>
              <div className="modalPizza">
                <div className="modalPizzaImg">
                  <img src={pizza.imageUrl} alt="Pizza" />
                </div>
                <div className="modalPizzaText">
                  <h1>{pizza.title}</h1>
                  <h2>{pizza.price} ₴</h2>
                </div>
              </div>
            </div>
            {/* <PizzaBlock key={pizza._id} {...pizza} /> */}
          </div>
        ) : (
          <div className="cart cart--empty">
            <h2>
              Pizza with this ID not found <span>😕</span>
            </h2>

            <Link to="/React-pizza/" className="button button--black">
              <span>Come back</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
//   return (
//     <div className="container">
//       <div className="contant__items">
//         {pizza && <PizzaBlock key={pizza._id} {...pizza} />}
//       </div>
//     </div>
//   );
// };

export default FullPizza;
