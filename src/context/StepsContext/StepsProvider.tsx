import { useState } from "react"
import { DataSteps } from "../../interfaces/StepsInterfaces";
import { StepsContext } from "./StepsContext";


interface PropsStepsProvider {
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE_STEPS: DataSteps[] = [];

export const StepsProvider = ({ children }: PropsStepsProvider) => {
    const [steps, setSteps] = useState<DataSteps[]>(INITIAL_STATE_STEPS);
    const [file, setFile] = useState<File>();
    const [trackId, setTrackId] = useState<string>();
    const [_currentStep, setCurrentStep] = useState<number>(0);

    const initialSteps = (steps: DataSteps[]) => {
        setSteps(steps);
    };

    const nextStep = (idStep: number) => {
        steps[idStep - 1].activeComponent = false;
        steps[idStep].activeTab = true;
        steps[idStep].activeComponent = true;
        setCurrentStep(idStep);
    }

    const previousStep = (idStep: number) => {
        steps[idStep - 2].activeComponent = true;
        steps[idStep - 1].activeTab = false;
        steps[idStep - 1].activeComponent = false;
        setCurrentStep(idStep);
    }

    const cleanSteps = () => {
        steps[0].activeTab = true;
        steps[0].activeComponent = true;
        steps[1].activeTab = false;
        steps[1].activeComponent = false;
        steps[2].activeTab = false;
        steps[2].activeComponent = false;
        setFile(undefined);
        setTrackId(undefined);
        setCurrentStep(0);
    }

    return (
        <StepsContext.Provider value={{
            _currentStep, steps, file, trackId, setFile, setTrackId, initialSteps, nextStep, previousStep, cleanSteps
        }}>
            {children}
        </StepsContext.Provider>
    );
}