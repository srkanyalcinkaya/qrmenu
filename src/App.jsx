import { useState } from "react";
import { menu_items } from "./utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import Header from "./components/shared/header";
import Footer from "./components/shared/footer";
import Categories from "./components/shared/categories";
import Menu from "./components/shared/menu";
import Modal from "./components/shared/modal";

export default function App() {
  const isDesktop = useMediaQuery("only screen and (max-width : 768px)");
  const [open, setOpen] = useState(false)
  const [tabs, setTabs] = useState("mesrubat")

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(item => item.product.id === product.id);
      if (existingItemIndex >= 0) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        return updatedCartItems;
      } else {
        return [...prevCartItems, { product, quantity: 1 }]; // Miktar 1 olarak başlıyor
      }
    });
  };

  const increaseQuantity = (product) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (product) => {
    setCartItems(prevCartItems => {
      const updatedCartItems = prevCartItems
        .map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0);
      return updatedCartItems;
    });
  };

  const placeOrder = () => {
    const orderDetails = cartItems.map(item => `${item.product.name} - ${item.quantity} adet`).join('\n');
    const whatsappMessage = `Sipariş Detayları:
------------------
${orderDetails} 
------------------
Total:${cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)} ₺
------------------
Oda NO:`;
    const phoneNumber = '+905331625539';
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsappMessage)}`);
    setCartItems([])
  };

  return (
    <>
      <Header setOpen={setOpen} cartItems={cartItems} />
      <main className="block w-full max-w-screen-xl px-4 py-2 mx-auto text-black mt-24   lg:px-8 lg:py-4">
        <div>
          <Categories menu_items={menu_items} setTabs={setTabs} tabs={tabs} />
          <div className="mt-6">
            {
              menu_items.filter(e => e.category === tabs).map((item, index) => (
                <Menu
                  key={index}
                  index={index}
                  item={item}
                  cartItems={cartItems}
                  decreaseQuantity={decreaseQuantity}
                  increaseQuantity={increaseQuantity}
                  addToCart={addToCart}
                />
              ))
            }
          </div>
        </div>
        <Modal
          open={open}
          setOpen={setOpen}
          isDesktop={isDesktop}
          cartItems={cartItems}
          placeOrder={placeOrder}
        />
      </main>
      <Footer />
    </>
  )
}