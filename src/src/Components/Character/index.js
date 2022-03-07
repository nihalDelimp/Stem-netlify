import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { getModuleData } from '../../Redux/action/App'
import { getCharactersIntro, setCharacter } from '../../Redux/action/Student'
import CharacterInfo from './CharacterInfo'
import CharacterSlider from './CharacterSlider'



const Character = ( props ) => {
    const { getModuleData, character, current } = props

    const activeChar = character.active;
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect( () => {
        getModuleData( {
            activeStep: "character",
        } )
    }, [getModuleData] )

    const handleSelecte = activeChar => {
        dispatch( {
            type: "SAVE_CHARACTER_DATA",
            payload: { selected: activeChar }
        } )
        dispatch( {
            type: "USER_ACTIVITY",
            payload: { selected: activeChar }
        } )
        dispatch( setCharacter( { character_id: activeChar.id } ) )
            .then(
                response => {
                    console.log( "response", response );
                },
                error => {
                    console.log( "responseError", error.response.data );
                }
            )
            .catch(
                error => console.log( error )
            )
        dispatch( getCharactersIntro( activeChar.id ) )
            .then(
                response => {
                    dispatch( {
                        type: "SAVE_DATA",
                        payload: { characterIntro: response.data }
                    } )
                    getModuleData( {
                        activeStep: "intro",
                        currentStepIndex: null,
                        totalStepIndex: null,
                    } )
                    history.push( `/character/intro/${current.moduleId}` )
                },
                error => {
                    console.log( "response", error.response.data );
                }
            )
            .catch(
                error => console.log( error )
            )
    }

    return (
        <div className="character">
            <div className="content">
                <h1 className="heading">Choose your character</h1>
                <div className="character--content">
                    <div className="character--slider">
                        <CharacterSlider handleSelecte={handleSelecte} />
                    </div>
                    <CharacterInfo activeChar={activeChar} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    const { current, character, data } = state.app;
    const { characterData } = state.config
    return ( {
        current,
        character,
        characterData,
        data
    } )
}

export default connect( mapStateToProps, { getModuleData } )( Character )
