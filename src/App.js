// External imports
import React, { useState, useEffect } from "react"
import Dropdown from "react-dropdown"
import parse from "html-react-parser"

// Asset imports
import "./styles.css"

// Local imports
import { formatSeasons } from "./utils/formatSeasons"
import Episodes from "./components/Episodes"
import { fetchShow } from './api/fetchShow'


export default function App() {
    const [show, setShow] = useState("")
    const [seasons, setSeasons] = useState([])
    const [selectedSeason, setSelectedSeason] = useState("")
    const episodes = seasons[selectedSeason] || []

    useEffect(() => {
        fetchShow()
        .then( res => {
            console.log( res )
            setShow( res.data )
            setSeasons( formatSeasons( res.data._embedded.episodes ))
        })
        .catch( err => {
            console.log( err )
        })
    }, [])

    const handleSelect = ( e ) => {
        setSelectedSeason( e.value )
    }

    if ( !show ) { return <h2>Fetching data...</h2> }

    return (
        <div className="App">
            <img
                className="poster-img"
                src={ show.image.original }
                alt={ show.name }
            />
            <h1>{ show.name }</h1>
            { parse( show.summary ) }
            <Dropdown
                options={ Object.keys( seasons ) }
                onChange={ handleSelect }
                value={ selectedSeason || "Select a season" }
                placeholder="Select an option"
                data-testid="select-season"
            />
            <Episodes
                episodes={ episodes }
            />
        </div>
    )
}