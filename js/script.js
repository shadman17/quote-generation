const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const themeBtn = document.getElementById('change-theme');
// Loading Spinner Shown

function showLoadingSpin() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

// Remove Loading Spinner
function removeLoadingSpin() {
  if (loader.hidden === false) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  showLoadingSpin();
  // We need to use a Proxy URL to make our API call in order to avoid a CORS error
  const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //console.log(data);

    // Check if Author field is blank and replace it with 'Unknown'

    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // Dynamically reduce font size for long quotes
    if (data.quoteText.length > 20) {
      quoteText.classList.add('long-quote')
    } else {
      quoteText.classList.remove('long-quote')
    }
    quoteText.innerText = data.quoteText;

    // Stop Loading, Show Quote
    removeLoadingSpin();

  } catch (error) {
    //console.log(error);
    quoteText.innerText = `Something Went Wrong, Try Again Later`;
    authorText.innerText = '';
    //twitterBtn.hidden = true;
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

let count = 0;
const changeTheme = () => {
  const body = document.querySelector('body');
  if (count%2 == 0) {
    body.style.background = 'white'
  } else {
    body.style.background = 'black'
  }
  if(body.style.backgroundColor === 'white'){
    body.style.backgroundColor = 'black';
    count++;
  }
  else{
    body.style.backgroundColor = 'white';
    count++;
  }
}


// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
themeBtn.addEventListener('click', changeTheme);

// On Load
getQuote();
