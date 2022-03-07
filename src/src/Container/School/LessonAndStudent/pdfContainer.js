import React from 'react';

export default (props) => {
    const bodyRef = React.createRef();
    const createPdf = () => props.createPdf(bodyRef.current);

    const  toUpperCaseName = (name) =>{
        const upperName = name && name.charAt(0).toUpperCase() + name.slice(1)
         return upperName
      }
      
    return (
            <>
            <div className="grid">
                <div className="grid---">
                    <div className="student--name-panels">
                        <div className="student--name_details">
                            <h3>{toUpperCaseName(props.StudentName)}</h3>
                        </div>
                        <div className="student--name_details-download">
                            <img onClick={createPdf} src={require("../../../assets/images/download-icon.svg").default}></img>
                            <img src={require("../../../assets/images/3dotsdark.svg").default}></img>
                        </div>
                    </div>
                </div>
            </div>
            <section ref={bodyRef}>
                {props.children}
            </section>
        </>
    )
}


