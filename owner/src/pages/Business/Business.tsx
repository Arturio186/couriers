import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import './Business.scss'

const Business = () => {
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        document.title = "HELLO"

        return () => {
            document.title = 'Heh';
        };
    }, [])
    
    return (
        <div>
            <h1>Информация о бизнесе</h1>
            <p>ID бизнеса: {id}</p>
        </div>
    );
};

export default Business;
