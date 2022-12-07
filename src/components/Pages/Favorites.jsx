import Card from "../Card";

function Favorites({ items, onAddFavorites, onAddToCart }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки </h1>
      </div>
      <div className="d-flex flex-wrap">
        {items.map((item) => (
          <Card
            key={item.imageUrl}
            onFavorite={(obj) => onAddFavorites(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            favorited={true}
            {...item}
          />
        ))}{" "}
      </div>
    </div>
  );
}

export default Favorites;
