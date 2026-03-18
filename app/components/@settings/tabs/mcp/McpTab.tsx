import { useEffect, useMemo, useState } from 'react';
import { classNames } from '~/utils/classNames';
import type { MCPConfig } from '~/lib/services/mcpService';
import { toast } from 'react-toastify';
import { useMCPStore } from '~/lib/stores/mcp';
import McpServerList from '~/components/@settings/tabs/mcp/McpServerList';

const EXAMPLE_MCP_CONFIG: MCPConfig = {
  mcpServers: {
    everything: {
      type: 'stdio',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-everything'],
    },
    deepwiki: {
      type: 'streamable-http',
      url: 'https://mcp.deepwiki.com/mcp',
    },
    'local-sse': {
      type: 'sse',
      url: 'http://localhost:8000/sse',
      headers: {
        Authorization: 'Bearer mytoken123',
      },
    },
  },
};

export default function McpTab() {
  const settings = useMCPStore((state) => state.settings);
  const isInitialized = useMCPStore((state) => state.isInitialized);
  const serverTools = useMCPStore((state) => state.serverTools);
  const initialize = useMCPStore((state) => state.initialize);
  const updateSettings = useMCPStore((state) => state.updateSettings);
  const checkServersAvailabilities = useMCPStore((state) => state.checkServersAvailabilities);

  const [isSaving, setIsSaving] = useState(false);
  const [mcpConfigText, setMCPConfigText] = useState('');
  const [maxLLMSteps, setMaxLLMSteps] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingServers, setIsCheckingServers] = useState(false);
  const [expandedServer, setExpandedServer] = useState<string | null>(null);

  useEffect(() => {
    if (!isInitialized) {
      initialize().catch((err) => {
        setError(`Échec de l'initialisation des paramètres MCP : ${err instanceof Error ? err.message : String(err)}`);
        toast.error('Échec du chargement de la configuration MCP');
      });
    }
  }, [isInitialized]);

  useEffect(() => {
    setMCPConfigText(JSON.stringify(settings.mcpConfig, null, 2));
    setMaxLLMSteps(settings.maxLLMSteps);
    setError(null);
  }, [settings]);

  const parsedConfig = useMemo(() => {
    try {
      setError(null);
      return JSON.parse(mcpConfigText) as MCPConfig;
    } catch (e) {
      setError(`Format JSON invalide : ${e instanceof Error ? e.message : String(e)}`);
      return null;
    }
  }, [mcpConfigText]);

  const handleMaxLLMCallChange = (value: string) => {
    setMaxLLMSteps(parseInt(value, 10));
  };

  const handleSave = async () => {
    if (!parsedConfig) {
      return;
    }

    setIsSaving(true);

    try {
      await updateSettings({
        mcpConfig: parsedConfig,
        maxLLMSteps,
      });
      toast.success('Configuration MCP enregistrée');

      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Échec de l\'enregistrement de la configuration');
      toast.error('Échec de l\'enregistrement de la configuration MCP');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadExample = () => {
    setMCPConfigText(JSON.stringify(EXAMPLE_MCP_CONFIG, null, 2));
    setError(null);
  };

  const checkServerAvailability = async () => {
    if (serverEntries.length === 0) {
      return;
    }

    setIsCheckingServers(true);
    setError(null);

    try {
      await checkServersAvailabilities();
    } catch (e) {
      setError(`Échec de la vérification de la disponibilité du serveur : ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setIsCheckingServers(false);
    }
  };

  const toggleServerExpanded = (serverName: string) => {
    setExpandedServer(expandedServer === serverName ? null : serverName);
  };

  const serverEntries = useMemo(() => Object.entries(serverTools), [serverTools]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <section aria-labelledby="server-status-heading">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-medium text-fmc-elements-textPrimary">Serveurs MCP configurés</h2>{' '}
          <button
            onClick={checkServerAvailability}
            disabled={isCheckingServers || !parsedConfig || serverEntries.length === 0}
            className={classNames(
              'px-3 py-1.5 rounded-lg text-sm',
              'bg-fmc-elements-background-depth-3 hover:bg-fmc-elements-background-depth-4',
              'text-fmc-elements-textPrimary',
              'transition-all duration-200',
              'flex items-center gap-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
            )}
          >
            {isCheckingServers ? (
              <div className="i-svg-spinners:90-ring-with-bg w-3 h-3 text-fmc-elements-loader-progress animate-spin" />
            ) : (
              <div className="i-ph:arrow-counter-clockwise w-3 h-3" />
            )}
            Vérifier la disponibilité
          </button>
        </div>
        <McpServerList
          checkingServers={isCheckingServers}
          expandedServer={expandedServer}
          serverEntries={serverEntries}
          toggleServerExpanded={toggleServerExpanded}
        />
      </section>

      <section aria-labelledby="config-section-heading">
        <h2 className="text-base font-medium text-fmc-elements-textPrimary mb-3">Configuration</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="mcp-config" className="block text-sm text-fmc-elements-textSecondary mb-2">
              JSON de configuration
            </label>
            <textarea
              id="mcp-config"
              value={mcpConfigText}
              onChange={(e) => setMCPConfigText(e.target.value)}
              className={classNames(
                'w-full px-3 py-2 rounded-lg text-sm font-mono h-72',
                'bg-[#F8F8F8] dark:bg-[#1A1A1A]',
                'border',
                error ? 'border-fmc-elements-icon-error' : 'border-[#E5E5E5] dark:border-[#333333]',
                'text-fmc-elements-textPrimary',
                'focus:outline-none focus:ring-1 focus:ring-fmc-elements-focus',
              )}
            />
          </div>
          <div>{error && <p className="mt-2 mb-2 text-sm text-fmc-elements-icon-error">{error}</p>}</div>
          <div>
            <label htmlFor="max-llm-steps" className="block text-sm text-fmc-elements-textSecondary mb-2">
              Nombre maximum d'appels LLM séquentiels (étapes)
            </label>
            <input
              id="max-llm-steps"
              type="number"
              placeholder="Nombre maximum d'appels LLM séquentiels"
              min="1"
              max="20"
              value={maxLLMSteps}
              onChange={(e) => handleMaxLLMCallChange(e.target.value)}
              className="w-full px-3 py-2 text-fmc-elements-textPrimary text-sm rounded-lg bg-white dark:bg-fmc-elements-background-depth-4 border border-fmc-elements-borderColor dark:border-fmc-elements-borderColor-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-2 text-sm text-fmc-elements-textSecondary">
            Le format de configuration MCP est identique à celui utilisé dans Claude Desktop.
            <a
              href="https://modelcontextprotocol.io/examples"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fmc-elements-link hover:underline inline-flex items-center gap-1"
            >
              Voir les serveurs d'exemple
              <div className="i-ph:arrow-square-out w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap justify-between gap-3 mt-6">
        <button
          onClick={handleLoadExample}
          className="px-4 py-2 rounded-lg text-sm border border-fmc-elements-borderColor
                    bg-fmc-elements-background-depth-2 text-fmc-elements-textSecondary
                    hover:bg-fmc-elements-background-depth-3"
        >
          Charger un exemple
        </button>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving || !parsedConfig}
            aria-disabled={isSaving || !parsedConfig}
            className={classNames(
              'px-4 py-2 rounded-lg text-sm flex items-center gap-2',
              'bg-fmc-elements-item-backgroundAccent text-fmc-elements-item-contentAccent',
              'hover:bg-fmc-elements-item-backgroundActive',
              'disabled:opacity-50 disabled:cursor-not-allowed',
            )}
          >
            <div className="i-ph:floppy-disk w-4 h-4" />
            {isSaving ? 'Enregistrement...' : 'Enregistrer la configuration'}
          </button>
        </div>
      </div>
    </div>
  );
}
