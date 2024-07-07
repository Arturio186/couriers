import React from 'react';
import Blue from '#assets/Blue.svg'
import Red from '#assets/Red.svg'
import Green from '#assets/Green.svg'

import classes from './MapAnnotation.module.scss';

const MapAnnotation = () => {
    return <p className={classes.annotation}>
        <span><img src={Red} /> - свободный&nbsp;</span>
        <span><img src={Green} /> - доставляется&nbsp;</span>
        <span><img src={Blue} /> - выбранный</span>
    </p>
}

export default MapAnnotation;