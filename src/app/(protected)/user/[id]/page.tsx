"use server";

import { ContentData } from "./content-data";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      {id}
      <ContentData />
    </div>
  );
}
