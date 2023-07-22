import { useContext, useState } from "react";
import { Context } from "../Components/Context.jsx";
import { products } from "../Products";
export default function () {
  const { carteItems, setcarteItems } = useContext(Context);

  const getCaseById = (array, id) => {
    return array.filter((arrycase) => {
      return arrycase.id == id;
    });
  };

  const prixTotal = () => {
    var prixtotal = 0;
    for (let item of carteItems) {
      let price = getCaseById(products, item.id)[0].pricePerKg;
      prixtotal += price * item.number;
    }
    return prixtotal;
  };

  const deleteItems = (id) => {
    let cartcopy = [...carteItems];
    cartcopy.map((item) => {
      if (item.id == id) return (item.number = parseFloat(0));
    });

    setcarteItems(cartcopy);
  };

  return (
    <div>
      {carteItems.map((item) => {
        return (
          <p>
            <pre>
              <img
                src={getCaseById(products, item.id)[0].image}
                width={250}
                height={200}
              />
              {getCaseById(products, item.id)[0].name}: {item.number}{" "}
              <button
                className="deleteItems"
                onClick={() => deleteItems(item.id)}
              >
                X
              </button>
            </pre>
          </p>
        );
      })}
      <p> Total Price: {prixTotal()}$</p>
    </div>
  );
}
