import { useState, useEffect } from 'react'

export default function Create() {
    const [ cardCount, setCardCount ] = useState(1);
    const [ cards, setCards ] = useState([{"title": "", "author": ""}, {"term": "", "definition": ""}]);

    const handleAdd = () => {
        const newCards = cards;
        console.log(newCards)
        newCards.push({"term": "", "definition": ""});
        setCards(newCards);
        setCardCount(cardCount + 1);
        console.log(cardCount);
    }
    const handleSubtract = () => {
        if (cardCount <= 1) {
            alert("Card count can not be less than 1!");
        } else {
            const newCards = cards;
            newCards.pop();
            setCards(newCards);
            setCardCount(cardCount - 1);
        }
    }
    const handleExport = () => {
        console.log(cards)
        const json = JSON.stringify(cards, null, 2);
        const blob = new Blob([json], { type: 'application/json' })
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${cards[0].title}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    const handleInput = (e, index, type) => {
        const newCards = cards;
        newCards[index][type] = e.target.value;
        setCards(newCards);
    }
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="bg-stone-700 p-3 rounded-t-xl w-full">
                <p className="text-blue-100 text-sm font-bold">Set details</p>
            </div>
            <div className="flex flex-col md:flex-row w-full p-3 bg-blue-800 gap-3 rounded-b-xl">
                <div className="w-full md:w-2/3">
                    <input type="text"
                        placeholder="Set Title"
                        className="bg-blue-950 rounded-xl text-white p-2 text-xl w-full"
                        onChange={(e) => handleInput(e, 0, "title")}
                    />
                    <p className="hidden md:block mx-2 text-blue-300 text-sm">Title</p>
                </div>
                <div className="w-full md:w-1/3">
                    <input type="text"
                        placeholder="Author"
                        className="bg-blue-950 rounded-xl text-white p-2 text-xl w-full"
                        onChange={(e) => handleInput(e, 0, "author")}
                    />
                    <p className="hidden md:block mx-2 text-blue-300 text-sm">Author</p>
                </div>
            </div>
            <div className="flex justify-between w-full m-7">
                <button className="btn">Reset</button>
                <button className="btn" onClick={() => handleExport()}>Export</button>
                <div className="flex gap-5">
                    <button className="btn w-10" onClick={() => handleSubtract()}>-</button> 
                    <button className="btn w-10" onClick={() => handleAdd()}>+</button>            
                </div>
            </div>
            <div className="w-full m-5">
                {Array.from({ length: cardCount }).map((_, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="bg-stone-700 p-3 rounded-t-xl">
                            <p className="text-blue-100 text-xs font-bold">Card {index + 1}</p>
                        </div>
                        <div className="bg-blue-800 p-3 rounded-b-xl flex flex-col md:flex-row justify-center gap-3 mb-7">
                            <div className="w-full md:w-1/3">
                                <input 
                                    type="text" 
                                    placeholder="Term"
                                    className="bg-blue-950 rounded-xl p-2 text-white w-full"
                                    onChange={(e) => handleInput(e, index + 1, "term")}
                                />
                                <p className="hidden md:block mx-2 text-blue-300 text-sm">Term</p>
                            </div>
                            <div className="w-full md:w-2/3">
                                <input 
                                    type="text"
                                    placeholder="Definition"
                                    className="bg-blue-950 rounded-xl p-2 text-blue-200 w-full"
                                    onChange={(e) => handleInput(e, index + 1, "definition")}
                                />
                                <p className="hidden md:block mx-2 text-blue-300 text-sm">Definition</p>
                            </div>
                        </div>
                    </div>
                ))}         
            </div>
            <div className="w-full -mt-10 mb-10 group cursor-pointer" onClick={() => handleAdd()}>
                <hr class="w-full h-px my-8 bg-gray-500 border-0 group-hover:bg-white transition-colors" />
                <p class="text-center -mt-7 text-3xl font-bold text-gray-500 group-hover:text-white transition-colors">+</p>
                <p class="text-center -mt-2 text-xl font-medium text-gray-500 group-hover:text-white transition-colors">Add card</p>
            </div>
            <div className="flex justify-between w-full">
              <button className="btn" onClick={() => handleSubtract()}>-</button> 
              <button className="btn" onClick={() => handleAdd()}>+</button> 
            </div>
        </div>
    );
}
