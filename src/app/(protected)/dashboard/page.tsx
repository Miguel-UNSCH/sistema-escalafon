import React from "react";

function page() {
  return (
    <div className="space-y-10 p-2 h-full">
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-lg overflow-hidden">
        <h2 className="z-10 relative font-bold text-white text-lg">Explore Redesigned Able Pro</h2>
        <p className="z-10 relative text-white text-sm">
          The Brand new User Interface with power of Bootstrap Components. Explore the Endless possibilities with Able Pro.
        </p>
        <button className="z-10 relative mt-4 px-4 py-2 border border-white rounded-lg text-white">Exclusive on Themeforest</button>

        {/* Onda de fondo */}
        <div className="-top-20 -left-20 absolute bg-blue-500 opacity-30 blur-3xl rounded-full w-[300px] h-[300px]"></div>
        <div className="right-0 -bottom-20 absolute bg-blue-300 opacity-50 blur-3xl rounded-full w-[400px] h-[400px]"></div>
      </div>
    </div>
  );
}

export default page;
