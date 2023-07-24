import { Content1 } from './components/Steps/components/ContentTabs/components/Content1';
import { Content2 } from './components/Steps/components/ContentTabs/components/Content2';
import { Content3 } from './components/Steps/components/ContentTabs/components/Content3';
import { DataSteps } from './interfaces/StepsInterfaces';
import { Steps } from './components/Steps';
import { StepsProvider } from './context/StepsContext/StepsProvider';

import './index.css';

export const App = () => {
    const steps: DataSteps[] = [
        {
            id: 1,
            title: "Upload File",
            component: <Content1 />,
            activeTab: true,
            activeComponent: true
        },
        {
            id: 2,
            title: "Select Song",
            component: <Content2 />,
            activeTab: false,
            activeComponent: false
        },
        {
            id: 3,
            title: "Download",
            component: <Content3 />,
            activeTab: false,
            activeComponent: false
        }
    ]
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-300">
            <div className="bg-white p-5 rounded-md w-2/4">
                <StepsProvider>
                    <Steps dataSteps={steps} />
                </StepsProvider>
            </div>
        </div>
    );
}
