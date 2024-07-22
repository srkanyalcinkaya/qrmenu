import logo from "@/assets/images/logo.png"
import { Button } from "@/components/ui/button"
export default function Header({cartItems, setOpen}) {
    return (
        <header className="fixed top-0 inset-0  z-10 h-20 pt-1">
            <nav className="block w-full max-w-screen-xl  py-2 mx-auto text-white bg-white border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
                <div className="container flex items-center justify-between mx-auto ">
                    <div className="flex items-center gap-2 ml-1">
                        <img src={logo} className="w-12" />
                        <span className="block cursor-pointer py-1.5 font-bold md:text-lg  leading-relaxed text-black antialiased">
                            Arabacılar Pansiyon
                        </span>
                    </div>
                    <Button onClick={() => setOpen(true)} className="relative">
                        Sepet
                        {
                            cartItems.length > 0 &&
                            <div className="absolute -top-2 -right-2 bg-blue-400 h-5 w-5 rounded-full text-xs flex items-center justify-center text-center">
                                {cartItems.length}
                            </div>

                        }
                    </Button>
                </div>
            </nav>
        </header>
    )
}