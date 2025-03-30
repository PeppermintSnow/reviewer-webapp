import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { readLocal } from '../utils.jsx';
import { JsonDataContext } from '../App.jsx';

export default function Study() {
    const navigate = useNavigate();
    const [listData, setListData] = useState([]);
    const { jsonData, setJsonData } = useContext(JsonDataContext);
    useEffect(() => {
        const fetchSets = async () => {
            try {
                const res = await fetch("https://api.github.com/repos/PeppermintSnow/budgetPlanner-web/contents/");
                const json = await res.json(); // Get the JSON data from the response
                setListData(json); // Set the fetched data to the state
            } catch (error) {
                console.log("Error fetching data:", error); // Log any errors
            }
        };
        
        fetchSets()
    }, []);

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
    return (
        <div className="flex flex-col items-center justify-center m-5 p-5">
            <input type="file" id="file-input" className="hidden" accept="application/json" onChange={() => handleChange()}/>
            <button className="btn" onClick={() => handleUpload()}> Upload
            </button>
            <div className="grid-cols-3"></div>
            {listData.map((el, index) => {
                return (
                    <div key={index} className="w-1/3 col-auto">
                        {el.name}
                    </div>
                );
            })}
        </div>  
    );
}
