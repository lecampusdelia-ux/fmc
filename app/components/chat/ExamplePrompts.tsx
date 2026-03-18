import React from 'react';

const EXAMPLE_PROMPTS = [
  { text: 'Créer un site pour la présidence du Burkina en react' },
  { text: 'Créer un jeu TIC TAC TOE avec option de score, relance, réinitialiser, jouer avec un ami ou la machine...' },
  { text: 'Créer un site portfolio moderne en react et tailwind css pour développeur avec section projets, contact, CV téléchargeable et design élégant responsive.' },
  { text: 'Créer une application mobile de calcul d\'IMC' },
  { text: 'Concevoir une application de gestion de tâches avec authentification et design moderne' },
  { text: 'Développer une landing page animée et responsive pour le lancement d\'un nouveau produit technologique' },
];

export function ExamplePrompts(sendMessage?: { (event: React.UIEvent, messageInput?: string): void | undefined }) {
  return (
    <div id="examples" className="relative flex flex-col gap-9 w-full max-w-3xl mx-auto flex justify-center mt-6">
      <div
        className="flex flex-wrap justify-center gap-2"
        style={{
          animation: '.25s ease-out 0s 1 _fade-and-move-in_g2ptj_1 forwards',
        }}
      >
        {EXAMPLE_PROMPTS.map((examplePrompt, index: number) => {
          return (
            <button
              key={index}
              onClick={(event) => {
                sendMessage?.(event, examplePrompt.text);
              }}
              className="border border-fmc-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 text-fmc-elements-textSecondary hover:text-fmc-elements-textPrimary px-3 py-1 text-xs transition-theme"
            >
              {examplePrompt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
