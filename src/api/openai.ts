import OpenAI from 'openai';

// Инициализация клиента OpenAI
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Разрешаем использование в браузере
});

export interface AskAIOptions {
  model?: string;
  reasoningEffort?: 'low' | 'medium' | 'high';
  verbosity?: 'low' | 'medium' | 'high';
  systemPrompt?: string;
  store?: boolean;
}

/**
 * Функция для отправки запроса к OpenAI GPT-5 mini
 * @param prompt - Текст запроса пользователя
 * @param options - Опциональные параметры запроса
 * @returns Ответ от AI
 */
export async function askAI(
  prompt: string,
  options: AskAIOptions = {}
): Promise<string> {
  const {
    model = 'gpt-5-mini',
    reasoningEffort = 'medium',
    verbosity = 'medium',
    systemPrompt,
    store = true,
  } = options;

  try {
    const input: Array<any> = [];
    
    if (systemPrompt) {
      input.push({
        role: 'system',
        content: [
          {
            type: 'input_text',
            text: systemPrompt,
          },
        ],
      });
    }
    
    input.push({
      role: 'user',
      content: [
        {
          type: 'input_text',
          text: prompt,
        },
      ],
    });

    const response = await openai.responses.create({
      model,
      input,
      text: {
        format: {
          type: 'text',
        },
        verbosity,
      },
      reasoning: {
        effort: reasoningEffort,
        summary: 'auto',
      },
      tools: [],
      store,
      include: ['reasoning.encrypted_content', 'web_search_call.action.sources'],
    } as any);

    // Извлекаем ответ из output массива
    const responseData = response as any;
    
    // Ищем сообщение ассистента в output
    const messageOutput = responseData.output?.find(
      (item: any) => item.type === 'message' && item.role === 'assistant'
    );
    
    if (messageOutput?.content) {
      const outputText = messageOutput.content.find((item: any) => item.type === 'output_text');
      if (outputText?.text) {
        return outputText.text;
      }
    }
    
    return 'No response from AI';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error(
      `Failed to get response from OpenAI: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
