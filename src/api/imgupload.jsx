
export async function upLoadImg(file){
    try{
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

        const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL,{
            method : 'POST',
            body : formData
        });
        if(!res.ok){
           console.error(res.status); 
        }
        const data = await res.json();
        return data.url
    }catch(error){
        console.error(error);
    }
}