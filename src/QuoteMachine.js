import "./quoteMachine.css";
import { Component } from "react";
import $ from "jquery";
import React from "react";

export default class QuoteMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: {
        color: this.getColor(),
      },
      quote: this.getQuote(),
      elem: null,
      author: null,
      change: true,
    };
  }

  componentDidMount() {
    this.setState({
      elem: document.getElementById("box"),
    });
  }

  getColor() {
    return (
      "#" +
      (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
    );
  }

  getQuote() {
    const url =
      "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
    const res = $.getJSON(url, (data) => {
      this.setState({
        quote: data.quoteText,
        author: data.quoteAuthor,
      });
    });
  }

  render() {
    document.body.style.backgroundColor = this.state.color.color;
    const buttons = document.querySelectorAll("button");
    buttons.forEach((item) => {
      item.style.background = this.state.color.color;
    });

    return (
      <div className="wrapper" id="quote-box">
        <a
          className=""
          id="tweet-quote"
          title="Tweet this quote!"
          target="_top"
          href="https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=%22Eighty%20percent%20of%20success%20is%20showing%20up.%22%20Woody%20Allen"
        >
          <i className="fa fa-twitter"></i>
        </a>
        <div
          style={this.state.color}
          className="box"
          id="box"
          onAnimationEnd={() => {
            this.state.elem.classList.remove("change");
          }}
        >
          <div id="text" className="">
            {this.state.quote}
          </div>

          <div id="author">{this.state.author}</div>

          <div className="buttons">
            <div className="social">
              <button className="btn btn-social">
                <a href="" id="">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </button>
              <button className="btn btn-social">
                <a href="" id="">
                  <i className="fa fa-tumblr" aria-hidden="true"></i>
                </a>
              </button>
            </div>

            <button
              onClick={() => {
                this.getQuote();
                this.setState((state) => {
                  return {
                    color: {
                      color: this.getColor(),
                    },
                  };
                });
                this.state.elem.classList.add("change");
              }}
              id="new-quote"
            >
              New quote
            </button>
          </div>
        </div>
        <footer>
          <a className="creator">By Denis</a>
        </footer>
      </div>
    );
  }
}
