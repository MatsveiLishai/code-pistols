import OpenAI from 'openai';

// Получаем API ключ из переменных окружения
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// Проверяем наличие ключа и выводим понятную ошибку
if (!apiKey) {
  console.error('⚠️ VITE_OPENAI_API_KEY не установлен!');
  console.error('Добавьте переменную окружения в Vercel:');
  console.error('1. Зайдите в настройки проекта на Vercel');
  console.error('2. Settings → Environment Variables');
  console.error('3. Добавьте VITE_OPENAI_API_KEY со значением вашего ключа');
  console.error('4. Пересоберите проект');
}

// Инициализация клиента OpenAI
const openai = new OpenAI({
  apiKey: apiKey || 'dummy-key', // Используем dummy ключ, чтобы не падало при инициализации
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
  // Проверяем наличие API ключа перед запросом
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'API ключ OpenAI не настроен. Добавьте VITE_OPENAI_API_KEY в переменные окружения Vercel.'
    );
  }

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
