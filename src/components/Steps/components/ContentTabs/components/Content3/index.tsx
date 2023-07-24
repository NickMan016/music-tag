import { faDownload, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StepsContext } from "../../../../../../context/StepsContext/StepsContext";
import { useContext } from "react";
import { useAPISpotify } from "../../../../../../hooks/useAPISpotify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const Content3 = () => {
    const { convertTrack } = useAPISpotify();
    const { file, trackId, cleanSteps } = useContext(StepsContext);
    const MySwal = withReactContent(Swal);

    const onClick = async () => {
        if (trackId !== undefined && file !== undefined) {
            MySwal.fire({
                title: 'Converting File...',
                didOpen: () => {
                    Swal.showLoading()
                }
            });
            await convertTrack(file, trackId);
        }
    }

    const onClickAnother = async () => {
        cleanSteps();
    }

    return (
        <div id="3">
            <div className="flex items-center justify-center flex-col h-[390px]">
                <div className="mb-2 text-4xl text-blue-500 font-semibold">Your file is almost ready</div>
                <div className="mt-2">
                    <button className="bg-blue-600 text-white text-lg font-semibold mx-2 px-3 py-2 rounded-md cursor-pointer" onClick={onClick}>Download<FontAwesomeIcon icon={faDownload} className="ml-2" /></button>
                    <button className="bg-green-600 text-white text-lg font-semibold mx-2 px-3 py-2 rounded-md cursor-pointer" onClick={onClickAnother}>Edit another file<FontAwesomeIcon icon={faRotateLeft} className="ml-2" /></button>
                </div>
            </div>
        </div>
    );
}