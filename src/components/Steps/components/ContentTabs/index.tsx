import { useContext } from "react";
import { StepsContext } from "../../../../context/StepsContext/StepsContext";

export const ContentTabs = () => {
    const { steps } = useContext(StepsContext);
    return (

        <div className="mt-4" id="content-tabs">
            {
                steps.map((step, index) => (
                    <div key={index} className={!step.activeComponent ? 'hidden' : ''}>
                        {step.component}
                    </div>
                ))
            }
        </div>
    );
}