import { useEffect, useState } from "react";
import axios from "axios";
import SearchForm from "./components/SearchForm/SearchForm";
import ArticleList from "./components/ArticleList/ArticleList";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://hn.algolia.com/api/v1/search?query=react"
        );
        setArticles(response.data.hits);
        // console.log(response.data.hits);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const handleSearch = async (topic) => {
    try {
      setArticles([]);
      setError(false);
      setLoading(true);
      const response = await axios.get();
      const data = await fetchArticleWithTopic(topic);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Latest articles</h1>
      {articles.length > 0 && <ArticleList items={articles} />}

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
