const ArticleList = ({ items }) => {
  return (
    <div>
      {" "}
      <ul>
        {items.map(({ objectID, url, title }) => (
          <li key={objectID}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
