import { LLMManager } from '~/lib/modules/llm/manager';
import type { Template } from '~/types/template';

export const WORK_DIR_NAME = 'project';
export const WORK_DIR = `/home/${WORK_DIR_NAME}`;
export const MODIFICATIONS_TAG_NAME = 'fmc_file_modifications';
export const MODEL_REGEX = /^\[Model: (.*?)\]\n\n/;
export const PROVIDER_REGEX = /\[Provider: (.*?)\]\n\n/;
export const DEFAULT_MODEL = 'claude-3-5-sonnet-latest';
export const PROMPT_COOKIE_KEY = 'cachedPrompt';
export const TOOL_EXECUTION_APPROVAL = {
  APPROVE: 'Oui, approuvé.',
  REJECT: 'Non, rejeté.',
} as const;
export const TOOL_NO_EXECUTE_FUNCTION = 'Erreur : Aucune fonction d\'exécution trouvée sur l\'outil';
export const TOOL_EXECUTION_DENIED = 'Erreur : L\'utilisateur a refusé l\'accès à l\'exécution de l\'outil';
export const TOOL_EXECUTION_ERROR = 'Erreur : Une erreur est survenue lors de l\'appel de l\'outil';

const llmManager = LLMManager.getInstance(import.meta.env);

export const PROVIDER_LIST = llmManager.getAllProviders();
export const DEFAULT_PROVIDER = llmManager.getDefaultProvider();

export const providerBaseUrlEnvKeys: Record<string, { baseUrlKey?: string; apiTokenKey?: string }> = {};
PROVIDER_LIST.forEach((provider) => {
  providerBaseUrlEnvKeys[provider.name] = {
    baseUrlKey: provider.config.baseUrlKey,
    apiTokenKey: provider.config.apiTokenKey,
  };
});

// starter Templates

export const STARTER_TEMPLATES: Template[] = [
  {
    name: 'Expo App',
    label: 'Expo App',
    description: 'Template de démarrage Expo pour créer des applications mobiles multiplateformes',
    githubRepo: 'xKevIsDev/bolt-expo-template',
    tags: ['mobile', 'expo', 'mobile-app', 'android', 'iphone'],
    icon: 'i-fmc:expo',
  },
  {
    name: 'Basic Astro',
    label: 'Astro Basic',
    description: 'Template de démarrage Astro léger pour créer des sites web statiques rapides',
    githubRepo: 'xKevIsDev/bolt-astro-basic-template',
    tags: ['astro', 'blog', 'performance'],
    icon: 'i-fmc:astro',
  },
  {
    name: 'NextJS Shadcn',
    label: 'Next.js with shadcn/ui',
    description: 'Template de démarrage Next.js fullstack intégré avec les composants shadcn/ui et le système de style',
    githubRepo: 'xKevIsDev/bolt-nextjs-shadcn-template',
    tags: ['nextjs', 'react', 'typescript', 'shadcn', 'tailwind'],
    icon: 'i-fmc:nextjs',
  },
  {
    name: 'Vite Shadcn',
    label: 'Vite with shadcn/ui',
    description: 'Template de démarrage Vite fullstack intégré avec les composants shadcn/ui et le système de style',
    githubRepo: 'xKevIsDev/vite-shadcn',
    tags: ['vite', 'react', 'typescript', 'shadcn', 'tailwind'],
    icon: 'i-fmc:shadcn',
  },
  {
    name: 'Qwik Typescript',
    label: 'Qwik TypeScript',
    description: 'Template de démarrage du framework Qwik avec TypeScript pour créer des applications réutilisables',
    githubRepo: 'xKevIsDev/bolt-qwik-ts-template',
    tags: ['qwik', 'typescript', 'performance', 'resumable'],
    icon: 'i-fmc:qwik',
  },
  {
    name: 'Remix Typescript',
    label: 'Remix TypeScript',
    description: 'Template de démarrage du framework Remix avec TypeScript pour les applications web full-stack',
    githubRepo: 'xKevIsDev/bolt-remix-ts-template',
    tags: ['remix', 'typescript', 'fullstack', 'react'],
    icon: 'i-fmc:remix',
  },
  {
    name: 'Slidev',
    label: 'Slidev Presentation',
    description: 'Template de démarrage Slidev pour créer des présentations adaptées aux développeurs avec Markdown',
    githubRepo: 'xKevIsDev/bolt-slidev-template',
    tags: ['slidev', 'presentation', 'markdown'],
    icon: 'i-fmc:slidev',
  },
  {
    name: 'Sveltekit',
    label: 'SvelteKit',
    description: 'Template de démarrage SvelteKit pour créer des applications web rapides et efficaces',
    githubRepo: 'bolt-sveltekit-template',
    tags: ['svelte', 'sveltekit', 'typescript'],
    icon: 'i-fmc:svelte',
  },
  {
    name: 'Vanilla Vite',
    label: 'Vanilla + Vite',
    description: 'Template de démarrage Vite minimal pour les projets JavaScript natifs',
    githubRepo: 'xKevIsDev/vanilla-vite-template',
    tags: ['vite', 'vanilla-js', 'minimal'],
    icon: 'i-fmc:vite',
  },
  {
    name: 'Vite React',
    label: 'React + Vite + typescript',
    description: 'Template de démarrage React propulsé par Vite pour une expérience de développement rapide',
    githubRepo: 'xKevIsDev/bolt-vite-react-ts-template',
    tags: ['react', 'vite', 'frontend', 'website', 'app'],
    icon: 'i-fmc:react',
  },
  {
    name: 'Vite Typescript',
    label: 'Vite + TypeScript',
    description: 'Template de démarrage Vite avec configuration TypeScript pour un développement typé et sécurisé',
    githubRepo: 'xKevIsDev/bolt-vite-ts-template',
    tags: ['vite', 'typescript', 'minimal'],
    icon: 'i-fmc:typescript',
  },
  {
    name: 'Vue',
    label: 'Vue.js',
    description: 'Template de démarrage Vue.js avec des outils modernes et les meilleures pratiques',
    githubRepo: 'xKevIsDev/bolt-vue-template',
    tags: ['vue', 'typescript', 'frontend'],
    icon: 'i-fmc:vue',
  },
  {
    name: 'Angular',
    label: 'Angular Starter',
    description: 'Un template de démarrage Angular moderne avec support TypeScript et configuration des meilleures pratiques',
    githubRepo: 'xKevIsDev/bolt-angular-template',
    tags: ['angular', 'typescript', 'frontend', 'spa'],
    icon: 'i-fmc:angular',
  },
  {
    name: 'SolidJS',
    label: 'SolidJS Tailwind',
    description: 'Template de démarrage SolidJS léger pour créer des sites web statiques rapides',
    githubRepo: 'xKevIsDev/solidjs-ts-tw',
    tags: ['solidjs'],
    icon: 'i-fmc:solidjs',
  },
];
