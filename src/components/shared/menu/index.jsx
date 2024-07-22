import Items from "./items";

export default function Menu({ index, item, decreaseQuantity, increaseQuantity, addToCart, cartItems }) {
    return (
        <div key={index} className="flex items-center justify-center  gap-6 flex-wrap h-full">
            {item.items.map((product, index) => {
                const cartItem = cartItems.find(item => item.product.id === product.id);
                return (
                    <Items key={index} cartItem={cartItem} index={index} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} addToCart={addToCart} product={product} />
                )
            })}
        </div>
    )
}