import "./quoteMachine.css";
import $ from "jquery";

function getQuote() {
  var url =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
  $.getJSON(url, function (data) {
    console.log(data.quoteText);
  });
}

const QuoteMachine = () => {
  const color =
    "#" + (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase();

  const divStyle = {
    color: color,
  };

  getQuote();

  document.body.style.backgroundColor = color;

  // fetch("https://api.forismatic.com/api/1.0/", {
  //   headers: { "content-type": "application/x-www-form-urlencoded" },
  //   method: "GET",
  // }).then((response) => console.log(response));

  return (
    <div className="wrapper" id="quote-box">
      <div style={divStyle} className="box">
        <p id="text">Цитата</p>

        <a style={divStyle} href="#" id="tweet-quote">
          tweet
        </a>
        <button style={divStyle} id="new-quote">
          New quote
        </button>
      </div>
      <footer>
        <a className="author" id="author">
          Автор
        </a>
      </footer>
    </div>
  );
};

export default QuoteMachine;
