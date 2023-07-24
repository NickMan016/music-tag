import { useContext, useState, ChangeEvent } from "react";
import { faChevronLeft, faChevronRight, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StepsContext } from "../../../../../../context/StepsContext/StepsContext";
import { useAPISpotify } from "./../../../../../../hooks/useAPISpotify";

export const Content2 = () => {
    const [search, setSearch] = useState('');
    const [trackSelected, setTrackSelected] = useState('');
    const { searchTrack, navigateTracks, clearSearch, tracks } = useAPISpotify();
    const { previousStep, nextStep, setTrackId, trackId } = useContext(StepsContext);

    const onChangeSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setSearch(target.value);
    }

    const onClearSearch = () => {
        clearSearch();
        setSearch('');
        setTrackSelected('');
        setTrackId(undefined);
    }

    const onChangeTrack = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setTrackSelected(target.value);
        setTrackId(target.value);
    }

    const onPreviousPage = () => {
        navigateTracks(tracks.previous || '');
    }

    const onNextPage = () => {
        navigateTracks(tracks.next || '');
    }

    const onSearch = () => {
        if (search.length !== 0) {
            searchTrack(search);
        }
    }

    const onClickPrevious = () => {
        previousStep(2);
    }

    const onClickNext = async () => {
        clearSearch();
        setSearch('');
        nextStep(2);
    }

    return (
        <div id="2">
            <div className="grid grid-cols-6 gap-4">
                <input type="text" name="search" value={search} onChange={onChangeSearch} placeholder="Search song..." autoComplete="off" className="col-span-4 border-[3px] px-3 py-2 rounded-md focus:border-blue-500 transition-colors duration-200 ease-linear outline-none" />
                <button className="bg-blue-600 text-lg text-white font-bold rounded" onClick={onSearch}>Search</button>
                <button className="bg-red-600 text-lg text-white font-bold rounded" onClick={onClearSearch}>Clear</button>
            </div>
            {
                tracks.items.length === 0 ? (
                    <div className="mt-8 flex items-center justify-center flex-col h-[244px]">
                        <div className="text-5xl font-semibold text-blue-600">Sorry!</div>
                        <div className="mt-2 text-xl text-blue-600">No results were found with your search</div>
                    </div>
                ) : (
                    <>
                        <div className="mt-8 grid grid-cols-2 gap-4 h-44 overflow-auto">
                            {
                                tracks.items.map((item, index) => {
                                    let artists = '';
                                    for (let index = 0; index < item.artists.length; index++) {
                                        const element = item.artists[index];
                                        artists += element.name;
                                        if ((index + 1) < item.artists.length) {
                                            artists += ', ';
                                        }
                                    }
                                    return (
                                        <div className="flex items-center col-span-1" key={index}>
                                            <input type="radio" name="track" id={item.id} value={item.id} checked={trackSelected === item.id} onChange={onChangeTrack} hidden />
                                            <label htmlFor={item.id}>
                                                <FontAwesomeIcon icon={trackSelected === item.id ? faCircleDot : faCircle} className={`mx-4 text-xl ${trackSelected === item.id ? 'text-blue-600' : 'cursor-pointer'}`} />
                                            </label>
                                            <img src={item.album.images[1].url} className="mr-3 h-20 w-h-20 block" alt={`imagen del album ${item.album.name}`} />
                                            <div>
                                                <div className="text-lg font-semibold">{item.name.length >= 18 ? item.name.substring(0, 18) + '...' : item.name}</div>
                                                <div>{item.album.name.length >= 18 ? item.album.name.substring(0, 18) + '...' : item.album.name}</div>
                                                <div>{artists.length >= 18 ? artists.substring(0, 18) + '...' : artists}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="text-center mt-8 flex justify-center items-center">
                            <button disabled={tracks.previous === null} onClick={onPreviousPage}
                                className="mx-1 inline-flex items-center justify-center bg-blue-600 w-9 h-9 text-white rounded-3xl cursor-pointer disabled:bg-blue-400">
                                <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
                            </button>
                            <button disabled={tracks.next === null} onClick={onNextPage}
                                className="mx-1 inline-flex items-center justify-center bg-blue-600 w-9 h-9 text-white rounded-3xl cursor-pointer disabled:bg-blue-400">
                                <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                            </button>
                        </div>
                    </>
                )
            }
            <div className="mt-6 text-center">
                <button className="mx-1 bg-blue-600 py-2 px-4 text-white text-lg font-bold rounded-md  disabled:bg-blue-400 disabled:cursor-not-allowed" id="btn-next-1" onClick={onClickPrevious} ><FontAwesomeIcon icon={faChevronLeft} className="mr-2 text-sm" />Previous</button>
                <button className="mx-1 bg-blue-600 py-2 px-4 text-white text-lg font-bold rounded-md  disabled:bg-blue-400 disabled:cursor-not-allowed" id="btn-next-1" disabled={trackId === undefined ? true : false} onClick={onClickNext} >Next<FontAwesomeIcon icon={faChevronRight} className="ml-2 text-sm" /></button>
            </div>
        </div>
    );
}