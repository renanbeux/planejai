import { ExternalLink, Goal, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/shared/Button'
import { Divider } from '@/components/shared/Divider'
import type { SimulationRecord } from '@/data/simulation'
import { parseCurrency } from '@/utils/currency'

interface SimulationCardProps {
  simulation: SimulationRecord
  onDelete: (id: string) => void
}

export function SimulationCard({ simulation, onDelete }: SimulationCardProps) {
  const goalAmountNum = parseCurrency(simulation.goalAmount)
  const deadlineNum = Number(simulation.goalDeadline)
  const monthlySavings = deadlineNum > 0 ? goalAmountNum / deadlineNum : 0

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div className="bg-card text-card-foreground flex flex-col items-start justify-between rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8 md:flex-row md:items-center">
      {/* Ícone, Título e Data */}
      <div className="mb-4 flex w-full items-center gap-4 md:mb-0 md:w-auto">
        <div className="flex shrink-0 items-center justify-center rounded-2xl bg-primary/10 p-4 text-primary">
          <Goal size={28} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg">{simulation.goalName}</h3>
          {simulation.createdAt && (
            <p className="text-muted-foreground text-sm font-medium">
              {formatDate(simulation.createdAt)}
            </p>
          )}
        </div>
      </div>

      {/* Colunas de Dados */}
      <div className="flex w-full flex-col justify-around gap-6 px-0 md:w-auto md:flex-1 md:flex-row md:gap-4 md:px-8">
        <div className="flex flex-col">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Custo da meta
          </span>
          <span className="font-bold text-foreground">
            R$ {simulation.goalAmount}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Prazo
          </span>
          <span className="font-bold text-foreground">
            {simulation.goalDeadline} meses
          </span>
        </div>
        <div className="flex flex-col">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Economia mensal
          </span>
          <span className="font-bold text-foreground">
            {formatCurrency(monthlySavings)}
          </span>
        </div>
      </div>
      <Divider orientation="vertical" />
      {/* Ações */}
      <div className="mt-6 flex w-full items-center justify-between gap-4 border-t border-border pt-6 md:mt-0 md:w-auto md:border-none md:pt-0">
        <button
          onClick={() => onDelete(simulation.id)}
          className="flex cursor-pointer items-center justify-center rounded-xl p-3 text-red-500 transition-colors hover:bg-red-500/10"
          title="Excluir"
        >
          <Trash2 size={24} />
        </button>
        <Link to={`/resultado/${simulation.id}`}>
          <Button variant="secondary" icon={ExternalLink}>
            Ver detalhes
          </Button>
        </Link>
      </div>
    </div>
  )
}
