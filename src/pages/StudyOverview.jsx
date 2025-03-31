import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { JsonDataContext } from '../App.jsx';

export default function StudyOverview() {
    const { url } = useParams();
    const navigate = useNavigate();
    const { jsonData, setJsonData } = useContext(JsonDataContext);

    useEffect(() => {
        if (jsonData === null) {
            navigate("/study");
        }
    })

    if (jsonData === null) {
        return;
    }

    return (
        <div className="m-5">
            <div className="flex flex-col p-5 bg-stone-700 rounded-xl">
                <div className="flex flex-around w-full">
                    <Link to="/study" className="btn -mt-3 mb-2">Back</Link>
                    <p className="text-center font-bold text-blue-200 text-xs mb-5 mx-auto">{url}</p>
                </div>
            {jsonData.map((el, index) => {
                if (index) {
                    return (
                        <div key={index} className="flex group hover:-translate-y-2 transition-transform">
                            <div className="bg-stone-800 ring-3 ring-blue-800 w-1/3 rounded-l-xl p-5 my-3 group-hover:ring-blue-500 transition-all">
                                <h1 className="text-white font-bold text-center">{el.term}</h1>
                            </div>
                            <div className="bg-blue-800 group-hover:bg-blue-500 transition-colors p-5 my-2 rounded-r-xl w-2/3 flex items-center">
                                <p className="text-blue-100 group-hover:text-white transition-colors font-medium">{el.definition}</p>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className="flex flex-col">
                            <div className="bg-blue-800 p-5 -mx-5 flex flex-col justify-center mb-7">
                                <h1 className="text-white text-3xl font-bold w-full mt-5">{el.title}</h1>
                                <p className="text-blue-200 font-bold ">by {el.author}</p>
                                <div className="my-5 flex gap-3">
                                    <Link to="review" className="btn">Review</Link>
                                    <Link to="#" className="btn">Assess</Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
            </div>
        </div>
    );
}
