import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '~/components/ui/Button';
import { ConfirmationDialog, SelectionDialog } from '~/components/ui/Dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '~/components/ui/Card';
import { motion } from 'framer-motion';
import { useDataOperations } from '~/lib/hooks/useDataOperations';
import { openDatabase } from '~/lib/persistence/db';
import { getAllChats, type Chat } from '~/lib/persistence/chats';
import { DataVisualization } from './DataVisualization';
import { classNames } from '~/utils/classNames';
import { toast } from 'react-toastify';

// Créez un hook personnalisé pour se connecter à la base de données fmcHistory
function useFmcHistoryDB() {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        setIsLoading(true);

        const database = await openDatabase();
        setDb(database || null);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error initializing database'));
        setIsLoading(false);
      }
    };

    initDB();

    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);

  return { db, isLoading, error };
}

// Extend the Chat interface to include the missing properties
interface ExtendedChat extends Chat {
  title?: string;
  updatedAt?: number;
}

// Helper function to create a chat label and description
function createChatItem(chat: Chat): ChatItem {
  return {
    id: chat.id,

    // Use description as title if available, or format a short ID
    label: (chat as ExtendedChat).title || chat.description || `Chat ${chat.id.slice(0, 8)}`,

    // Format the description with message count and timestamp
    description: `${chat.messages.length} messages - Dernière mise à jour : ${new Date((chat as ExtendedChat).updatedAt || Date.parse(chat.timestamp)).toLocaleString()}`,
  };
}

interface SettingsCategory {
  id: string;
  label: string;
  description: string;
}

interface ChatItem {
  id: string;
  label: string;
  description: string;
}

export function DataTab() {
  // Utilisez notre hook personnalisé pour la base de données fmcHistory
  const { db, isLoading: dbLoading } = useFmcHistoryDB();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const apiKeyFileInputRef = useRef<HTMLInputElement>(null);
  const chatFileInputRef = useRef<HTMLInputElement>(null);

  // State for confirmation dialogs
  const [showResetInlineConfirm, setShowResetInlineConfirm] = useState(false);
  const [showDeleteInlineConfirm, setShowDeleteInlineConfirm] = useState(false);
  const [showSettingsSelection, setShowSettingsSelection] = useState(false);
  const [showChatsSelection, setShowChatsSelection] = useState(false);

  // State for settings categories and available chats
  const [settingsCategories] = useState<SettingsCategory[]>([
    { id: 'core', label: 'Paramètres de base', description: 'Profil utilisateur et paramètres principaux' },
    { id: 'providers', label: 'Fournisseurs', description: 'Clés API et configurations des fournisseurs' },
    { id: 'features', label: 'Fonctionnalités', description: 'Indicateurs de fonctionnalités et paramètres' },
    { id: 'ui', label: 'UI', description: 'Configuration de l\'UI et préférences' },
    { id: 'connections', label: 'Connexions', description: 'Connexions aux services externes' },
    { id: 'debug', label: 'Débogage', description: 'Paramètres de débogage et journaux' },
    { id: 'updates', label: 'Mises à jour', description: 'Paramètres de mise à jour et notifications' },
  ]);

  const [availableChats, setAvailableChats] = useState<ExtendedChat[]>([]);
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);

  // Hook des opérations de données avec la base de données fmcHistory
  const {
    isExporting,
    isImporting,
    isResetting,
    isDownloadingTemplate,
    handleExportSettings,
    handleExportSelectedSettings,
    handleExportAllChats,
    handleExportSelectedChats,
    handleImportSettings,
    handleImportChats,
    handleResetSettings,
    handleResetChats,
    handleDownloadTemplate,
    handleImportAPIKeys,
  } = useDataOperations({
    customDb: db || undefined, // Pass the boltHistory database, converting null to undefined
    onReloadSettings: () => window.location.reload(),
    onReloadChats: () => {
      // Reload chats after reset
      if (db) {
        getAllChats(db).then((chats) => {
          // Cast to ExtendedChat to handle additional properties
          const extendedChats = chats as ExtendedChat[];
          setAvailableChats(extendedChats);
          setChatItems(extendedChats.map((chat) => createChatItem(chat)));
        });
      }
    },
    onResetSettings: () => setShowResetInlineConfirm(false),
    onResetChats: () => setShowDeleteInlineConfirm(false),
  });

  // Loading states for operations not provided by the hook
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImportingKeys, setIsImportingKeys] = useState(false);

  // Load available chats
  useEffect(() => {
    if (db) {
      console.log('Chargement des discussions depuis la base de données fmcHistory', {
        name: db.name,
        version: db.version,
        objectStoreNames: Array.from(db.objectStoreNames),
      });

      getAllChats(db)
        .then((chats) => {
          console.log('Found chats:', chats.length);

          // Cast to ExtendedChat to handle additional properties
          const extendedChats = chats as ExtendedChat[];
          setAvailableChats(extendedChats);

          // Create ChatItems for selection dialog
          setChatItems(extendedChats.map((chat) => createChatItem(chat)));
        })
        .catch((error) => {
          console.error('Error loading chats:', error);
          toast.error('Échec du chargement des discussions : ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
        });
    }
  }, [db]);

  // Handle file input changes
  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        handleImportSettings(file);
      }
    },
    [handleImportSettings],
  );

  const handleAPIKeyFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        setIsImportingKeys(true);
        handleImportAPIKeys(file).finally(() => setIsImportingKeys(false));
      }
    },
    [handleImportAPIKeys],
  );

  const handleChatFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        handleImportChats(file);
      }
    },
    [handleImportChats],
  );

  // Wrapper for reset chats to handle loading state
  const handleResetChatsWithState = useCallback(() => {
    setIsDeleting(true);
    handleResetChats().finally(() => setIsDeleting(false));
  }, [handleResetChats]);

  return (
    <div className="space-y-12">
      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileInputChange} className="hidden" />
      <input
        ref={apiKeyFileInputRef}
        type="file"
        accept=".json"
        onChange={handleAPIKeyFileInputChange}
        className="hidden"
      />
      <input
        ref={chatFileInputRef}
        type="file"
        accept=".json"
        onChange={handleChatFileInputChange}
        className="hidden"
      />

      {/* Reset Settings Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showResetInlineConfirm}
        onClose={() => setShowResetInlineConfirm(false)}
        title="Réinitialiser tous les paramètres ?"
        description="Cela réinitialisera tous vos paramètres à leurs valeurs par défaut. Cette action est irréversible."
        confirmLabel="Réinitialiser les paramètres"
        cancelLabel="Annuler"
        variant="destructive"
        isLoading={isResetting}
        onConfirm={handleResetSettings}
      />

      {/* Delete Chats Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteInlineConfirm}
        onClose={() => setShowDeleteInlineConfirm(false)}
        title="Supprimer toutes les discussions ?"
        description="Cela supprimera définitivement tout votre historique de discussion. Cette action est irréversible."
        confirmLabel="Tout supprimer"
        cancelLabel="Annuler"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={handleResetChatsWithState}
      />

      {/* Settings Selection Dialog */}
      <SelectionDialog
        isOpen={showSettingsSelection}
        onClose={() => setShowSettingsSelection(false)}
        title="Sélectionnez les paramètres à exporter"
        items={settingsCategories}
        onConfirm={(selectedIds) => {
          handleExportSelectedSettings(selectedIds);
          setShowSettingsSelection(false);
        }}
        confirmLabel="Exporter la sélection"
      />

      {/* Chats Selection Dialog */}
      <SelectionDialog
        isOpen={showChatsSelection}
        onClose={() => setShowChatsSelection(false)}
        title="Sélectionnez les discussions à exporter"
        items={chatItems}
        onConfirm={(selectedIds) => {
          handleExportSelectedChats(selectedIds);
          setShowChatsSelection(false);
        }}
        confirmLabel="Exporter la sélection"
      />

      {/* Chats Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-fmc-elements-textPrimary">Discussions</h2>
        {dbLoading ? (
          <div className="flex items-center justify-center p-4">
            <div className="i-ph-spinner-gap-bold animate-spin w-6 h-6 mr-2" />
            <span>Chargement de la base de données des discussions...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <motion.div className="text-accent-500 mr-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <div className="i-ph-download-duotone w-5 h-5" />
                  </motion.div>
                  <CardTitle className="text-lg group-hover:text-fmc-elements-item-contentAccent transition-colors">
                    Exporter toutes les discussions
                  </CardTitle>
                </div>
                <CardDescription>Exportez toutes vos discussions dans un fichier JSON.</CardDescription>
              </CardHeader>
              <CardFooter>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                  <Button
                    onClick={async () => {
                      try {
                        if (!db) {
                          toast.error('Base de données non disponible');
                          return;
                        }

                        console.log('Database information:', {
                          name: db.name,
                          version: db.version,
                          objectStoreNames: Array.from(db.objectStoreNames),
                        });

                        if (availableChats.length === 0) {
                          toast.warning('Aucune discussion disponible pour l\'exportation');
                          return;
                        }

                        await handleExportAllChats();
                      } catch (error) {
                        console.error('Error exporting chats:', error);
                        toast.error(
                          `Échec de l'exportation des discussions : ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
                        );
                      }
                    }}
                    disabled={isExporting || availableChats.length === 0}
                    variant="outline"
                    size="sm"
                    className={classNames(
                      'hover:text-fmc-elements-item-contentAccent hover:border-fmc-elements-item-backgroundAccent hover:bg-fmc-elements-item-backgroundAccent transition-colors w-full justify-center',
                      isExporting || availableChats.length === 0 ? 'cursor-not-allowed' : '',
                    )}
                  >
                    {isExporting ? (
                      <>
                        <div className="i-ph-spinner-gap-bold animate-spin w-4 h-4 mr-2" />
                        Exportation...
                      </>
                    ) : availableChats.length === 0 ? (
                      'Pas de discussions à exporter'
                    ) : (
                      'Tout exporter'
                    )}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <motion.div className="text-accent-500 mr-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <div className="i-ph:list-checks w-5 h-5" />
                  </motion.div>
                  <CardTitle className="text-lg group-hover:text-fmc-elements-item-contentAccent transition-colors">
                    Exporter les discussions sélectionnées
                  </CardTitle>
                </div>
                <CardDescription>Choisissez des discussions spécifiques à exporter.</CardDescription>
              </CardHeader>
              <CardFooter>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                  <Button
                    onClick={() => setShowChatsSelection(true)}
                    disabled={isExporting || chatItems.length === 0}
                    variant="outline"
                    size="sm"
                    className={classNames(
                      'hover:text-fmc-elements-item-contentAccent hover:border-fmc-elements-item-backgroundAccent hover:bg-fmc-elements-item-backgroundAccent transition-colors w-full justify-center',
                      isExporting || chatItems.length === 0 ? 'cursor-not-allowed' : '',
                    )}
                  >
                    {isExporting ? (
                      <>
                        <div className="i-ph-spinner-gap-bold animate-spin w-4 h-4 mr-2" />
                        Exportation...
                      </>
                    ) : (
                      'Sélectionner les discussions'
                    )}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <motion.div className="text-accent-500 mr-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <div className="i-ph-upload-duotone w-5 h-5" />
                  </motion.div>
                  <CardTitle className="text-lg group-hover:text-fmc-elements-item-contentAccent transition-colors">
                    Importer des discussions
                  </CardTitle>
                </div>
                <CardDescription>Importez des discussions depuis un fichier JSON.</CardDescription>
              </CardHeader>
              <CardFooter>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                  <Button
                    onClick={() => chatFileInputRef.current?.click()}
                    disabled={isImporting}
                    variant="outline"
                    size="sm"
                    className={classNames(
                      'hover:text-fmc-elements-item-contentAccent hover:border-fmc-elements-item-backgroundAccent hover:bg-fmc-elements-item-backgroundAccent transition-colors w-full justify-center',
                      isImporting ? 'cursor-not-allowed' : '',
                    )}
                  >
                    {isImporting ? (
                      <>
                        <div className="i-ph-spinner-gap-bold animate-spin w-4 h-4 mr-2" />
                        Importation...
                      </>
                    ) : (
                      'Importer des discussions'
                    )}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <motion.div
                    className="text-red-500 dark:text-red-400 mr-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="i-ph-trash-duotone w-5 h-5" />
                  </motion.div>
                  <CardTitle className="text-lg group-hover:text-fmc-elements-item-contentAccent transition-colors">
                    Supprimer toutes les discussions
                  </CardTitle>
                </div>
                <CardDescription>Supprimez tout votre historique de discussion.</CardDescription>
              </CardHeader>
              <CardFooter>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                  <Button
                    onClick={() => setShowDeleteInlineConfirm(true)}
                    disabled={isDeleting || chatItems.length === 0}
                    variant="outline"
                    size="sm"
                    className={classNames(
                      'hover:text-fmc-elements-item-contentAccent hover:border-fmc-elements-item-backgroundAccent hover:bg-fmc-elements-item-backgroundAccent transition-colors w-full justify-center',
                      isDeleting || chatItems.length === 0 ? 'cursor-not-allowed' : '',
                    )}
                  >
                    {isDeleting ? (
                      <>
                        <div className="i-ph-spinner-gap-bold animate-spin w-4 h-4 mr-2" />
                        Suppression...
                      </>
                    ) : (
                      'Tout supprimer'
                    )}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>

      {/* Settings Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-fmc-elements-textPrimary">Paramètres</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                <motion.div className="text-accent-500 mr-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <div className="i-ph-download-duotone w-5 h-5" />
                </motion.div>
                <CardTitle className="text-lg group-hover:text-fmc-elements-item-contentAccent transition-colors">
                  Exporter tous les paramètres
                </CardTitle>
              </div>
              <CardDescription>Exportez tous vos paramètres dans un fichier JSON.</CardDescription>
            </CardHeader>
            <CardFooter>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Button
                  onClick={handleExportSettings}
                  disabled={isExporting}
                  variant="outline"
                  size="sm"
                  className={classNames(
                    'hover:text-fmc-elements-item-contentAccent hover:border-fmc-elements-item-backgroundAccent hover:bg-fmc-elements-item-backgroundAccent transition-colors w-full justify-center',
                    isExporting ? 'cursor-not-allowed' : '',
                  )}
                >
                  {isExporting ? (
                    <>
                      <div className="i-ph-spinner-gap-bold animate-spin w-4 h-4 mr-2" />
                      Exportation...
                    </>
                  ) : (
                    'Tout exporter'
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                <motion.div className="text-accent-500 mr-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <div className="i-ph-filter-duotone w-5 h-5" />
                </motion.div>
                <CardTitle className="text-lg group-hover:text-fmc-elements-item-contentAccent transition-colors">
                  Exporter les paramètres sélectionnés
                </CardTitle>
              </div>
              <CardDescription>Choisissez des paramètres spécifiques à exporter.</CardDescription>
            </CardHeader>
            <CardFooter>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Button
                  onClick={() => setShowSettingsSelection(true)}
                  disabled={isExporting || settingsCategories.length === 0}
                  variant="outline"
                  size="sm"
                  className={classNames(
                    'hover:text-fmc-elements-item-contentAccent hover:border-fmc-elements-item-backgroundAccent hover:bg-fmc-elements-item-backgroundAccent transition-colors w-full justify-center',
                    isExporting || settingsCategories.length === 0 ? 'cursor-not-allowed' : '',
                  )}
                >
                  {isExporting ? (
                    <>
                      <div className="i-ph-spinner-gap-bold animate-spin w-4 h-4 mr-2" />
                      Exportation...
                    </>
                  ) : (
                    'Sélectionner les paramètres'
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                <motion.div className="text-accent-500 mr-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <div className="i-ph-upload-duotone w-5 h-5" />
                </motion.div>
                <CardTitle className="text-lg group-hover:text-fmc-elements-item-contentAccent transition-colors">
                  Importer les paramètres
                </CardTitle>
              </div>
              <CardDescription>Importez les paramètres depuis un fichier JSON.</CardDescription>
            </CardHeader>
            <CardFooter>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isImporting}
                  variant="outline"
                  size="sm"
                  className={classNames(
                    'hover:text-fmc-elements-item-contentAccent hover:border-fmc-elements-item-backgroundAccent hover:bg-fmc-elements-item-backgroundAccent transition-colors w-full justify-center',
                    isImporting ? 'cursor-not-allowed' : '',
                  )}
                >
                  {isImporting ? (
                    <>
                      <div className="i-ph-spinner-gap-bold animate-spin w-4 h-4 mr-2" />
                      Importation...
                    </>
                  ) : (
                    'Importer les paramètres'
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                <motion.div
                  className="text-red-500 dark:text-red-400 mr-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="i-ph-arrow-counter-clockwise-duotone w-5 h-5" />
                </motion.div>
                <CardTitle className="text-lg group-hover:text-fmc-elements-item-contentAccent transition-colors">
                  Réinitialiser tous les paramètres
                </CardTitle>
              </div>
              <CardDescription>Réinitialisez tous les paramètres à leurs valeurs par défaut.</CardDescription>
            </CardHeader>
            <CardFooter>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Button
                  onClick={() => setShowResetInlineConfirm(true)}
                  disabled={isResetting}
                  variant="outline"
                  size="sm"
                  className={classNames(
                    'hover:text-fmc-elements-item-contentAccent hover:border-fmc-elements-item-backgroundAccent hover:bg-fmc-elements-item-backgroundAccent transition-colors w-full justify-center',
                    isResetting ? 'cursor-not-allowed' : '',
                  )}
                >
                  {isResetting ? (
                    <>
                      <div className="i-ph-spinner-gap-bold animate-spin w-4 h-4 mr-2" />
                      Réinitialisation...
                    </>
                  ) : (
                    'Tout réinitialiser'
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* API Keys Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-fmc-elements-textPrimary">Clés API</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                <motion.div className="text-accent-500 mr-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <div className="i-ph-file-text-duotone w-5 h-5" />
                </motion.div>
                <CardTitle className="text-lg group-hover:text-fmc-elements-item-contentAccent transition-colors">
                  Télécharger le modèle
                </CardTitle>
              </div>
              <CardDescription>Téléchargez un fichier modèle pour vos clés API.</CardDescription>
            </CardHeader>
            <CardFooter>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Button
                  onClick={handleDownloadTemplate}
                  disabled={isDownloadingTemplate}
                  variant="outline"
                  size="sm"
                  className={classNames(
                    'hover:text-fmc-elements-item-contentAccent hover:border-fmc-elements-item-backgroundAccent hover:bg-fmc-elements-item-backgroundAccent transition-colors w-full justify-center',
                    isDownloadingTemplate ? 'cursor-not-allowed' : '',
                  )}
                >
                  {isDownloadingTemplate ? (
                    <>
                      <div className="i-ph-spinner-gap-bold animate-spin w-4 h-4 mr-2" />
                      Téléchargement...
                    </>
                  ) : (
                    'Télécharger'
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                <motion.div className="text-accent-500 mr-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <div className="i-ph-upload-duotone w-5 h-5" />
                </motion.div>
                <CardTitle className="text-lg group-hover:text-fmc-elements-item-contentAccent transition-colors">
                  Importer les clés API
                </CardTitle>
              </div>
              <CardDescription>Importez les clés API depuis un fichier JSON.</CardDescription>
            </CardHeader>
            <CardFooter>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Button
                  onClick={() => apiKeyFileInputRef.current?.click()}
                  disabled={isImportingKeys}
                  variant="outline"
                  size="sm"
                  className={classNames(
                    'hover:text-fmc-elements-item-contentAccent hover:border-fmc-elements-item-backgroundAccent hover:bg-fmc-elements-item-backgroundAccent transition-colors w-full justify-center',
                    isImportingKeys ? 'cursor-not-allowed' : '',
                  )}
                >
                  {isImportingKeys ? (
                    <>
                      <div className="i-ph-spinner-gap-bold animate-spin w-4 h-4 mr-2" />
                      Importation...
                    </>
                  ) : (
                    'Importer les clés'
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Data Visualization */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-fmc-elements-textPrimary">Utilisation des données</h2>
        <Card>
          <CardContent className="p-5">
            <DataVisualization chats={availableChats} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
