export default function Categories({menu_items, setTabs, tabs}) {
    return (
        <div className="grid  grid-cols-2 md:grid-cols-4  gap-5">
            {
                menu_items.map((item, index) => (
                    <button key={index} onClick={() => setTabs(item.category)} className={`${item.category === tabs ? "text-white  bg-[#0F172A]" : "bg-white text-[#0F172A]"}    md:p-4 p-2 rounded  shadow-md flex items-center justify-center text-sm md:text-base`}>
                        {item.category_name}
                    </button>
                ))
            }
        </div>
    )
}