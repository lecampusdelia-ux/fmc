import { BaseProvider } from '~/lib/modules/llm/base-provider';
import type { ModelInfo } from '~/lib/modules/llm/types';
import type { IProviderSetting } from '~/types/model';
import type { LanguageModelV1 } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export default class HuggingFaceProvider extends BaseProvider {
  name = 'HuggingFace';
  getApiKeyLink = 'https://huggingface.co/settings/tokens';

  config = {
    apiTokenKey: 'HuggingFace_API_KEY',
  };

  staticModels: ModelInfo[] = [
    {
      name: 'Qwen/Qwen2.5-Coder-32B-Instruct',
      label: 'Qwen2.5-Coder-32B-Instruct (HuggingFace)',
      provider: 'HuggingFace',
      maxTokenAllowed: 32000,
    },
    {
      name: 'mistralai/Mistral-7B-Instruct-v0.3',
      label: 'Mistral-7B-Instruct-v0.3 (HuggingFace)',
      provider: 'HuggingFace',
      maxTokenAllowed: 32000,
    },
    {
      name: 'meta-llama/Llama-2-7b-chat-hf',
      label: 'Llama-2-7b-chat-hf (HuggingFace)',
      provider: 'HuggingFace',
      maxTokenAllowed: 4096,
    },
    {
      name: 'google/gemma-2-9b-it',
      label: 'Gemma-2-9b-it (HuggingFace)',
      provider: 'HuggingFace',
      maxTokenAllowed: 8192,
    },
  ];

  getModelInstance(options: {
    model: string;
    serverEnv: Env;
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
  }): LanguageModelV1 {
    const { model, serverEnv, apiKeys, providerSettings } = options;

    const { apiKey } = this.getProviderBaseUrlAndKey({
      apiKeys,
      providerSettings: providerSettings?.[this.name],
      serverEnv: serverEnv as any,
      defaultBaseUrlKey: '',
      defaultApiTokenKey: 'HuggingFace_API_KEY',
    });

    if (!apiKey) {
      throw new Error(`Missing API key for ${this.name} provider`);
    }

    const openai = createOpenAI({
      baseURL: 'https://router.huggingface.co/v1',
      apiKey,
    });

    return openai(model);
  }
}
