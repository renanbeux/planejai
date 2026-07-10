import { useEffect, useState } from 'react'

import { PageHero } from '@/components/shared/PageHero'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { SimulationCard } from '@/components/features/SimulationHistory/SimulationCard'

export function SimulationHistoryPage() {
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()
  const [simulations, setSimulations] = useState<SimulationRecord[]>([])

  useEffect(() => {
    setSimulations(getAllSimulations())
  }, [getAllSimulations])

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta simulação?')) {
      deleteSimulation(id)
      setSimulations(getAllSimulations())
    }
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
          simulations.map((sim) => (
            <SimulationCard 
              key={sim.id} 
              simulation={sim} 
              onDelete={handleDelete} 
            />
          ))
        )}
      </div>
    </div>
  )
}
