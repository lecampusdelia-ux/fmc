import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '~/components/ui/Button';
import { classNames } from '~/utils/classNames';
import { useGitHubConnection } from '~/lib/hooks';

interface ConnectionTestResult {
  status: 'success' | 'error' | 'testing';
  message: string;
  timestamp?: number;
}

interface GitHubConnectionProps {
  connectionTest: ConnectionTestResult | null;
  onTestConnection: () => void;
}

export function GitHubConnection({ connectionTest, onTestConnection }: GitHubConnectionProps) {
  const { isConnected, isLoading, isConnecting, connect, disconnect, error } = useGitHubConnection();

  const [token, setToken] = React.useState('');
  const [tokenType, setTokenType] = React.useState<'classic' | 'fine-grained'>('classic');

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleConnect called with token:', token ? 'token provided' : 'no token', 'tokenType:', tokenType);

    if (!token.trim()) {
      console.log('No token provided, returning early');
      return;
    }

    try {
      console.log('Calling connect function...');
      await connect(token, tokenType);
      console.log('Connect function completed successfully');
      setToken(''); // Clear token on successful connection
    } catch (error) {
      console.log('Connect function failed:', error);

      // Error handling is done in the hook
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <div className="i-ph:spinner-gap-bold animate-spin w-4 h-4" />
          <span className="text-fmc-elements-textSecondary">Chargement de la connexion...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-fmc-elements-background dark:bg-fmc-elements-background border border-fmc-elements-borderColor dark:border-fmc-elements-borderColor rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="p-6 space-y-6">
        {!isConnected && (
          <div className="text-xs text-fmc-elements-textSecondary bg-fmc-elements-background-depth-1 dark:bg-fmc-elements-background-depth-1 p-3 rounded-lg mb-4">
            <p className="flex items-center gap-1 mb-1">
              <span className="i-ph:lightbulb w-3.5 h-3.5 text-fmc-elements-icon-success dark:text-fmc-elements-icon-success" />
              <span className="font-medium">Astuce :</span> Vous pouvez également définir la{' '}
              <code className="px-1 py-0.5 bg-fmc-elements-background-depth-2 dark:bg-fmc-elements-background-depth-2 rounded">
                VITE_GITHUB_ACCESS_TOKEN
              </code>{' '}
              variable d'environnement pour vous connecter automatiquement.
            </p>
            <p>
              Pour les jetons à granularité fine, définissez également{' '}
              <code className="px-1 py-0.5 bg-fmc-elements-background-depth-2 dark:bg-fmc-elements-background-depth-2 rounded">
                VITE_GITHUB_TOKEN_TYPE=fine-grained
              </code>
            </p>
          </div>
        )}

        <form onSubmit={handleConnect} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-fmc-elements-textSecondary dark:text-fmc-elements-textSecondary mb-2">
                Type de jeton
              </label>
              <select
                value={tokenType}
                onChange={(e) => setTokenType(e.target.value as 'classic' | 'fine-grained')}
                disabled={isConnecting || isConnected}
                className={classNames(
                  'w-full px-3 py-2 rounded-lg text-sm',
                  'bg-fmc-elements-background-depth-1 dark:bg-fmc-elements-background-depth-1',
                  'border border-fmc-elements-borderColor dark:border-fmc-elements-borderColor',
                  'text-fmc-elements-textPrimary dark:text-fmc-elements-textPrimary',
                  'focus:outline-none focus:ring-1 focus:ring-fmc-elements-item-contentAccent dark:focus:ring-fmc-elements-item-contentAccent',
                  'disabled:opacity-50',
                )}
              >
                <option value="classic">Jeton d'accès personnel (classique)</option>
                <option value="fine-grained">Jeton à granularité fine</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-fmc-elements-textSecondary dark:text-fmc-elements-textSecondary mb-2">
                {tokenType === 'classic' ? "Jeton d'accès personnel" : 'Jeton à granularité fine'}
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                disabled={isConnecting || isConnected}
                placeholder={`Entrez votre ${tokenType === 'classic' ? "jeton d'accès personnel GitHub" : 'jeton à granularité fine GitHub'
                  }`}
                className={classNames(
                  'w-full px-3 py-2 rounded-lg text-sm',
                  'bg-[#F8F8F8] dark:bg-[#1A1A1A]',
                  'border border-[#E5E5E5] dark:border-[#333333]',
                  'text-fmc-elements-textPrimary placeholder-fmc-elements-textTertiary',
                  'focus:outline-none focus:ring-1 focus:ring-fmc-elements-borderColorActive',
                  'disabled:opacity-50',
                )}
              />
              <div className="mt-2 text-sm text-fmc-elements-textSecondary">
                <a
                  href={`https://github.com/settings/tokens${tokenType === 'fine-grained' ? '/beta' : '/new'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fmc-elements-borderColorActive hover:underline inline-flex items-center gap-1"
                >
                  Obtenez votre jeton
                  <div className="i-ph:arrow-square-out w-4 h-4" />
                </a>
                <span className="mx-2">•</span>
                <span>
                  Portées requises :{' '}
                  {tokenType === 'classic' ? 'repo, read:org, read:user' : "Accès aux dépôts, Accès à l'organisation"}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-700">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            {!isConnected ? (
              <button
                type="submit"
                disabled={isConnecting || !token.trim()}
                className={classNames(
                  'px-4 py-2 rounded-lg text-sm flex items-center gap-2',
                  'bg-[#303030] text-white',
                  'hover:bg-[#5E41D0] hover:text-white',
                  'disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200',
                  'transform active:scale-95',
                )}
              >
                {isConnecting ? (
                  <>
                    <div className="i-ph:spinner-gap animate-spin" />
                    Connexion...
                  </>
                ) : (
                  <>
                    <div className="i-ph:plug-charging w-4 h-4" />
                    Connecter
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <button
                    onClick={disconnect}
                    type="button"
                    className={classNames(
                      'px-4 py-2 rounded-lg text-sm flex items-center gap-2',
                      'bg-red-500 text-white',
                      'hover:bg-red-600',
                    )}
                  >
                    <div className="i-ph:plug w-4 h-4" />
                    Déconnecter
                  </button>
                  <span className="text-sm text-fmc-elements-textSecondary flex items-center gap-1">
                    <div className="i-ph:check-circle w-4 h-4 text-green-500" />
                    Connecté à GitHub
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://github.com/dashboard', '_blank', 'noopener,noreferrer')}
                    className="flex items-center gap-2 hover:bg-fmc-elements-item-backgroundActive/10 hover:text-fmc-elements-textPrimary dark:hover:text-fmc-elements-textPrimary transition-colors"
                  >
                    <div className="i-ph:layout w-4 h-4" />
                    Tableau de bord
                  </Button>
                  <Button
                    onClick={onTestConnection}
                    disabled={connectionTest?.status === 'testing'}
                    variant="outline"
                    className="flex items-center gap-2 hover:bg-fmc-elements-item-backgroundActive/10 hover:text-fmc-elements-textPrimary dark:hover:text-fmc-elements-textPrimary transition-colors"
                  >
                    {connectionTest?.status === 'testing' ? (
                      <>
                        <div className="i-ph:spinner-gap w-4 h-4 animate-spin" />
                        Test en cours...
                      </>
                    ) : (
                      <>
                        <div className="i-ph:plug-charging w-4 h-4" />
                        Tester la connexion
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
}
