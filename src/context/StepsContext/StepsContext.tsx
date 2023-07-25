import { createContext, Dispatch, SetStateAction } from "react"
import { DataSteps } from "../../interfaces/StepsInterfaces"


export type PropsStepsContext = {
    _currentStep: number
    steps: DataSteps[]
    file: File | undefined
    trackId: string | undefined
    setFile: Dispatch<SetStateAction<File | undefined>>
    setTrackId: Dispatch<SetStateAction<string | undefined>>
    initialSteps: ( steps: DataSteps[] ) => void
    nextStep: ( idStep: number ) => void
    previousStep: ( idStep: number ) => void
    cleanSteps: () => void
}

export const StepsContext = createContext<PropsStepsContext>({} as PropsStepsContext);