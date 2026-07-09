import { MessageCircle, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Divider } from '@/components/shared/Divider'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { sendChatMessage } from '@/services/aiService'

interface ChatProps {
  simulationId: string
}

export function Chat({ simulationId }: ChatProps) {
  const { getFormData, updateSimulation } = useSimulationStorage()
  const simulation = getFormData(simulationId)

  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatHistory = simulation?.chatHistory || []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory])

  if (!simulation) return null

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const newMessageText = inputValue
    setInputValue('')
    setIsLoading(true)

    const newMessage = { role: 'user' as const, text: newMessageText }
    const updatedHistory = [...chatHistory, newMessage]

    updateSimulation(simulationId, {
      ...simulation,
      chatHistory: updatedHistory,
    })

    try {
      const contextPrompt = `
      Você é um Educador Financeiro. Você já gerou um plano de ação para a seguinte simulação financeira:
      - Renda mensal: R$ ${simulation.income}
      - Custos fixos: R$ ${simulation.expenses}
      - Dívidas: R$ ${simulation.debts}
      - Meta: ${simulation.goalName} (Custo: R$ ${simulation.goalAmount}, Prazo: ${simulation.goalDeadline} meses)
      Responda a dúvida do usuário de forma clara, educada e direta. 
      REGRA IMPORTANTE: Sua resposta deve ter no máximo 6 linhas. NÃO use quebras de linha. Escreva todo o texto em um único parágrafo simples (sem formatação markdown, sem listas).
      `

      const responseText = await sendChatMessage(
        chatHistory,
        newMessageText,
        contextPrompt,
      )

      const aiMessage = { role: 'model' as const, text: responseText }
      
      const freshSimulation = getFormData(simulationId)
      if (freshSimulation) {
        updateSimulation(simulationId, {
          ...freshSimulation,
          chatHistory: [...updatedHistory, aiMessage],
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      void handleSend()
    }
  }

  return (
    <div className="flex flex-col gap-6 mt-4">
      <Divider />
      <div className="flex flex-col gap-6">
        {chatHistory.map((msg, index) => (
          <div key={index} className="flex flex-col gap-6">
            {index > 0 && <Divider />}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <MessageCircle
                  size={20}
                  className={msg.role === 'model' ? 'text-[var(--primary)]' : 'text-green-500'}
                />
                <span className={msg.role === 'model' ? 'text-muted-foreground text-sm font-semibold' : 'text-green-500 text-sm font-semibold'}>
                  {msg.role === 'user' ? 'Você' : 'Resposta da IA'}
                </span>
              </div>
              <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {msg.text}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col gap-2 opacity-50">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} className="text-[var(--primary)]" />
              <span className="text-foreground text-sm font-semibold">
                Resposta da IA
              </span>
            </div>
            <p className="text-foreground text-sm leading-relaxed">
              Pensando...
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2 p-[2px] z-[100]">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Faça uma pergunta..."
          disabled={isLoading}
          className="flex-1 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] rounded-xl border-[var(--border)] px-4 py-3 text-sm bg-input-ia text-foreground transition-colors focus:border-primary"
        />
        <button
          onClick={() => void handleSend()}
          disabled={isLoading || !inputValue.trim()}
          className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all disabled:hover:brightness-90 hover:cursor-pointer"
        >
          <Send size={18} className={inputValue.trim() ? "translate-x-[-1px] translate-y-[1px]" : ""} />
        </button>
      </div>
    </div>
  )
}
