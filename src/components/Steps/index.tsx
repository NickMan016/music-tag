import { useContext } from "react";
import { DataSteps } from "../../interfaces/StepsInterfaces";
import { NavTabs } from "./components/NavTabs";
import { StepsContext } from "../../context/StepsContext/StepsContext";
import { ContentTabs } from "./components/ContentTabs";

export interface PropsSteps {
    dataSteps: DataSteps[]
}


export const Steps = ({ dataSteps }: PropsSteps) => {
    const { initialSteps, steps } = useContext(StepsContext);
    initialSteps(dataSteps);

    return (
        <>
            {
                steps.length !== 0 ? (
                    <>
                        <NavTabs />
                        <ContentTabs />
                    </>
                ) : undefined
            }
        </>
    );
}