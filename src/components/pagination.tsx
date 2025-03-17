"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <nav className="flex flex-wrap justify-between items-center p-4 border-mantle border-t-2">
      <span className="flex gap-2 text-subtext0 text-sm">
        Mostrando
        <span className="font-semibold text-subtext1">
          {currentPage}-{totalPages}
        </span>
        de <span className="font-semibold text-subtext1">{totalItems}</span>
      </span>
      {totalPages !== 1 && (
        <ul className="inline-flex -space-x-px h-8 text-sm">
          <li>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-3 h-8 flex items-center justify-center ${currentPage === 1 ? "cursor-not-allowed text-text" : "text-subtext0 bg-mantle hover:bg-crust"}`}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
          </li>

          <li>
            <button
              onClick={() => setCurrentPage(1)}
              className={`px-3 h-8 flex items-center justify-center ${currentPage === 1 ? "text-red bg-mantle" : "bg-base hover:bg-crust"}`}
            >
              1
            </button>
          </li>

          {currentPage > 2 && <li className="flex items-center px-2 h-8">...</li>}

          {currentPage > 1 && currentPage < totalPages && (
            <li>
              <button className="flex justify-center items-center bg-mantle px-3 h-8 text-red">{currentPage}</button>
            </li>
          )}

          {currentPage < totalPages - 1 && <li className="flex items-center px-2 h-8">...</li>}

          <li>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`px-3 h-8 flex items-center justify-center ${currentPage === totalPages ? "text-red bg-mantle" : "bg-base hover:bg-crust"}`}
            >
              {totalPages}
            </button>
          </li>

          <li>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={`px-3 h-8 flex items-center justify-center ${currentPage === totalPages ? "cursor-not-allowed text-text" : "text-subtext0 bg-mantle hover:bg-crust"}`}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};
