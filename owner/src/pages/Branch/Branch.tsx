import { useParams } from 'react-router-dom';

import './Branch.scss'

const Branch = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <>
            {id}
        </>
    )   
    
};

export default Branch;
