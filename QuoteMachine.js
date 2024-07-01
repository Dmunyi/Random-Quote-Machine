import React, { useState, useEffect } from 'react';

function QuoteMachine() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const response = await fetch('https://type.fit/api/quotes');
    const data = await response.json();
    setQuotes(data);
    getRandomQuote();
  };

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    setQuote(randomQuote.text);
    setAuthor(randomQuote.author);
  };

  const handleNewQuote = () => {
    getRandomQuote();
  };

  const handleTweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div id="quote-box" className="container">
      <div id="text">{quote}</div>
      <div id="author">- {author}</div>
      <button id="new-quote" onClick={handleNewQuote}>
        New Quote
      </button>
      <a id="tweet-quote" href="#" onClick={handleTweetQuote}>
        Tweet Quote
      </a>
    </div>
  );
}

export default QuoteMachine;