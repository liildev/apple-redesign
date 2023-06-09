import Image from "next/image";
import { urlFor } from "../sanity";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { addToBasket } from "../store/features/basketSlice";
import toast from "react-hot-toast";

interface Props {
  product: Product;
}

export default function Product({ product }: Props) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket(product));

    toast.success(`${product.title} added to basket`, {
      position: "bottom-center",
    });
  };

  return (
    <div className="flex h-fit w-[280px] select-none flex-col space-y-3 rounded-xl bg-[#35383C] p-6 ss:w-[320px] md:h-[500px] md:w-[400px] md:p-12">
      <div className="relative h-64 w-full md:h-72">
        <Image
          src={urlFor(product.image[0]).url()}
          className="customImage"
          fill
          alt={product.title}
        />
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div className="text-md space-y-2 text-white ss:text-xl md:text-2xl">
          <p>{product.title}</p>
          <p>{`From ${product.price}$`}</p>
        </div>

        <div
          className="flex h-14 w-14 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 ss:h-16 ss:w-16 md:h-[70px] md:w-[70px]"
          onClick={addItemToBasket}
        >
          <ShoppingCartIcon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );
}
