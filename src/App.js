import React,  {useEffect , useState} from 'react';
import News from './components/News';
import './App.css';

function App() {
 const [newses , setNewses] = useState([]);
 const [search , setSearch] = useState("");
 const [query , setQuery] = useState("bitcoin");

  useEffect(()=> {
    getNews();
  },[query])
  const getNews = async () => {
    const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
    const data = await response.json();
    setNewses(data.hits);
  }
  const updateSearch = e => {
    setSearch(e.target.value);
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  return (
    <div className="App">
      <form className='search-form' onSubmit={getSearch}>
        <input className="search-bar"
        type= "text"
        value={search}
        onChange={updateSearch} 
        />
        <button className="search-button" type="submit"
        >search</button>
      </form>
      {newses.map(news => (
        <News 
          key={news.story_id}
          title={news.title}
          url={news.url}
          author={news.author}
          // date = {new Intl.DateTimeFormat('en-Us' ,{year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(items.created_at_i)}
          />
      ))};
    </div>
  );
}

export default App;