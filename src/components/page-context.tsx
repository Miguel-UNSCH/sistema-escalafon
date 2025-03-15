"use client";

import { Boxes } from "lucide-react";

import { Session } from "next-auth";
import TextAnimate from "./ui/text-animate";
import { admin_routes } from "@/utils/other";
import { CardField } from "./custom-fields/card-field";

export interface PageContent {
  title: string;
  description: string;
  sections: {
    title: string;
    description: string;
    cards: {
      title: string;
      description: string;
      path: string;
    }[];
  }[];
}

export const PageContent = ({ content, session, color }: { content: PageContent; session: Session; color: string }) => {
  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <h2 className={`font-primary font-black text-${color} text-3xl tracking-tigh capitalize`}>
        <TextAnimate textList={[content.title]} />
      </h2>
      <p className="font-text">{content.description}</p>

      <div className="flex flex-col gap-8">
        {content.sections.map((section, index) => {
          const isAdminOnly = admin_routes.some((route) => section.cards.some((card) => card.path.startsWith(route)));
          if (isAdminOnly && session.user.role !== "admin") return null;

          return (
            <div key={index} className="flex flex-col gap-4 pb-2">
              <h3 className="flex flex-row items-center gap-2 font-primary font-bold text-xl capitalize text-nowrap">
                <Boxes size={20} />
                {section.title}
              </h3>
              <p className="px-2 font-text text-subtext0 text-sm">{section.description}</p>

              <div className="gap-4 grid grid-cols-3">
                {section.cards.map((card, cardIndex) => {
                  const isCardAdminOnly = admin_routes.some((route) => card.path.startsWith(route));
                  if (isCardAdminOnly && session.user.role !== "admin") return null;

                  return <CardField key={cardIndex} title={card.title} description={card.description} path={card.path} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
