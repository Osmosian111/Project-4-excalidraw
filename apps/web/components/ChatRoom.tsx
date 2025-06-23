import axios from "axios";
import { BACKEND_URL } from "../app/config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId:string){
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`)
    return response.data.msg;
}

export async function ChatRoom({ id }: { id: string }) {
    const message = await getChats(id);

    return <ChatRoomClient id={id} messages={message}></ChatRoomClient>
    
}

