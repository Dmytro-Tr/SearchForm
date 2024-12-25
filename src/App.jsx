import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import SearchForm from "./components/SearchForm/SearchForm";
import ArticleList from "./components/ArticleList/ArticleList";
import fetchArticlesWithTopic from "./api/articles-api";
import Player from "./components/Player/Player";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (topic) => {
    try {
      setArticles([]);
      setError(false);
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Player source="http://media.w3.org/2010/05/sintel/trailer.mp4" />
      <h1>Latest articles</h1>

      <SearchForm onSearch={handleSearch} />
      {loading && <p style={{ fontSize: 20 }}>Loading data, please wait...</p>}
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};

export default App;
