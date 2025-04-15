"use client";

import React, { useEffect, useState } from "react";
import { fn_fp_di, fn_fp_ip, FnFpDi, FnFpIp } from "@/actions/reports-action";
import { buildSections } from "./sections-template";

export const ContentData = ({ user_id }: { user_id: string }) => {
  const [fp_ip, setFp_ip] = useState<FnFpIp | null>(null);
  const [fp_di, setFp_di] = useState<FnFpDi | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const col_span: { [key: number]: string } = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const res = await fn_fp_ip(user_id);
      if (res.success && res.data) setFp_ip(res.data);

      const res2 = await fn_fp_di(user_id);
      if (res2.success && res2.data) setFp_di(res2.data);

      setIsLoading(false);
    };

    loadData();
  }, [user_id]);

  const sections = fp_ip ? buildSections(fp_ip, fp_di) : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="border-mantle border-b-2 rounded-full w-8 h-8 animate-spin" />
        <span className="ml-3 text-text text-sm">Cargando datos...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-4 w-full">
      {sections.map((section) => (
        <div key={section.section} className="flex flex-col gap-2 p-2 w-full text-xs sm:text-sm">
          <p className="mb-2 font-bold uppercase">{section.title}</p>
          <div className="grid grid-cols-12 border-2 border-surface0">
            {section.rows.map((row, rowIndex) => {
              const isFullRow = row.length === 1 && row[0].colSpan === 12;

              return (
                <React.Fragment key={rowIndex}>
                  {isFullRow ? (
                    <div key={row[0].key} className={`${col_span[row[0].colSpan]} p-2 border-2 border-surface0 font-text uppercase`}>
                      {row[0].value}
                    </div>
                  ) : (
                    <>
                      {row.some((cell) => cell.label) &&
                        row.map((cell) =>
                          cell.label ? (
                            <div key={`${cell.key}-label`} className={`${col_span[cell.colSpan]}  p-1 py-2 border-2 border-surface0 font-semibold text-text`}>
                              {cell.label}
                            </div>
                          ) : (
                            <div key={`${cell.key}-label-empty`} className={`${col_span[cell.colSpan]} `} />
                          )
                        )}

                      {row.map((cell) => (
                        <div key={`${cell.key}-value`} className={`${col_span[cell.colSpan]} p-2  border-2 border-surface0 border-t-0 font-text text-subtext0 text-xs uppercase`}>
                          {cell.value}
                        </div>
                      ))}
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
