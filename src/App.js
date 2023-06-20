const App = () => {
  return (
    <div className="app">
      <section className="side-bar">
        <button>+ New Chat</button>
        <ul className="history">
          <li>Yoo, Whuzz Upp?</li>
          <li>Not much around here</li>
          <li>hey wait, Happy Fathers Day!!!!!</li>
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
        <h1>TrozGPT</h1>
        <ul className="feed">

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input />
            <div id="submit">➢</div>
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
