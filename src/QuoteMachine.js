import "./quoteMachine.css";
import { Component } from "react";
import $ from "jquery";
import React from "react";
import { CSSTransition } from "react-transition-group";

export default class QuoteMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: {
        color: this.getColor(),
      },
      quote: null,
      author: null,
      change: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
    // this.setState((state) => {
    //   return {
    //     change: false,
    //   };
    // });
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

    return (
      <div className="wrapper" id="quote-box">
        <div style={this.state.color} className="box">
          <CSSTransition
            in={this.state.change}
            timeout={1500}
            classNames="alert"
            unmountOnExit
          >
            <div id="quote">{this.state.quote}</div>
          </CSSTransition>

          <div id="author">{this.state.author}</div>

          <div className="buttons">
            <a href="#" id="tweet-quote">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>

            <button
              onClick={() => {
                this.getQuote();
                this.setState((state) => {
                  return {
                    color: {
                      color: this.getColor(),
                    },
                    change: !this.state.change,
                  };
                });
                // this.setState((state) => {
                //   return {
                //     change: false,
                //   };
                // });
              }}
              style={this.state.color}
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
