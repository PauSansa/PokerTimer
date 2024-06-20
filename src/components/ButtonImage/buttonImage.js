import Image from "next/image";
import mutedIcon from "./icons/muted-icon.svg"
import ttsIcon from "./icons/tts-icon.svg"
import alarmIcon from "./icons/alarm-icon.svg"
//import { announcesModes } from "@/lib/announce";

const announcesModes =
    [
        {
            index:0,
            mode:'tts'
        },
        {
            index:1,
            mode:'alarm'
        },{
            index:2,
            mode:'muted'
        },
    ]



export default function ButtonImage( { announce, setAnnounce } ) {
    function handleClick() {
        switch(announce) {
            case 'tts':
                setAnnounce("alarm")
                break
            case 'alarm':
                setAnnounce("muted")
                break
            case 'muted':
                setAnnounce("tts")
                break
        }
    }
    var icon
    switch(announce) {
        case 'tts':
            icon = ttsIcon
            break
        case 'alarm':
            icon = alarmIcon
            break
        case 'muted':
            icon = mutedIcon
            break
    }
    return (
    <button
    className="bg-secondary p-2 rounded-md absolute right-1 hover:opacity-85 cursor-pointer"
    onClick={handleClick}
    >
        <Image 
        src={icon} 
        alt="Voice Mode Icon" 
        width={30} 
        height={30}
        />
    </button>
    )
}