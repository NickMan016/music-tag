import { useContext } from "react";
import { NavTabItem } from "./components/NavTabItem";
import { StepsContext } from "../../../../context/StepsContext/StepsContext";


export const NavTabs = () => {
    const { steps } = useContext(StepsContext);

    return (
        <div className="grid grid-cols-3 gap-4" id="menu-tabs">
            {
                steps.map((step, index) => (
                    <NavTabItem key={index} title={step.title} stepNumber={step.id} active={step.activeTab} />
                ))
            }
        </div>
    );
}