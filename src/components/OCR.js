import React, { useEffect, useRef, useState } from 'react'
import Tesseract from 'tesseract.js';
import { TextractClient, AnalyzeDocumentCommand, DetectDocumentTextCommand } from '@aws-sdk/client-textract'
import AWS from 'aws-sdk'

const S3_BUCKET ='codefest-ocr';
const REGION ='us-east-1';
const accessKeyId = "AKIAV6KH72KMUP77VG77"
const secretAccessKey = "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"

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

function OCR() {
    let imgRef = useRef()
    const [image, setImage] = useState(null)
    const [text, setText] = useState(null)
    // First, create a new FileReader object
    const reader = new FileReader();
    const url = 'http://44.203.174.37:8000/file-upload'

    
    
    const doOCRTessaract =  () => {
        if(!image) return
        console.log("inside doOCR")
        Tesseract.recognize(
            URL.createObjectURL(image),
            "hin"
           
        )
        .then(result=>{
            let ocrText = ""
            console.log("done")
            console.log(result)
            let linesText = result.data.lines.map(item=>item.text)
            console.log(linesText.join("\n"))
            setText(linesText.join("\n"))
        })
        .catch(err=>{
            console.log(err)
        })
    };

    
    
    let uploadToS3 = async () => {
        const params = {
          Body: image,
          Bucket: S3_BUCKET,
          Key: image.name
        };
      
        return new Promise((resolve, reject) => {
          myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
              console.log(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
              if (err) {
                console.log(err)
                reject(err)
              } else {
                resolve()
              }
            })
        })
      }

    

    let doOCRTextract = async ()=>{
        if(!image) return

        await uploadToS3()

        const client = new TextractClient({
            region: 'us-east-1',
            credentials: {
                accessKeyId: 'AKIAV6KH72KMUP77VG77',
                secretAccessKey: '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',
            },
        })
       
        const params = {
            Document: {
                S3Object: {
                    Bucket: S3_BUCKET,
                    Name: image.name
                },
            },
        }

        let command = new DetectDocumentTextCommand(params)
        try {
            const data = await client.send(command)
            console.log('data', data)
            let ocrText = processTextractData(data.Blocks)
            console.log(ocrText)
            setText(ocrText)
          } catch (error) {
            console.log('err', error)
          }
    }

    let processTextractData = (blocks)=>{
        let strs=[]
        blocks.forEach(block => {
            if(block.BlockType == "LINE"){
                strs.push(block.Text)
            }
        });
        let str = strs.join("\n")
        
        return str
    }

    let handleChangeImage = ()=>{
        console.log(imgRef.current.files[0])
        setImage(imgRef.current.files[0])
    }

    return (
        <div>
            <input
                ref = {imgRef} 
                type="file" 
                id="upload" 
                accept='image/*' 
                onChange={handleChangeImage} 
            /><br/>
            <button onClick={doOCRTextract}>doOCR</button><br/>
            <button onClick={doOCRTessaract}>doOCRTessaract</button><br/>
            {
                image && 
                <img
                    src = {URL.createObjectURL(image)}
                    style={{
                        width:500,
                        height:500
                    }}
                />
            }
            <br/>
            {text && <div>{text}</div>}
        </div>
  )
}

export default OCR