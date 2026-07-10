import { useCallback } from 'react'

import {
  type SimulationFormData,
  type SimulationRecord,
} from '@/data/simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'

const safeParseJSON = (data: string | null): SimulationRecord[] => {
  if (!data) return []
  try {
    return JSON.parse(data) as SimulationRecord[]
  } catch (error) {
    console.error('Failed to parse simulation data from localStorage:', error)
    return []
  }
}

export const useSimulationStorage = () => {
  const saveFormData = useCallback((formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const record: SimulationRecord = { 
      ...formData, 
      id, 
      createdAt: new Date().toISOString() 
    }

    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = safeParseJSON(storage)

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...savedData, record]),
    )

    return id
  }, [])

  const getFormData = useCallback((id: string) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!storage) {
      return null
    }

    const savedData = safeParseJSON(storage)
    return savedData.find((record) => record.id === id) || null
  }, [])

  const updateSimulation = useCallback((id: string, data: SimulationRecord) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = safeParseJSON(storage)

    const updated = savedData.map((record) =>
      record.id === id ? { ...data } : record,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }, [])

  const getAllSimulations = useCallback(() => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!storage) {
      return []
    }
    return safeParseJSON(storage)
  }, [])

  const deleteSimulation = useCallback((id: string) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!storage) return

    const savedData = safeParseJSON(storage)
    const updated = savedData.filter((record) => record.id !== id)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }, [])

  return { 
    saveFormData, 
    getFormData, 
    updateSimulation,
    getAllSimulations,
    deleteSimulation
  }
}
