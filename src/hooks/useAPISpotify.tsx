import { useState } from 'react';
import axios from 'axios';
import { AccessToken, Tracks } from '../interfaces/StepsInterfaces';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface GetResponseTracks {
    tracks: Tracks
}

const INITIAL_STATE: Tracks = {
    href: '',
    items: [],
    limit: 0,
    next: null,
    offset: 0,
    previous: null,
    total: 0
}

const INITIAL_STATE_TOKEN: AccessToken = {
    access_token: '',
    expires_in: 0,
    token_type: ''
}

export const useAPISpotify = () => {
    const [token, setToken] = useState<AccessToken>(INITIAL_STATE_TOKEN);
    const [tracks, setTracks] = useState<Tracks>(INITIAL_STATE);
    const [_currentStep, setCurrentStep] = useState<number>(0);
    const MySwal = withReactContent(Swal);

    const searchTrack = async (query: string) => {

        axios.post('https://accounts.spotify.com/api/token', {
            grant_type: "client_credentials",
            client_id: "0f77648b9a024841b07f1e2e33fb626b",
            client_secret: "2db664c593d94af9a232b43d9b1c94f7",
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(async (response) => {
            const token = response.data as AccessToken;
            setToken(token);

            const { data } = await axios.get<GetResponseTracks>(`https://api.spotify.com/v1/search?query=${query}&type=track`, {
                headers: {
                    Authorization: `${token.token_type} ${token.access_token}`
                }
            });

            setTracks(data.tracks);
            setCurrentStep(1);

        });

    }

    const convertTrack = async (file: File, query: string) => {
        const form = new FormData();
        form.append('file', file);
        form.append('track', query);

        await axios.post('https://music-tag-api.onrender.com/file', form)
            .then(async (response) => {
                await axios.get(`https://music-tag-api.onrender.com/download/${response.data}/${file.name}`, {
                    responseType: 'blob'
                })
                    .then((response) => {
                        const href = URL.createObjectURL(response.data);
                        const link = document.createElement('a');
                        link.href = href;
                        link.setAttribute('download', file.name);
                        document.body.appendChild(link);
                        link.click();

                        document.body.removeChild(link);
                        URL.revokeObjectURL(href);
                    });

                await axios.get(`https://music-tag-api.onrender.com/clean/${response.data}/${file.name}`)
                    .then((response) => {
                        MySwal.fire({
                            icon: 'success',
                            title: 'Converted File',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    });
            });
    }

    const navigateTracks = async (url: string) => {
        const { data } = await axios.get<GetResponseTracks>(url, {
            headers: {
                Authorization: `${token.token_type} ${token.access_token}`
            }
        });

        setTracks(data.tracks);

    }

    const clearSearch = () => {
        setTracks(INITIAL_STATE);
        setCurrentStep(0);
    }

    return {
        tracks,
        convertTrack,
        searchTrack,
        navigateTracks,
        clearSearch
    }
}