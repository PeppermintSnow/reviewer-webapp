import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { readLocal } from '../utils.jsx';
import { JsonDataContext } from '../App.jsx';

export default function Study() {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [listLoaded, setListLoaded] = useState(false);
    const [listData, setListData] = useState([]);
    const { jsonData, setJsonData } = useContext(JsonDataContext);
    useEffect(() => {
        const fetchSets = async () => {
            try {
                const res = await fetch("https://api.github.com/repos/PeppermintSnow/reviewer-webapp-files/contents/sets");
                const json = await res.json(); // Get the JSON data from the response
                setList(json); // Set the fetched data to the state
            } catch (error) {
                console.log("Error fetching data:", error); // Log any errors
            }

            setListLoaded(true);
        };        
        fetchSets();
}, []);

    useEffect(() => { 
        const fetchSetData = async () => {
            const newListData = await Promise.all(
                list.map( async (item) => {
                    try {
                        const res = await fetch(`https://api.github.com/repos/PeppermintSnow/reviewer-webapp-files/contents/sets/${item.name}`);
                        const json = await res.json();
                        const decodedData = atob(json.content);
                        return JSON.parse(decodedData);
                    } catch (error) {
                        console.log("Error fetching data:", error);
                    }
                })
            );
            setListData(newListData);
        };0
        fetchSetData();
        
    }, [listLoaded]);


    const handleUpload = () => {
        const fileInput = document.getElementById('file-input');
        fileInput.click();
    }
    const handleChange = async () => {
        const fileInput = document.getElementById("file-input").files[0];
        if (fileInput.type !== "application/json") {
            alert("Invalid file type!")
        } else {
            try {
                setJsonData(await readLocal(fileInput));
                navigate("custom")
            } catch (error) {
                alert("Error reading file!");
                console.error(error);
            }
        }
    }
    const handleSelect = (index) => {
        setJsonData(listData[index]);
        navigate(`${list[index].sha}`)
    }
    return (
        <div className="flex flex-col items-center justify-center m-5 p-5">
            <input type="file" id="file-input" className="hidden" accept="application/json" onChange={() => handleChange()}/>
            <button className="btn" onClick={() => handleUpload()}> Upload
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full m-5">
            {listData.map((item, index) => {
                return (
                    <div key={index} className="w-full bg-blue-700 rounded-xl p-7 group hover:-translate-y-3 transition-transform hover:bg-blue-500 transition-colors cursor-pointer" onClick={() => handleSelect(index)}>
                        <h1 className="text-white text-3xl font-bold w-full">{item[0].title}</h1>
                        <p className="text-blue-300 font-bold">By {item[0].author}</p>
                    </div>
                );
            })}
            </div>
        </div>  

    );
}
