import React from "react";
import { historyData } from "./historyData";
import HistoryItem from "./historyItem/HistoryItem";

const History = () => {
  return (
    <section className="pb-20 dark:bg-slate-600 dark:text-slate-100">
      <div className="container mx-auto px-3">
        <h2 className="text-3xl sm:text-4xl font-medium text-center sm:text-start mb-8">
          History of the Home
        </h2>
        <div className="histories flex flex-col gap-4">
          {historyData.map((history) => (
            <HistoryItem key={history.id} history={history} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default History;
