/* eslint-disable @next/next/no-img-element */

import Stars from "./Stars";
import type { ProductBoxProps } from "./ProductPage";

export default function ProductBox(props: ProductBoxProps) {
  const globalRaiting = props.globalRaiting.toLocaleString();
  const ratingCount = props.ratingCount.toLocaleString();
  return (
    <div className="mt-[40px]  mb-[60px] text-white">
      <div className="m-auto flex w-[95vw] border-b-2 pb-[2vh] ">
        <div className=" flex w-[65vw] ">
          <div className="h-[7vh] w-[9vw]">
            <img className="h-[7vw] w-[9vw]" src={props.img} alt="image" />
          </div>
          <div className="pt-3] ml-[1vw] w-[80vw] ">
            <h2 className="mb-2 text-[18px] font-bold line-clamp-2  ">
              {" "}
              {props.title}{" "}
            </h2>
            <p className="text-neutral-400"> ASIN {props.asin} </p>
            <p className="text-neutral-400">
              {" "}
              available on {props.firstavailable}{" "}
            </p>
            <a
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-neutral-400 underline"
            >
              view Product info
            </a>
          </div>

          <div className=" ml-[2vw] w-[1vw] border-l-4" />
        </div>

        <div className="m-auto block">
          <div className="">
            <div className="">
              <h2 className="  text-[17px] font-bold"> Customer Rating </h2>
              <div className="  pt-[12px] ">
                <Stars
                  rating={props.customerRating}
                  outOf={5}
                  totalReviews={28}
                  large={true}
                />
              </div>
              <p className="mt-[10px] text-center text-[12px] text-white">
                {" "}
                {ratingCount} rating{" "}
              </p>
              <p className="text-center text-[12px] text-white">
                {" "}
                {globalRaiting} reviews{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
