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

export default function Modal({ setOpen, isDesktop, open, cartItems, placeOrder }) {
    if (!isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sepet</DialogTitle>
                        <hr />
                        <div className="py-6 flex flex-col">
                            {cartItems.length == 0 ?
                                <span className="text-black">Sepetiniz boş</span>
                                :
                                cartItems.map((item) => (
                                    <div key={item.product.id} className="flex items-center justify-between">
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
        )
    }


    return (

        <Drawer open={open} onOpenChange={setOpen}>

            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Sepet</DrawerTitle>
                    <hr />
                    <div className="py-6 flex flex-col">
                        {cartItems.length == 0 ?
                            <span className="text-black">Sepetiniz boş</span>
                            :
                            cartItems.map((item) => (
                                <div key={item.product.id} className="flex items-center justify-between">
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
    )

}