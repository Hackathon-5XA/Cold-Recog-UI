import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import '../styles/AnimationComponent.css';

const AnimationComponent = () => {
    return (
        <div className="container">
            <span></span>
            <div className="center">
                <div className="wrap">
                    <div className="box-1 box">
                        <FontAwesomeIcon icon={faPerson} className="icon-person" />
                        <FontAwesomeIcon icon={faPerson} className="icon-person" />
                    </div>
                    <div className="box-2 box">
                        <FontAwesomeIcon icon={faPerson} className="icon-person" />
                        <FontAwesomeIcon icon={faPerson} className="icon-person" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimationComponent;
