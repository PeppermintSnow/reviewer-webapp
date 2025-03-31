import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { JsonDataContext } from '../App.jsx';
import ReviewFinishMenu from '../components/ReviewFinishMenu.jsx';

export default function StudyReview() {
    const { url } = useParams();
    const navigate = useNavigate();
    const { jsonData, setDataContext } = useContext(JsonDataContext);
    const [shuffledData, setShuffledData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [progress, setProgress] = useState(0);
    const [finish, setFinish] = useState(false);

    const handleShuffle = () => {
        const newData = jsonData.slice(1).sort(() => Math.random() - 0.5 );
        setShuffledData(newData);
        setCurrentIndex(0);
        setFlipped(false);
    }

    useEffect(() => {
        if (jsonData === null) {
            navigate("/study");
            return;
        }
        
        handleShuffle();
    }, [jsonData])

    useEffect(() => {
        setProgress(((currentIndex + 1) / shuffledData.length) * 100)

        if (currentIndex === shuffledData.length - 1) {
            setFinish(true);
        } else {
            setFinish(false);
        }
    }, [currentIndex, shuffledData])

    if (!jsonData || !shuffledData.length) {
        return null;
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            setFlipped(false);
        }
    }
    const handleNext = () => {
        if (currentIndex < shuffledData.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setFlipped(false);
        }
    }
    const handleFlip = () => {
        setFlipped(!flipped);
    }
    const handleReturn = () => {
        navigate(`/study/${url}`);
    }
    return (
        <div className="flex flex-col items-center p-7 h-screen -mt-7">
            <div className="flex justify-between w-full my-7">
                <button className="btn" onClick={() => handleReturn()}>Return</button>
            </div>
                       <div className={`w-full md:w-1/2 p-5 rounded-t-xl transition-all ${flipped ? "bg-blue-700" : "bg-stone-600 rotate-y-180"}`}>
                <h1 className={`text-white text-center font-bold transition-all ${flipped ? "" : "rotate-y-180"}`}>Item {currentIndex + 1}</h1>
            </div>
            <div className={`flex items-center justify-center w-full md:w-1/2 h-2/3 p-7 rounded-b-xl cursor-pointer transition-all ${flipped ? "bg-stone-600" : "bg-blue-700 rotate-y-180"}`}
                onClick={() => handleFlip()}>
                {
                    flipped ?
                      <h1 className={"font-bold text-white text-3xl"} style={{backfaceVisiblity: "hidden"}}>{shuffledData[currentIndex].term}</h1>
                    : <p className="font-bold text-blue-100 rotate-y-180" style={{backfaceVisiblity: "hidden"}}>{shuffledData[currentIndex].definition}</p>
                }
            </div>
            <div className="flex justify-around w-1/2 mt-7">
                <button className="btn" onClick={() => handlePrev()}>Prev</button>
                <button className="btn" onClick={() => handleShuffle()}>Shuffle</button>
                <button className="btn" onClick={() => handleNext()}>Next</button>
            </div>

            <div className="w-full flex flex-col justify-center items-center m-5">
                <div className="flex justify-between w-3/4">
                    <p className="-mb-5 text-white font-bold">Progress</p>
                    <p className="-mb-5 text-blue-500 font-bold">{progress}%</p>
                </div>
                <div className="w-3/4 bg-gray-700 rounded-full h-2.5 m-5">
                    <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{"width": `${progress}%`}}></div>
                </div>
            </div>
            { finish ? <ReviewFinishMenu shuffle={handleShuffle} /> : " "}
        </div>
    );
}
