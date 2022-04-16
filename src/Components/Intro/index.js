import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getModuleData } from '../../Redux/action/App'
import { useHistory } from 'react-router'
import { getStudentCharacter } from '../../Redux/action/Student'
import IsLoadingHOC from '../IsLoadingHOC'
import IsloggedinHOC from '../IsLoggedinHOC'

const Intro = ( props ) => {
    const { getModuleData, characterDetail, data, current } = props;
    const { moduleIntro, characterIntro } = data;

    const { currentStepIndex, moduleId, selected } = current;

    const [currentIntro, setCurrentIntro] = useState( !currentStepIndex ? 0 : currentStepIndex );
    const history = useHistory();

    const [introData] = useState( !selected ? moduleIntro : characterIntro )


    useEffect( () => {
        getModuleData( {
            totalStepIndex: introData ? introData.length - 1 : 0,
            activeStep: "intro",
        } )
    }, [getModuleData, introData] )

    const handlerContinue = () => {
        const index = ( introData.length - 1 )
        if ( currentIntro !== index ) {
            setCurrentIntro( currentIntro + 1 )
            getModuleData( {
                currentStepIndex: currentIntro + 1,
            } )
        }
        else if ( selected ) {
            getModuleData( {
                activeStep: "quiz-video",
                currentStepIndex: 0,
            } )
            history.push( `/quiz/${moduleId}` )
        } else {
            getModuleData( {
                activeStep: "character",
            } )
            history.push( `/character/${moduleId}` )
        }
    }


    return (
        <div className="intro">
            {characterDetail && selected && (
                <div className="character--name">
                    <h1>{characterDetail.character_name}</h1>
                </div>
            )}
            <div className="content">
                <p
                    style={characterDetail && { fontFamily: "'Righteous', cursive" }}
                >
                    {introData[!currentStepIndex ? 0 : currentStepIndex].content}
                    {introData[!currentStepIndex ? 0 : currentStepIndex].char_desc}
                </p>
            </div>
            <div className="btn--group">
                <button className="btn btn--secondary" onClick={handlerContinue}>Continue</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    const { current, data } = state.app;
    return {
        current,
        data
    }
}

export default connect( mapStateToProps, {
    getModuleData,
    getStudentCharacter
} )(IsLoadingHOC(IsloggedinHOC(Intro )))
