import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

const PlanCard = ({ plan, isMonthly }) => {
  const { type, isPremium, monthlyPrice, yearlyPrice, offers } = plan;
  // console.log(offers);
  const newOffers = isMonthly
    ? offers.filter((offer) => offer.isMonthly === true)
    : offers.filter((offer) => offer.isMonthly === false);
  // if (isMonthly) {
  //   offers = offers.filter((offer) => offer.isMonthly === true);
  // } else {
  //   offers = offers.filter((offer) => offer.isMonthly === false);
  // }
  return (
    <div
      className={`card p-5 border border-green-400 rounded ${
        isPremium && "bg-green-400"
      }`}
    >
      <div className="badges mb-5">
        <small
          className={`px-2 py-0.5 rounded text-white w-min  bg-slate-500 dark:bg-slate-300 dark:text-black`}
        >
          {type}
        </small>
        {isPremium && (
          <p
            className={`uppercase text-sm w-min  text-black px-2 py-1 mt-3 rounded  ${
              isPremium && "bg-yellow-400"
            }`}
          >
            Premium
          </p>
        )}
      </div>
      <div className="price border-t border-b dark:border-slate-500 mb-3 py-4 text-center">
        <h2 className="text-4xl">${isMonthly ? monthlyPrice : yearlyPrice}</h2>
        <small>Per member, {isMonthly ? "per Month" : "per Year"}</small>
      </div>
      <ul className="flex flex-col gap-1.5">
        {newOffers.map((offer) => (
          <li
            key={offer.id}
            className="flex flex-wrap gap-2 items-center text-sm"
          >
            {offer.isActive ? (
              <FaCheckCircle className="w-4" />
            ) : (
              <IoMdCloseCircle className="w-4 text-red-500" />
            )}
            {offer.title}
            {offer.isComing && (
              <small className="px-2 py-0.5 bg-green-100 text-slate-700 rounded whitespace-nowrap">
                Coming Soon
              </small>
            )}
          </li>
        ))}
      </ul>
      <div className="btn-box mt-5 mb-3">
        <button
          className={`px-3 py-1  w-full text-white rounded-sm transition-all ${
            isPremium
              ? "bg-yellow-400 text-black"
              : "bg-green-400 hover:bg-yellow-400 hover:text-black"
          }`}
        >
          Start free 14-day Trial
        </button>
      </div>
      <div className="text-center">
        <small className="font-light">No credit card required</small>
      </div>
    </div>
  );
};

export default PlanCard;
