import { useMutation } from '@tanstack/react-query';
import { askAI, type AskAIOptions } from '@/api/openai';

interface UseAskAIProps {
  onSuccess?: (response: string) => void;
  onError?: (error: Error) => void;
  defaultOptions?: AskAIOptions;
}

/**
 * Хук для использования askAI с React Query
 */
export function useAskAI(props?: UseAskAIProps) {
  const { onSuccess, onError, defaultOptions } = props || {};

  const mutation = useMutation({
    mutationFn: async ({
      prompt,
      options,
    }: {
      prompt: string;
      options?: AskAIOptions;
    }) => {
      return askAI(prompt, { ...defaultOptions, ...options });
    },
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: Error) => {
      if (onError) {
        onError(error);
      }
    },
  });

  return {
    ask: mutation.mutate,
    askAsync: mutation.mutateAsync,
    response: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
