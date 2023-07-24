import { ChangeEvent, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { StepsContext } from "../../../../../../context/StepsContext/StepsContext";

export const Content1 = () => {
    const [fileName, setFileName] = useState('');
    const { nextStep, setFile, file } = useContext(StepsContext);

    const onClickBtn = () => {
        nextStep(1);
    }

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const files = target.files as FileList;
        
        if (files.length !== 0) {
            const fileNameSplit = files[0].name.split('.');

            setFile(files[0]);
            setFileName(`${fileNameSplit[0].length >= 22 ? fileNameSplit[0].substring(0, 22) + '... ' : fileNameSplit[0]}.${fileNameSplit[1]}`);
        }
    };

    return (
        <div id="1">
            <div className="">
                <label htmlFor="file" className="h-[322px] flex items-center justify-center flex-col border-[3px] border-dashed border-blue-500 rounded-md cursor-pointer">
                    <FontAwesomeIcon icon={faCloudArrowUp} className="text-blue-500 text-8xl" />
                    <div className="text-lg text-blue-500 font-semibold">{file === undefined ? 'Browse File To Upload' : fileName}</div>
                </label>
                <input type="file" id="file" name="file" className="hidden" onChange={onChange} />
            </div>
            <div className="mt-6 text-center">
                <button className="bg-blue-600 py-2 px-4 text-white text-lg font-bold rounded-md  disabled:bg-blue-400 disabled:cursor-not-allowed" id="btn-next-1" disabled={file === undefined ? true : false} onClick={onClickBtn} >Next<FontAwesomeIcon icon={faChevronRight} className="ml-2 text-sm" /></button>
            </div>
        </div>
    );
}