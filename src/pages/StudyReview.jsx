import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JsonDataContext } from '../App.jsx';
import { dataIsNull } from '../utils.jsx';

export default function StudyReview() {
    const navigate = useNavigate();
    const { jsonData, setDataContext } = useContext(JsonDataContext);
    useEffect(() => {
        if (jsonData === null) {
            navigate("/study");
        }
    }, [])
    
    if (jsonData === null) {
        return;
    }

    return (
        <div>
            {jsonData.map((el, index) => {
                if (index) {
                    return (
                        <>
                            <h1>{el.term}:</h1>
                            <p>{el.definition}</p>
                        </>
                    );
                }
            }
            )}
        </div>
    );
}
