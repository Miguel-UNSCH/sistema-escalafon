import React from "react";

function page() {
  return (
    <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="p-4 bg-bg-card rounded-md h-96 border border-border-primary">
          Item {i + 1}
        </div>
      ))}
    </div>
  );
}

export default page;
