import { useState } from 'react';

export default function Guns(props) {

    const path = "https://raw.githubusercontent.com/williamtorberntsson/GuessHuntGuns/master/assets/"
    const { gunslistsounds, enable } = props
    if (!enable) {
        return <div></div>
    }

    const numbers = [1, 2, 3, 4, 5];
    const gunslist = gunslistsounds.map(n => n.split(path).pop().split("/").pop().split(".")[0])

    return (
        <ul>
            {gunslist.map((gun, index) => {
                return (<li key={index}><button onClick={() => props.func(gun)}>{gun}</button></li>)
            })}
        </ul>
    )
}
