"use client";

import React, { useTransition } from "react";
import { testLatexAction } from "@/actions/test-action";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [isPending, startTransition] = useTransition();

  const handleGeneratePDF = () => {
    startTransition(async () => {
      const result = await testLatexAction();
      // eslint-disable-next-line no-console
      console.log(result.message);
    });
  };

  return (
    <div className="p-10">
      <Button onClick={handleGeneratePDF} disabled={isPending}>
        {isPending ? "Generando PDF..." : "Generar PDF desde LaTeX"}
      </Button>
    </div>
  );
};

export default Page;
