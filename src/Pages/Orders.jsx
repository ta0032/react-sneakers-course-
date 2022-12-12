import React from "react";
import axios from "axios";
import Card from "../components/Card";
import AppContext from "../context";

function Orders() {
  const { onAddFavorites, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await axios.get(
          "https://638f2c579cbdb0dbe31f1e52.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказа :(");
        console.error(error);
      }
    }
    fetchOrders();
  }, []);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы </h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8).keys()] : orders).map((item, index) => (
          <Card key={index} {...item} loading={isLoading} />
        ))}{" "}
      </div>
    </div>
  );
}

export default Orders;
