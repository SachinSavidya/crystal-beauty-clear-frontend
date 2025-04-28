import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://kwfxlzqkmqonkmraqvgi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3ZnhsenFrbXFvbmttcmFxdmdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3OTEzMTYsImV4cCI6MjA2MTM2NzMxNn0.GjbH0fRmANh7cWvZye4vZXAqiGOPJGAEM62BVX1wd-E"
);

export default function mediaUpload(file){
    const promise = new Promise(
        (resolve,reject)=>{
            if(file == null){
                reject("No file selected")
            }
            const timeStamp = new Date().getTime()
            const newFileName = timeStamp+file.name

            supabase.storage.from("images").upload(newFileName, file, {
                cacheControl: "3600",
                upsert : false,

            }).then(
                ()=>{
                    const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl
                    resolve(url)
                }
            ).catch(
                (err)=>{
                    console.log(err)
                    reject("File upload failed")
                }
            )
        }
    )

    return promise; 
}