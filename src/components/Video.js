import React, { useEffect, useState } from 'react'
import * as faceApi from "face-api.js"

//props.emotionChange: callback function
function Video(props) {
    let webcamRef = React.createRef()
    let [currentEmotion, setCurrentEmotion] = useState('')
    
    useEffect(()=>{
    
        let loadModelAndCam = async ()=>{
                faceApi.nets.tinyFaceDetector.loadFromUri('/models')
                faceApi.nets.faceExpressionNet.loadFromUri('/models')
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (webcamRef.current) {
                    webcamRef.current.srcObject = stream;
                }
            }
  
        loadModelAndCam()
        .catch(err=>console.log(err))
    })

    useEffect(()=>{
        if(props.onEmotionChange)
            props.onEmotionChange(currentEmotion)
    },[currentEmotion])

    let update = async ()=>{
        const options = new faceApi.TinyFaceDetectorOptions({
            inputSize: 512,
            scoreThreshold: 0.5
        });
        
        const result = await faceApi
        .detectSingleFace(webcamRef.current, options)
        .withFaceExpressions();
        
        if(result){
            let sortedExpressions = result.expressions.asSortedArray()
            console.log(sortedExpressions[0].expression)
            setCurrentEmotion(sortedExpressions[0].expression)
        }

        setTimeout(() => update(), 500);

    }

    return (
        <div>
            <div>video</div><br/>
            <h5>Your current emotion is {currentEmotion}</h5>
            <video
                ref={webcamRef}
                autoPlay
                onPlay={update}
                muted
            />
        </div>
        
    )
}

export default Video