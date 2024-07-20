import { useState } from "react";
import { menu_items } from "./utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function App() {
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
    console.log(whatsappMessage)
  };
  return (
    <>
      <header>
        <nav className="block w-full max-w-screen-xl px-4 py-2 mx-auto text-white bg-white border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
          <div className="container flex items-center justify-between mx-auto ">
            <span className="mr-4 block cursor-pointer py-1.5 font-bold text-lg    leading-relaxed text-black antialiased">
              Arabacılar Pansiyon
            </span>
            <h2 className="text-black">Total: {cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)} ₺</h2>
            <button className="text-black" onClick={placeOrder}>Sipariş Ver</button>
          </div>
        </nav>

      </header>
      <main className="block w-full max-w-screen-xl px-4 py-2 mx-auto text-black mt-10  lg:px-8 lg:py-4 ">
        {/* <section>
          <h2 className="text-2xl font-semibold my-4">
            Arabacılar Pansiyon Menü
          </h2>
          <div className="text-green-500 flex md:flex-row flex-col md:items-center items-start  md:gap-4 my-5 ">
            Sipariş için Whatsapp
            <div className="flex items-center  ">
              <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 39 39">
                <path fill="#00E676" d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z">
                </path>
                <path fill="#FFF" d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z">
                </path>
              </svg>
              <a href="https://wa.me/+905111111111?text=Merhaba">
                05111111111
              </a>

            </div>
          </div>
          {menu_items.map((item, index) => (
            <div key={index} className="mb-10">
              <h3 className="text-xl font-bold">
                {item.category}
              </h3>
              <hr className="my-2" />
              <div>
                <ul>
                  {item.items.map(i => (
                    <li className="flex items-center justify-between border-b-[1px] border-gray-400/50 py-2 last:border-0 ">
                      <p className="text-gray-800">
                        {i.name}
                      </p>
                      <span className="text-gray-600  ">
                        {i.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section> */}

        <div>
          <div className="grid grid-cols-3  gap-5">
            {
              menu_items.map((item, index) => (
                <button key={index} onClick={() => setTabs(item.category)} className={`${item.category === tabs ? "text-white  bg-[#0F172A]" : "bg-white text-[#0F172A]"}    md:p-4 p-2 rounded  shadow-md flex items-center justify-center text-sm md:text-base`}>
                  {item.category_name}
                </button>
              ))
            }
          </div>
          <div className="  mt-6">
            {
              menu_items.filter(e=> e.category === tabs).map((item, index) => (
                <div key={index} className="flex items-center justify-center  gap-6 flex-wrap h-full">

                  {item.items.map((product, index) => {
                    const cartItem = cartItems.find(item => item.product.id === product.id);
                    return (
                      <div className="min-w-[150px] md:min-w-[120px] h-[240px] text-black rounded-lg   flex flex-col items-center justify-center relative text-start" key={index}>
                        <div className="flex flex-col items-center text-start ">
                          <img src={product.img} alt={product.name} className="w-[100px] border-[#3F5969]/20 border-[1px] p-1 rounded-xl flex items-center justify-center" />
                          <span className="font-semibold text-lg text-[#3F5969]">
                            {product.price} ₺
                          </span>
                          <span className="font-light  text-base text-slate-900  mb-3">
                            {product.name}
                          </span>
                          {cartItem ?
                            <div className="flex items-center w-ful justify-between ">
                              <Button onClick={() => decreaseQuantity(product)} >-</Button>
                              <div className="bg-gray-100 shadow-md  w-16   h-full rounded-md flex items-center justify-center text-xl font-medium ">
                                {cartItem.quantity}
                              </div>
                              <Button onClick={() => increaseQuantity(product)} >+</Button>
                            </div>
                            :
                            <Button onClick={() => addToCart(product)} >Sepete Ekle</Button>
                          }

                        </div>

                      </div>
                    )
                  })}
                </div>
              ))
            }
          </div>
        </div>

        <section>
          {/* <Tabs defaultValue="account" className="w-full h-full">
            <TabsList className=" flex mb-10 ">
              {
                menu_items.map((item, index) => (
                  <TabsTrigger value={item.category} key={index}>{
                    item.category_name
                  }</TabsTrigger>
                ))
              }

            </TabsList>
            {
              menu_items.map((item, index) => (
                <TabsContent value={item.category} key={index} className="flex items-center justify-start  gap-6 flex-wrap h-full">

                  {item.items.map((product, index) => {
                    const cartItem = cartItems.find(item => item.product.id === product.id);
                    return (
                      <div className="min-w-[180px] h-[240px]    text-black rounded-lg p-4 flex flex-col items-center justify-center relative text-start" key={index}>
                        <div className="flex flex-col items-center text-start ">
                          <img src={product.img} alt={product.name} className="w-[120px] border-[#3F5969]/20 border-[1px] p-1 rounded-xl flex items-center justify-center" />
                          <span className="font-semibold text-lg text-[#3F5969]">
                            {product.price} ₺
                          </span>
                          <span className="font-light  text-base text-slate-900  mb-3">
                            {product.name}
                          </span>
                          {cartItem ?
                            <div className="flex items-center w-ful justify-between ">
                              <Button onClick={() => decreaseQuantity(product)} >-</Button>
                              <div className="bg-gray-100 shadow-md  w-20   h-full rounded-md flex items-center justify-center text-xl font-medium ">
                                {cartItem.quantity}
                              </div>
                              <Button onClick={() => increaseQuantity(product)} >+</Button>
                            </div>
                            :
                            <Button onClick={() => addToCart(product)} >Sepete Ekle</Button>
                          }

                        </div>

                      </div>
                    )
                  })}
                </TabsContent>
              ))
            }
          </Tabs> */}
        </section>
      </main>
      {/* <footer className="block w-full max-w-screen-xl px-4 py-4 mx-auto text-black mt-10 bg-white border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4 mb-4 ">
        Sipariş için Whatsapp
        <div className="flex items-center mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" width={39} height={39} viewBox="0 0 39 39">
            <path fill="#00E676" d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z">
            </path>
            <path fill="#FFF" d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z">
            </path>
          </svg>
          <a href="https://wa.me/+905111111111?text=Merhaba">
            05111111111
          </a>

        </div>
      </footer> */}
    </>
  )
}