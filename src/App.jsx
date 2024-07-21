import { useState } from "react";
import { menu_items } from "./utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
      <header>
        <nav className="block w-full max-w-screen-xl px-4 py-2 mx-auto text-white bg-white border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
          <div className="container flex items-center justify-between mx-auto ">
            <span className="mr-4 block cursor-pointer py-1.5 font-bold text-lg  leading-relaxed text-black antialiased">
              Arabacılar Pansiyon
            </span>
            <Button onClick={() => setOpen(true)} className="relative">
              Sepet
              {
                cartItems.length > 0 &&
                <div className="absolute -top-1 -right-1 bg-blue-400 h-4 w-4 rounded-full text-xs flex items-center justify-center text-center">
                  {cartItems.length}
                </div>

              }
            </Button>
          </div>
        </nav>

      </header>
      <main className="block w-full max-w-screen-xl px-4 py-2 mx-auto text-black mt-10  lg:px-8 lg:py-4 ">


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
              menu_items.filter(e => e.category === tabs).map((item, index) => (
                <div key={index} className="flex items-center justify-center  gap-6 flex-wrap h-full">

                  {item.items.map((product, index) => {
                    const cartItem = cartItems.find(item => item.product.id === product.id);
                    return (
                      <div className="max-w-[150px] md:min-w-[120px] w-full h-[240px] text-black rounded-lg   flex flex-col items-center justify-center relative text-start" key={index}>
                        <div className="flex flex-col items-center text-center ">
                          <img src={product.img} alt={product.name} className="w-[100px] border-[#3F5969]/20 border-[1px] p-1 rounded-xl flex items-center justify-center" />
                          <span className="font-semibold text-lg text-[#3F5969]">
                            {product.price} ₺
                          </span>
                          <span className="font-light  text-base text-slate-900  mb-3 text-balance   ">
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
        {
          !isDesktop ?

            <Dialog open={open} onOpenChange={setOpen}>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Sepet</DialogTitle>
                  <hr />
                  <div className="py-6 flex flex-col">
                    {cartItems.length == 0 ?
                      <span className="text-black">Sepetiniz boş</span>
                      :
                      cartItems.map(item => (
                        <div className="flex items-center justify-between">
                          {item.product.name}
                          <span className="font-semibold"> {item.quantity} adet</span>
                        </div>
                      ))
                    }
                  </div>
                  <hr />
                  <div className="flex items-center justify-between ">
                    Total: <span className="text-lg  font-semibold">{cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)} ₺</span>
                  </div>
                </DialogHeader>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button onClick={placeOrder}>Sipariş ver</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DialogContent>
            </Dialog>
            :
            <Drawer open={open} onOpenChange={setOpen}>

              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Sepet</DrawerTitle>
                  <hr />
                  <div className="py-6 flex flex-col">
                    {cartItems.length == 0 ?
                      <span className="text-black">Sepetiniz boş</span>
                      :
                      cartItems.map(item => (
                        <div className="flex items-center justify-between">
                          {item.product.name}
                          <span className="font-semibold"> {item.quantity} adet</span>
                        </div>
                      ))
                    }
                  </div>
                  <hr />
                  <div className="flex items-center justify-between ">
                    Total: <span className="text-lg  font-semibold">{cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)} ₺</span>
                  </div>
                </DrawerHeader>

                <DrawerFooter className="pt-2">
                  <DrawerClose asChild>
                    <Button onClick={placeOrder}>Sipariş ver</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

        }
        <section>
        </section>
      </main>
    </>
  )
}