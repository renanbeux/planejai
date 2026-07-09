import { ExternalLink, Goal, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/shared/Button'
import { Divider } from '@/components/shared/Divider'
import { PageHero } from '@/components/shared/PageHero'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { parseCurrency } from '@/utils/currency'

export function SimulationHistoryPage() {
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()
  const [simulations, setSimulations] = useState<SimulationRecord[]>([])

  useEffect(() => {
    setSimulations(getAllSimulations())
  }, [])

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta simulação?')) {
      deleteSimulation(id)
      setSimulations(getAllSimulations())
    }
  }

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
      year: 'numeric'
    })
  }

  return (
    <div className="mx-auto w-full max-w-5xl py-8 p-8">
      <PageHero 
        title="Histórico de simulações" 
        subtitle="Acompanhe o histórico de seus planos financeiros."
      />
      
      <div className="flex flex-col gap-6 mt-8">
        {simulations.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Nenhuma simulação salva.</p>
        ) : (
          simulations.map((sim) => {
            const goalAmountNum = parseCurrency(sim.goalAmount)
            const deadlineNum = Number(sim.goalDeadline)
            const monthlySavings = deadlineNum > 0 ? goalAmountNum / deadlineNum : 0

            return (
              <div 
                key={sim.id}
                className="bg-card text-card-foreground flex flex-col items-start justify-between rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8 md:flex-row md:items-center"
              >
                {/* Ícone, Título e Data */}
                <div className="mb-4 flex w-full items-center gap-4 md:mb-0 md:w-auto">
                  <div className="flex shrink-0 items-center justify-center rounded-2xl bg-primary/10 p-4 text-primary">
                    <Goal size={28} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-lg">{sim.goalName}</h3>
                    {sim.createdAt && (
                      <p className="text-muted-foreground text-sm font-medium">
                        {formatDate(sim.createdAt)}
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
                      R$ {sim.goalAmount}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Prazo
                    </span>
                    <span className="font-bold text-foreground">
                      {sim.goalDeadline} meses
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
                    onClick={() => handleDelete(sim.id)}
                    className="flex cursor-pointer items-center justify-center rounded-xl p-3 text-red-500 transition-colors hover:bg-red-500/10"
                    title="Excluir"
                  >
                    <Trash2 size={24} />
                  </button>
                  <Link to={`/resultado/${sim.id}`}>
                    <Button variant="secondary" icon={ExternalLink}>
                      Ver detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
