import { useState, useContext } from "react";
import { EventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const { setEvent } = useContext(EventContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    type: "",
    date: "",
  });

  const handleCreate = () => {
    setEvent(form);
    navigate("/attendance");
  };

  return (
    <div className="page">
      <h2>Create Event</h2>

      <input placeholder="Event Name"
        onChange={(e)=>setForm({...form,name:e.target.value})}/>

      <input placeholder="Event Type"
        onChange={(e)=>setForm({...form,type:e.target.value})}/>

      <input type="date"
        onChange={(e)=>setForm({...form,date:e.target.value})}/>

      <button onClick={handleCreate}>Create Event</button>
    </div>
  );
}
