"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [roomId,setRoomId] = useState("");
  const router = useRouter()

  return (
    <div>
      <input type="text" placeholder="Room Name" value={roomId} onChange={(e)=>setRoomId(e.target.value)}/>

      <button onClick={()=>{
        router.push(`/room/${roomId}`)
      }}>Join Room</button>
    </div>
  );
}
