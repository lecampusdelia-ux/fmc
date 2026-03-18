import React from 'react';
import { Button } from '~/components/ui/Button';
import { Card, CardContent, CardHeader } from '~/components/ui/Card';
import {
  Cpu,
  Server,
  Settings,
  ExternalLink,
  Package,
  Code,
  Database,
  CheckCircle,
  AlertCircle,
  Activity,
  Cable,
  ArrowLeft,
  Download,
  Shield,
  Globe,
  Terminal,
  Monitor,
  Wifi,
} from 'lucide-react';

// Setup Guide Component
function SetupGuide({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="bg-transparent hover:bg-transparent text-fmc-elements-textSecondary hover:text-fmc-elements-textPrimary transition-all duration-200 p-2"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-xl font-semibold text-fmc-elements-textPrimary">Guide d'installation des fournisseurs locaux</h2>
          <p className="text-sm text-fmc-elements-textSecondary">
            Instructions complètes pour exécuter des modèles d'IA localement
          </p>
        </div>
      </div>

      {/* Hardware Requirements Overview */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-fmc-elements-textPrimary">Configuration système requise</h3>
              <p className="text-sm text-fmc-elements-textSecondary">Matériel recommandé pour des performances optimales</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-green-500" />
                <span className="font-medium text-fmc-elements-textPrimary">CPU</span>
              </div>
              <p className="text-fmc-elements-textSecondary">8+ cœurs, architecture moderne</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-fmc-elements-textPrimary">RAM</span>
              </div>
              <p className="text-fmc-elements-textSecondary">16 Go minimum, 32 Go+ recommandé</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-purple-500" />
                <span className="font-medium text-fmc-elements-textPrimary">GPU</span>
              </div>
              <p className="text-fmc-elements-textSecondary">NVIDIA RTX 30xx+ ou AMD RX 6000+</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ollama Setup Section */}
      <Card className="bg-fmc-elements-background-depth-2 shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center ring-1 ring-purple-500/30">
              <Server className="w-6 h-6 text-purple-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-fmc-elements-textPrimary">Installation d'Ollama</h3>
              <p className="text-sm text-fmc-elements-textSecondary">
                Le choix le plus populaire pour exécuter des modèles open-source localement avec une application de bureau
              </p>
            </div>
            <span className="px-3 py-1 bg-purple-500/10 text-purple-500 text-xs font-medium rounded-full">
              Recommandé
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Installation Options */}
          <div className="space-y-4">
            <h4 className="font-medium text-fmc-elements-textPrimary flex items-center gap-2">
              <Download className="w-4 h-4" />
              1. Choisissez la méthode d'installation
            </h4>

            {/* Desktop App - New and Recommended */}
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-5 h-5 text-green-500" />
                <h5 className="font-medium text-green-500">🆕 Application de bureau (Recommandé)</h5>
              </div>
              <p className="text-sm text-fmc-elements-textSecondary mb-3">
                Nouvelle application de bureau conviviale avec gestion intégrée des modèles et interface web.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-fmc-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="w-4 h-4 text-fmc-elements-textPrimary" />
                    <strong className="text-fmc-elements-textPrimary">macOS</strong>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-500/10 to-purple-600/10 hover:from-purple-500/20 hover:to-purple-600/20 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 gap-2 group shadow-sm hover:shadow-lg hover:shadow-purple-500/20 font-medium"
                    _asChild
                  >
                    <a
                      href="https://ollama.com/download/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex-shrink-0" />
                      <span className="flex-1 text-center font-medium">Télécharger l'application</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                    </a>
                  </Button>
                </div>
                <div className="p-3 rounded-lg bg-fmc-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="w-4 h-4 text-fmc-elements-textPrimary" />
                    <strong className="text-fmc-elements-textPrimary">Windows</strong>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-500/10 to-purple-600/10 hover:from-purple-500/20 hover:to-purple-600/20 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 gap-2 group shadow-sm hover:shadow-lg hover:shadow-purple-500/20 font-medium"
                    _asChild
                  >
                    <a
                      href="https://ollama.com/download/windows"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex-shrink-0" />
                      <span className="flex-1 text-center font-medium">Télécharger l'application</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="mt-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-blue-500 text-sm">Interface web intégrée</span>
                </div>
                <p className="text-xs text-fmc-elements-textSecondary">
                  L'application de bureau inclut une interface web sur{' '}
                  <code className="bg-fmc-elements-background-depth-4 px-1 rounded">http://localhost:11434</code>
                </p>
              </div>
            </div>

            {/* CLI Installation */}
            <div className="p-4 rounded-lg bg-fmc-elements-background-depth-3">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-5 h-5 text-fmc-elements-textPrimary" />
                <h5 className="font-medium text-fmc-elements-textPrimary">Ligne de commande (Avancé)</h5>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-fmc-elements-background-depth-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="w-4 h-4 text-fmc-elements-textPrimary" />
                    <strong className="text-fmc-elements-textPrimary">Windows</strong>
                  </div>
                  <div className="text-xs bg-fmc-elements-background-depth-4 p-2 rounded font-mono text-fmc-elements-textPrimary">
                    winget install Ollama.Ollama
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-fmc-elements-background-depth-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="w-4 h-4 text-fmc-elements-textPrimary" />
                    <strong className="text-fmc-elements-textPrimary">macOS</strong>
                  </div>
                  <div className="text-xs bg-fmc-elements-background-depth-4 p-2 rounded font-mono text-fmc-elements-textPrimary">
                    brew install ollama
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-fmc-elements-background-depth-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-fmc-elements-textPrimary" />
                    <strong className="text-fmc-elements-textPrimary">Linux</strong>
                  </div>
                  <div className="text-xs bg-fmc-elements-background-depth-4 p-2 rounded font-mono text-fmc-elements-textPrimary">
                    curl -fsSL https://ollama.com/install.sh | sh
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Model Recommendations */}
          <div className="space-y-4">
            <h4 className="font-medium text-fmc-elements-textPrimary flex items-center gap-2">
              <Package className="w-4 h-4" />
              2. Téléchargez les derniers modèles
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-fmc-elements-background-depth-3">
                <h5 className="font-medium text-fmc-elements-textPrimary mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4 text-green-500" />
                  Code & Développement
                </h5>
                <div className="space-y-2 text-xs bg-fmc-elements-background-depth-4 p-3 rounded font-mono text-fmc-elements-textPrimary">
                  <div># Latest Llama 3.2 for coding</div>
                  <div>ollama pull llama3.2:3b</div>
                  <div>ollama pull codellama:13b</div>
                  <div>ollama pull deepseek-coder-v2</div>
                  <div>ollama pull qwen2.5-coder:7b</div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-fmc-elements-background-depth-3">
                <h5 className="font-medium text-fmc-elements-textPrimary mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-500" />
                  Usage général & Chat
                </h5>
                <div className="space-y-2 text-xs bg-fmc-elements-background-depth-4 p-3 rounded font-mono text-fmc-elements-textPrimary">
                  <div># Latest general models</div>
                  <div>ollama pull llama3.2:3b</div>
                  <div>ollama pull mistral:7b</div>
                  <div>ollama pull phi3.5:3.8b</div>
                  <div>ollama pull qwen2.5:7b</div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-purple-500" />
                  <span className="font-medium text-purple-500">Optimisé pour la performance</span>
                </div>
                <ul className="text-xs text-fmc-elements-textSecondary space-y-1">
                  <li>• Llama 3.2: 3B - Plus rapide, 8 Go RAM</li>
                  <li>• Phi-3.5: 3.8B - Excellent équilibre</li>
                  <li>• Qwen2.5: 7B - Qualité excellente</li>
                  <li>• Mistral: 7B - Choix populaire</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium text-yellow-500">Conseils de pro</span>
                </div>
                <ul className="text-xs text-fmc-elements-textSecondary space-y-1">
                  <li>• Commencez avec des modèles 3B-7B pour de meilleures performances</li>
                  <li>• Utilisez des versions quantifiées pour un chargement plus rapide</li>
                  <li>• L'application de bureau gère automatiquement le stockage des modèles</li>
                  <li>• Interface web disponible sur localhost:11434</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Desktop App Features */}
          <div className="space-y-4">
            <h4 className="font-medium text-fmc-elements-textPrimary flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              3. Fonctionnalités de l'application de bureau
            </h4>
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-blue-500 mb-3">🖥️ Interface utilisateur</h5>
                  <ul className="text-sm text-fmc-elements-textSecondary space-y-1">
                    <li>• Explorateur de bibliothèque de modèles</li>
                    <li>• Téléchargements de modèles en un clic</li>
                    <li>• Interface de chat intégrée</li>
                    <li>• Surveillance des ressources système</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-500 mb-3">🔧 Outils de gestion</h5>
                  <ul className="text-sm text-fmc-elements-textSecondary space-y-1">
                    <li>• Mises à jour automatiques</li>
                    <li>• Optimisation de la taille des modèles</li>
                    <li>• Détection de l'accélération GPU</li>
                    <li>• Compatibilité multi-plateforme</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="space-y-4">
            <h4 className="font-medium text-fmc-elements-textPrimary flex items-center gap-2">
              <Settings className="w-4 h-4" />
              4. Dépannage & Commandes
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <h5 className="font-medium text-red-500 mb-2">Problèmes courants</h5>
                <ul className="text-xs text-fmc-elements-textSecondary space-y-1">
                  <li>• L'application ne démarre pas : Redémarrez le système</li>
                  <li>• GPU non détecté : Mettez à jour les pilotes</li>
                  <li>• Port 11434 bloqué : Changez le port dans les paramètres</li>
                  <li>• Modèles non chargés : Vérifiez l'espace disque disponible</li>
                  <li>• Performance lente : Utilisez des modèles plus petits ou activez le GPU</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <h5 className="font-medium text-green-500 mb-2">Commandes utiles</h5>
                <div className="text-xs bg-fmc-elements-background-depth-4 p-3 rounded font-mono text-fmc-elements-textPrimary space-y-1">
                  <div># Vérifier les modèles installés</div>
                  <div>ollama list</div>
                  <div></div>
                  <div># Supprimer des modèles inutilisés</div>
                  <div>ollama rm model_name</div>
                  <div></div>
                  <div># Vérifier l'utilisation du GPU</div>
                  <div>ollama ps</div>
                  <div></div>
                  <div># Voir les journaux</div>
                  <div>ollama logs</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LM Studio Setup Section */}
      <Card className="bg-fmc-elements-background-depth-2 shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center ring-1 ring-blue-500/30">
              <Monitor className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-fmc-elements-textPrimary">Installation de LM Studio</h3>
              <p className="text-sm text-fmc-elements-textSecondary">
                Interface graphique conviviale pour exécuter des modèles locaux avec une excellente gestion des modèles
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Installation */}
          <div className="space-y-4">
            <h4 className="font-medium text-fmc-elements-textPrimary flex items-center gap-2">
              <Download className="w-4 h-4" />
              1. Téléchargement & Installation
            </h4>
            <div className="p-4 rounded-lg bg-fmc-elements-background-depth-3">
              <p className="text-sm text-fmc-elements-textSecondary mb-3">
                Téléchargez LM Studio pour Windows, macOS ou Linux depuis le site officiel.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 gap-2 group shadow-sm hover:shadow-lg hover:shadow-blue-500/20 font-medium"
                _asChild
              >
                <a
                  href="https://lmstudio.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex-shrink-0" />
                  <span className="flex-1 text-center font-medium">Télécharger LM Studio</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                </a>
              </Button>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium text-fmc-elements-textPrimary flex items-center gap-2">
              <Settings className="w-4 h-4" />
              2. Configurer le serveur local
            </h4>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-fmc-elements-background-depth-3">
                <h5 className="font-medium text-fmc-elements-textPrimary mb-2">Démarrer le serveur local</h5>
                <ol className="text-xs text-fmc-elements-textSecondary space-y-1 list-decimal list-inside">
                  <li>Téléchargez un modèle depuis l'onglet "My Models"</li>
                  <li>Allez dans l'onglet "Local Server"</li>
                  <li>Sélectionnez votre modèle téléchargé</li>
                  <li>Définissez le port sur 1234 (par défaut)</li>
                  <li>Cliquez sur "Start Server"</li>
                </ol>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="font-medium text-red-500">Critique : Activer CORS</span>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-fmc-elements-textSecondary">
                    Pour fonctionner avec FMC DIY, vous DEVEZ activer CORS dans LM Studio :
                  </p>
                  <ol className="text-xs text-fmc-elements-textSecondary space-y-1 list-decimal list-inside ml-2">
                    <li>Dans les paramètres du serveur, cochez "Enable CORS"</li>
                    <li>Définissez l'interface réseau sur "0.0.0.0" pour un accès externe</li>
                    <li>
                      Alternativement, utilisez la CLI :{' '}
                      <code className="bg-fmc-elements-background-depth-4 px-1 rounded">lms server start --cors</code>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Advantages */}
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-blue-500">Avantages de LM Studio</span>
            </div>
            <ul className="text-xs text-fmc-elements-textSecondary space-y-1 list-disc list-inside">
              <li>Téléchargeur de modèles intégré avec recherche</li>
              <li>Changement et gestion faciles des modèles</li>
              <li>Interface de chat intégrée pour les tests</li>
              <li>Support du format GGUF (le plus compatible)</li>
              <li>Mises à jour régulières avec de nouvelles fonctionnalités</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* LocalAI Setup Section */}
      <Card className="bg-fmc-elements-background-depth-2 shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center ring-1 ring-green-500/30">
              <Globe className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-fmc-elements-textPrimary">Installation de LocalAI</h3>
              <p className="text-sm text-fmc-elements-textSecondary">
                Serveur API compatible OpenAI auto-hébergé avec un support étendu des modèles
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Installation */}
          <div className="space-y-4">
            <h4 className="font-medium text-fmc-elements-textPrimary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Options d'installation
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-fmc-elements-background-depth-3">
                <h5 className="font-medium text-fmc-elements-textPrimary mb-2">Installation rapide</h5>
                <div className="text-xs bg-fmc-elements-background-depth-4 p-3 rounded font-mono text-fmc-elements-textPrimary space-y-1">
                  <div># Installation en une ligne</div>
                  <div>curl https://localai.io/install.sh | sh</div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-fmc-elements-background-depth-3">
                <h5 className="font-medium text-fmc-elements-textPrimary mb-2">Docker (Recommandé)</h5>
                <div className="text-xs bg-fmc-elements-background-depth-4 p-3 rounded font-mono text-fmc-elements-textPrimary space-y-1">
                  <div>docker run -p 8080:8080</div>
                  <div>quay.io/go-skynet/local-ai:latest</div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium text-fmc-elements-textPrimary flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configuration
            </h4>
            <div className="p-4 rounded-lg bg-fmc-elements-background-depth-3">
              <p className="text-sm text-fmc-elements-textSecondary mb-3">
                LocalAI prend en charge de nombreux formats de modèles et fournit une API complète compatible OpenAI.
              </p>
              <div className="text-xs bg-fmc-elements-background-depth-4 p-3 rounded font-mono text-fmc-elements-textPrimary space-y-1">
                <div># Exemple de configuration</div>
                <div>models:</div>
                <div>- name: llama3.1</div>
                <div>backend: llama</div>
                <div>parameters:</div>
                <div>model: llama3.1.gguf</div>
              </div>
            </div>
          </div>

          {/* Advantages */}
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium text-green-500">Avantages de LocalAI</span>
            </div>
            <ul className="text-xs text-fmc-elements-textSecondary space-y-1 list-disc list-inside">
              <li>Compatibilité totale avec l'API OpenAI</li>
              <li>Prise en charge de plusieurs formats de modèles</li>
              <li>Option de déploiement Docker</li>
              <li>Galerie de modèles intégrée</li>
              <li>API REST pour la gestion des modèles</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Performance Optimization */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-fmc-elements-textPrimary">Optimisation des performances</h3>
              <p className="text-sm text-fmc-elements-textSecondary">Conseils pour améliorer les performances de l'IA locale</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-fmc-elements-textPrimary">Optimisations matérielles</h4>
              <ul className="text-sm text-fmc-elements-textSecondary space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Utilisez un GPU NVIDIA avec CUDA pour une accélération de 5-10x</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Augmentez la RAM pour des fenêtres de contexte plus grandes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Utilisez un stockage SSD pour un chargement plus rapide des modèles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Fermez les autres applications pour libérer de la RAM</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-fmc-elements-textPrimary">Optimisations logicielles</h4>
              <ul className="text-sm text-fmc-elements-textSecondary space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Utilisez des modèles plus petits pour des réponses plus rapides</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Activez la quantification (modèles 4-bit, 8-bit)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Réduisez la longueur du contexte pour les applications de chat</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Utilisez des réponses en streaming pour une meilleure UX</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Options */}
      <Card className="bg-fmc-elements-background-depth-2 shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center ring-1 ring-orange-500/30">
              <Wifi className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-fmc-elements-textPrimary">Options alternatives</h3>
              <p className="text-sm text-fmc-elements-textSecondary">
                Autres solutions d'IA locales et alternatives cloud
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-fmc-elements-textPrimary">Autres solutions locales</h4>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-fmc-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-fmc-elements-textPrimary">Jan.ai</span>
                  </div>
                  <p className="text-xs text-fmc-elements-textSecondary">
                    Interface moderne avec place de marché de modèles intégrée
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-fmc-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Terminal className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-fmc-elements-textPrimary">Oobabooga</span>
                  </div>
                  <p className="text-xs text-fmc-elements-textSecondary">
                    Interface web de génération de texte avancée avec extensions
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-fmc-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Cable className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-fmc-elements-textPrimary">KoboldAI</span>
                  </div>
                  <p className="text-xs text-fmc-elements-textSecondary">Focus sur l'écriture créative et la narration</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-fmc-elements-textPrimary">Alternatives Cloud</h4>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-fmc-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-fmc-elements-textPrimary">OpenRouter</span>
                  </div>
                  <p className="text-xs text-fmc-elements-textSecondary">Accès à plus de 100 modèles via une API unifiée</p>
                </div>
                <div className="p-3 rounded-lg bg-fmc-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Server className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-fmc-elements-textPrimary">Together AI</span>
                  </div>
                  <p className="text-xs text-fmc-elements-textSecondary">Inférence rapide avec des modèles open-source</p>
                </div>
                <div className="p-3 rounded-lg bg-fmc-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-pink-500" />
                    <span className="font-medium text-fmc-elements-textPrimary">Groq</span>
                  </div>
                  <p className="text-xs text-fmc-elements-textSecondary">Inférence LPU ultra-rapide pour les modèles Llama</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SetupGuide;
