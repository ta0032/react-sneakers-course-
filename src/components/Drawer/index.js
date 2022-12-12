import React from "react";
import axios from "axios";

import Info from "../info";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onRemove, items = [], opened }) {
  const { cartItems, setCartItems, setCartOpened, totalPrice } = useCart();
  const [orderCompleted, setOrderCompleted] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoadOrder, setIsLoadOrder] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoadOrder(true);
      const { data } = await axios.post(
        "https://638f2c579cbdb0dbe31f1e52.mockapi.io/orders",
        { items: cartItems }
      );
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://638f2c579cbdb0dbe31f1e52.mockapi.io/cart/" + item.id
        );
        await delay(2000);
      }
      setOrderCompleted(true);
      setOrderId(data.id);
      setCartItems([]);
    } catch (error) {
      alert("Ошибка при создании заказа :(");
    }
    setIsLoadOrder(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={() => setCartOpened(false)}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    className="removeBtn"
                    onClick={() => {
                      onRemove(obj.id);
                    }}
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice * 0.05).toFixed(2)} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoadOrder}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={orderCompleted ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              orderCompleted
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              orderCompleted
                ? "./img/complete-order.jpg"
                : "./img/empty-cart.jpg"
            }
          ></Info>
        )}
      </div>
    </div>
  );
}

export default Drawer;
