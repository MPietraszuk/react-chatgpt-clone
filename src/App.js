import { useState, useEffect } from "react";

const App = () => {
  const [ value, setValue ] = useState(null);
  const [ message, setMessage ] = useState(null);
  const [ previousChats, setPreviousChats ] = useState([]);
  const [ currentTitle, setCurrentTitle ] = useState(null);

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  }

  const handleClick = (uniqueTitle) => {
      setCurrentTitle(uniqueTitle);
      setMessage(null);
      setValue("");
  }

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    try {
      
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
      setMessage(data.choices[0].message);
      
    } catch(error) {
      console.error(">>>> error " + error);
    }
  }

  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats(prevChats => (
        [...prevChats, 
          {
            title: currentTitle,
            role: "user",
            content: value
          }, 
          {
            title: currentTitle,
            role: message.role,
            content: message.content
          }
        ]
      ))
    }
  }, [ value, message, currentTitle ])

  console.log(">>> previousChats: " + previousChats);

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle);
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)));

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav className="footer">
            <p className="copyright">
                <a href="https://www.markpietraszuk.com/" target="_blank" rel="noreferrer">www.MarkPietraszuk.com</a><br />
                &copy; 2023
                <script>
                    new Date().getFullYear() > 2019 &&
                        document.write('-' + new Date().getFullYear());
                </script>
                &nbsp;Peace, Love & Happiness<br />
                Made with <i className="icon ion-heart color"></i> & 
                &nbsp;<i className="icon ion-coffee color-coffee"></i> in Laguna Niguel, CA US
            </p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>TrozGPT</h1>}
        <ul className="feed">
            {currentChat?.map((chatMessage, index) => <li key={index}>
            <p className="role">{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
            </li>)}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessages}>➢</div>
          </div>
          <p className="info">
            chat GPT Mar 14 Version. Free Research Preview.
            Our goal is to make AI systems more natural and safe to interact with.
            Your feedback will help us improve.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
