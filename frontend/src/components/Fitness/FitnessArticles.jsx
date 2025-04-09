
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components'; // If you prefer regular CSS, you can remove this and use a CSS file.

// Styled Components for the Container and Article Card
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ArticleCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

const Content = styled.div`
  padding: 16px;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Loading = styled.p`
  font-size: 18px;
  color: #007bff;
  text-align: center;
`;

const Error = styled.p`
  font-size: 16px;
  color: red;
  text-align: center;
`;

const ArticleDashboard = () => {
    const [articles, setArticles] = useState([
        {
          source : {
            id: 1
          },
          id: 1,
          url: '1',
          urlToImage: 'h',
          title: "Heloo",
          content: 'G'
        }
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch articles from API
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/articles/data'); // Replace with your API endpoint
                const jsonData = await response.json();
                // console.log(jsonData);
                if (jsonData.length > 0) {
                  setArticles(jsonData);
                }
                setLoading(false);
            } catch (err) {
                setError('Error fetching articles');
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <Loading>Loading...</Loading>;
    if (error) return <Error>{error}</Error>;

    return (
        <Container>
            {articles.map((article, index) => (
                <ArticleCard key={index} src={article.url}>
                    <Image src={article.urlToImage} alt={article.title} />
                    <Content>
                        <Title>{article.title}</Title>
                        <Description>{article.content}</Description>
                    </Content>
                </ArticleCard>
            ))}
        </Container>
    );
};

export default ArticleDashboard;
