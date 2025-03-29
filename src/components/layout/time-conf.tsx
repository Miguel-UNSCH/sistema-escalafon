"use client";

import React, { useEffect, useState } from "react";
import { Clock4 } from "lucide-react";
import { limitTime } from "@/actions/limit-time";
import toast from "react-hot-toast";

export const TimeConf = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const res = await limitTime();
        if (res.success && res.data) {
          const endTime = new Date(res.data).getTime();
          const now = new Date().getTime();
          const remaining = endTime - now;

          if (remaining <= 0) {
            setIsExpired(true);
            toast.error("El tiempo límite ha expirado");
            // window.location.href = "/";
          } else {
            setTimeLeft(remaining);

            const interval = setInterval(() => {
              setTimeLeft((prev) => {
                if (prev <= 1000) {
                  clearInterval(interval);
                  setIsExpired(true);
                  window.location.reload();
                  return 0;
                }
                return prev - 1000;
              });
            }, 1000);

            return () => clearInterval(interval);
          }
        } else {
          toast.error(res?.message || "Error al obtener el tiempo límite");
        }
      } catch {
        toast.error("Error al obtener el tiempo límite");
      }
    };

    fetchTime();
  }, []);

  return (
    <div
      className={`flex flex-row items-center gap-2 hover:py-2 hover:border-b-4 font-code font-bold text-subtext0 text-lg ${
        isExpired ? "border-red text-red" : "border-green text-green"
      }`}
    >
      <Clock4 size={28} className={`${isExpired ? "text-red" : "text-green"}`} />
      {isExpired ? (
        <span className="text-red">Se acabo el tiempo para actualizar datos.</span>
      ) : (
        <p className="text-green">Aun quedan {formatTime(timeLeft)} para actualizar datos.</p>
      )}
    </div>
  );
};
