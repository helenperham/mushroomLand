import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatedMushroom from "./CreatedMushroom";
import html2canvas from "html2canvas";
import MushroomCard from './MushroomCard'


function Kingdom({ mushrooms, setMushrooms, cartItems, setCartItems }) {

    const [backgroundImg, setBackgroundImg] = useState('./src/assets/kingdomImg.jpg')
    const [welcomeMsg, setWelcomeMsg] = useState("Mushroom Kingdom")




    const downloadImg = () => {
        const kingdom = document.getElementById('kingdom')
        html2canvas(kingdom).then((canvas) => {
            const kingdomImage = canvas.toDataURL("image/png")
            console.log(kingdomImage)
            var anchor = document.createElement('a')
            anchor.setAttribute('href', kingdomImage)
            anchor.setAttribute('download', 'MushroomPhoto.png')
            anchor.click()
            anchor.remove()
        })
    }

    useEffect(() => {
        const request = async () => {
            const req = await fetch("http://localhost:3000/mushrooms")
            const res = await req.json()

            setMushrooms(res)
        }
        request()
    }, [])


    const navigate = useNavigate()
    const handleAbduct = (mushroom) => {
        setCartItems([...cartItems, mushroom])
        navigate('/Cart')
    }


    return (
        <div>
            <h1>Welcome to {welcomeMsg}!</h1>
            <div style={{ display: 'flex', gap: '1em', justifyContent: 'center' }}>
                <button onClick={() => { setBackgroundImg('./src/assets/kingdomImg.jpg'); setWelcomeMsg("Mushroom Kingdom") }}>Mushroom Kingdom</button>
                <button onClick={() => { setBackgroundImg('./src/assets/northpole.jpg'); setWelcomeMsg("the North Pole") }}>North Pole</button>
                <button onClick={() => { setBackgroundImg('./src/assets/mountrushmore.jpg'); setWelcomeMsg("Mount Rushmore") }}>Mount Rushmore</button>
            </div>
            <div id='kingdom' style={{ padding: '0px' }}>
                <div style={{ display: 'flex' }}>
                    {
                        mushrooms.map((mushroom) => {
                            return (
                                < CreatedMushroom mushroom={mushroom} />
                            )
                        })
                    }
                </div>
                <img src={backgroundImg} style={{ zIndex: 0, height: 'auto', width: '100%' }} />
            </div>
            <button onClick={() => { downloadImg() }}> Take a Photo</button>
            <div style={{ display: 'flex', gap: '12em', justifyContent: 'center' }}>
                {
                    mushrooms.map((mushroom) => {
                        return (
                            <MushroomCard mushroom={mushroom} setMushrooms={setMushrooms} cartItems={cartItems} setCartItems={setCartItems} handleAbduct={handleAbduct} />
                        )
                    })
                }
            </div>
        </div>
    );
}



export default Kingdom;