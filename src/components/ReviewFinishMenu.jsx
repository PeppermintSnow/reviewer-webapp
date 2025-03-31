import { useParams, Link } from 'react-router-dom';

export default function ReviewFinishMenu({ shuffle }) {
    const { url } = useParams();

    return (
        <div className="w-full h-screen absolute flex justify-center items-center">
            <div className="w-full flex justify-center z-50 absolute">
                <div className="flex flex-col justify-center items-center w-full m-2 md:w-1/2  lg:w-1/3">
                    <div className="bg-stone-700 flex justify-between w-full p-2 rounded-t-xl">
                        <p className="mx-auto font-bold text-white">Finish</p>
                        <p className="font-bold text-white hover:font-strong hover:text-red-600 transition-all cursor-pointer" onClick={() => shuffle()}>X</p>
                    </div>
                    <div className="bg-blue-700 flex flex-col justify-center items-center w-full p-2 rounded-b-xl ">
                        <div className="m-5">
                            <p className="text-blue-200 font-bold">You have finished the set!</p>
                        </div>
                        <div className="flex justify-around w-full">
                            <button className="btn ring-1 ring-blue-900" onClick={() => shuffle()}>Reset Progress</button>
                            <Link className="btn ring-1 ring-blue-900" to={"#"/*`/study/${url}/assess`*/}>Test your knowledge</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full absolute bg-black opacity-70 z-0" />
        </div>
    )
}
