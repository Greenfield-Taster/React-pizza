import React from "react";

function Categories() {

const [activeIndex, setActiveIndex] = React.useState(0);

const categories = [
  'All',
  'Meat',
  'Vegeterian',
  'Grill',
  'Spicy',
  'Closed'
]

// axios.get("https://my-json-server.typicode.com/Greenfield-Taster/PizzasJSON")
// .then(response =>{
//   console.log(response);
// });

const onClickCategory =(index) =>{
  setActiveIndex(index );
};

    return (
      <div className="categories">
        <ul>
     {
      categories.map((value,index) => (
        <li key={index} onClick={() => onClickCategory(index)} className={activeIndex === index ? 'active' : ''}>
          {value}
        </li>
      ))
     }
        </ul>
      </div>
    );
  }

  export default Categories; 