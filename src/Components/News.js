import React from 'react';
import NewsPage from './NewsPage';

class News extends React.Component {
    render() {
        return (
            <NewsPage
                title = "Hacker News Submissions"
                data_endpoint = "/submissions?type="
            />
        );
    }
}

export default News;