import React from "react";
import { Boxes } from "lucide-react";

export interface PageContent {
  title: string;
  description: string;
  sections: {
    title: string;
    description: string;
    cards: {
      title: string;
      description: string;
    }[];
  }[];
}

const Card = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col gap-2 bg-mantle p-4 border-2 border-surface0 rounded-lg text-red hover:text-text cursor-grab">
    <p className="font-special font-bold capitalize">{title}</p>
    <p className="text-subtext0 text-sm">{description}</p>
  </div>
);

export const ContentPage = ({ content }: { content: PageContent }) => {
  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <h2 className="font-primary font-black text-peach text-3xl tracking-tight">{content.title}</h2>
      <p className="font-text">{content.description}</p>

      <div className="flex flex-col gap-5 py-4">
        {content.sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-2 pb-2">
            <h3 className="flex flex-row items-center gap-2 font-primary font-bold text-xl text-nowrap">
              <Boxes size={20} />
              {section.title}
            </h3>
            <p className="capitalize">{section.description}</p>

            <div className="gap-4 grid grid-cols-3">
              {section.cards.map((card, cardIndex) => (
                <Card key={cardIndex} title={card.title} description={card.description} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
