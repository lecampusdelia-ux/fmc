import type { Message } from 'ai';
import { toast } from 'react-toastify';
import { ImportFolderButton } from '~/components/chat/ImportFolderButton';
import { Button } from '~/components/ui/Button';
import { classNames } from '~/utils/classNames';

type ChatData = {
  messages?: Message[]; // Standard FMC format
  description?: string; // Optional description
};

export function ImportButtons(importChat: ((description: string, messages: Message[]) => Promise<void>) | undefined) {
  return (
    <div className="flex flex-col items-center justify-center w-auto">
      <input
        type="file"
        id="chat-import"
        className="hidden"
        accept=".json"
        onChange={async (e) => {
          const file = e.target.files?.[0];

          if (file && importChat) {
            try {
              const reader = new FileReader();

              reader.onload = async (e) => {
                try {
                  const content = e.target?.result as string;
                  const data = JSON.parse(content) as ChatData;

                  // Standard format
                  if (Array.isArray(data.messages)) {
                    await importChat(data.description || 'Discussion importée', data.messages);
                    toast.success('Discussion importée avec succès');

                    return;
                  }

                  toast.error('Format de fichier de discussion invalide');
                } catch (error: unknown) {
                  if (error instanceof Error) {
                    toast.error('Échec de l\'analyse du fichier : ' + error.message);
                  } else {
                    toast.error('Échec de l\'analyse du fichier');
                  }
                }
              };
              reader.onerror = () => toast.error('Échec de la lecture du fichier');
              reader.readAsText(file);
            } catch (error) {
              toast.error(error instanceof Error ? error.message : 'Échec de l\'importation de la discussion');
            }
            e.target.value = ''; // Reset file input
          } else {
            toast.error('Quelque chose s\'est mal passé');
          }
        }}
      />
      <div className="flex flex-col items-center gap-4 max-w-2xl text-center">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              const input = document.getElementById('chat-import');
              input?.click();
            }}
            variant="default"
            size="lg"
            className={classNames(
              'gap-2 bg-fmc-elements-background-depth-1',
              'text-fmc-elements-textPrimary',
              'hover:bg-fmc-elements-background-depth-2',
              'border border-fmc-elements-borderColor',
              'h-10 px-4 py-2 min-w-[120px] justify-center',
              'transition-all duration-200 ease-in-out',
            )}
          >
            <span className="i-ph:upload-simple w-4 h-4" />
            Importer une discussion
          </Button>
          <ImportFolderButton
            importChat={importChat}
            className={classNames(
              'gap-2 bg-fmc-elements-background-depth-1',
              'text-fmc-elements-textPrimary',
              'hover:bg-fmc-elements-background-depth-2',
              'border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]',
              'h-10 px-4 py-2 min-w-[120px] justify-center',
              'transition-all duration-200 ease-in-out rounded-lg',
            )}
          />
        </div>
      </div>
    </div>
  );
}
