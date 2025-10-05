import { useState } from 'react';
import { useAskAI } from '@/hooks/useAskAI';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function AIChat() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([]);

  const { ask, isLoading, error } = useAskAI({
    onSuccess: (response) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    },
    defaultOptions: {
      model: 'gpt-5-mini',
      reasoningEffort: 'medium',
      verbosity: 'medium',
      systemPrompt: 'You are a helpful coding assistant.',
      store: true,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: prompt }]);
    ask({ prompt });
    setPrompt('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">AI Chat</h2>

        {/* Messages */}
        <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
          {messages.length === 0 && (
            <p className="text-gray-500 text-center">
              Start a conversation with AI
            </p>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-100 ml-auto max-w-[80%]'
                  : 'bg-gray-100 mr-auto max-w-[80%]'
              }`}
            >
              <p className="text-sm font-semibold mb-1">
                {message.role === 'user' ? 'You' : 'AI'}
              </p>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="bg-gray-100 p-3 rounded-lg mr-auto max-w-[80%]">
              <p className="text-sm font-semibold mb-1">AI</p>
              <p className="text-gray-500">Thinking...</p>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{error.message}</p>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !prompt.trim()}>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </Card>
    </div>
  );
}

