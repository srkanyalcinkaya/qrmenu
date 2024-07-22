import { Button } from "@/components/ui/button";

export default function Items({ product, decreaseQuantity, increaseQuantity, addToCart, cartItem, index}) {
    return (
        <div className="max-w-[150px] md:min-w-[120px] w-full h-[220px] text-black rounded-lg   flex flex-col items-center justify-center relative text-start" key={index}>
            <div className="flex flex-col items-center text-center justify-between h-full  ">
                <div className="flex flex-col items-center text-center">
                    <img src={product.img} alt={product.name} className="w-[100px] border-[#3F5969]/20 border-[1px] p-1 rounded-xl flex items-center justify-center" />
                    <span className="font-semibold text-lg text-[#3F5969]">
                        {product.price} ₺
                    </span>
                    <span className="font-light  text-sm text-slate-900  mb-3 text-balance   ">
                        {product.name}
                    </span>
                </div>
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
}