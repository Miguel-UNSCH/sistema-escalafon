import React from "react";

function page() {
  return (
    <div className="h-full">
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-lg overflow-hidden">
        <h2 className="text-white text-lg font-bold relative z-10">Explore Redesigned Able Pro</h2>
        <p className="text-white text-sm relative z-10">
          The Brand new User Interface with power of Bootstrap Components. Explore the Endless possibilities with Able Pro.
        </p>
        <button className="mt-4 px-4 py-2 border border-white text-white rounded-lg relative z-10">Exclusive on Themeforest</button>

        {/* Onda de fondo */}
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-blue-500 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] bg-blue-300 opacity-50 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export default page;
