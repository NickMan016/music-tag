export interface PropsNavTabItem {
    title: string
    stepNumber: number
    active: boolean
}

export const NavTabItem = ({title, stepNumber, active}: PropsNavTabItem) => {
    return(
        <div className={`inline-block border-t-4 py-3 ${active ? 'border-blue-500' : 'border-gray-300'}`}>
            <div className={`font-semibold ${active ? 'text-blue-600' : 'text-gray-500'}`}>Step {stepNumber}</div>
            <div>{title}</div>
        </div>
    );
}