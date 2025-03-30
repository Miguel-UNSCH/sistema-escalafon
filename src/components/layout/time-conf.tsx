"use client";

import React, { useEffect, useState } from "react";
import { Clock4 } from "lucide-react";
import { limitTime } from "@/actions/limit-time";
import toast from "react-hot-toast";
import { useEditTime } from "@/context/edit-time-context";

type TimerStatus = "notStarted" | "inProgress" | "expired";

export const TimeConf = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [status, setStatus] = useState<TimerStatus>("inProgress");
  const { version } = useEditTime();

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const fnTime = async () => {
    try {
      const res = await limitTime();
      if (res.success && res.data) {
        const { start, end } = res.data;
        const now = new Date().getTime();
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();

        if (now < startTime) {
          setStatus("notStarted");
          setTimeLeft(startTime - now);
        } else if (now >= startTime && now <= endTime) {
          setStatus("inProgress");
          setTimeLeft(endTime - now);
        } else {
          setStatus("expired");
          setTimeLeft(0);
          toast.error("Se culminó el tiempo para actualizar datos.");
        }

        if (now < endTime) {
          const interval = setInterval(() => {
            setTimeLeft((prev) => {
              if (prev <= 1000) {
                clearInterval(interval);
                setStatus("expired");
                toast.error("Se culminó el tiempo para actualizar datos.");
                return 0;
              }
              return prev - 1000;
            });
          }, 2000);
          return () => clearInterval(interval);
        }
      } else toast.error(res?.message || "Error al obtener el tiempo límite");
    } catch {
      toast.error("Error al obtener el tiempo límite");
    }
  };

  useEffect(() => {
    fnTime();
  }, [version]);

  const messages = {
    notStarted: () => `Faltan ${formatTime(timeLeft)} para iniciar la edición de datos.`,
    inProgress: () => `Aún quedan ${formatTime(timeLeft)} para actualizar datos.`,
    expired: () => "Se culminó el tiempo para actualizar datos.",
  };

  const getMessage = () => (messages[status] ? messages[status]() : "Estado desconocido");

  const colors = status === "expired" ? "text-red border-red" : status === "notStarted" ? "text-peach border-peach" : "text-green border-green";

  return (
    <div className={`flex flex-row items-center gap-2 hover:py-2 hover:border-b-4 font-code font-bold text-lg ${colors}`}>
      <Clock4 size={28} className={colors} />
      <span className={colors}>{getMessage()}</span>
    </div>
  );
};
