import axios from "axios";
import { ItemTrack } from "../interfaces/StepsInterfaces";
import { useState } from "react";

export const useEditMetadata = () => {
    // const [blobURL, setBlobURL] = useState('')

    const convertTrack = async (file: File, track: ItemTrack) => {
        
        const form = new FormData();
        form.append('file', file);
        form.append('track', JSON.stringify(track));

        await axios.post('http://localhost:5000/file', form, {
            // responseType: 'blob'
        })
        .then((response) => {
            console.log(response.data);
            
            // const href = URL.createObjectURL(response.data);
            // console.log(href);
            
            // setBlobURL(href);
        });
        
        // var readableStream = fs.createReadStream();
        // const parser = metadata(readableStream, (err, metadata) => {
        //     if (err) throw err;
        //     console.log(metadata);
        //     readableStream.close();
        // });
    }

    return {
        convertTrack
    }
}