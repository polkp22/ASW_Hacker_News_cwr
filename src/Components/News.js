import React from 'react';
import NewsPage from './NewsPage';

class News extends React.Component {
    render() {
        return (
            <NewsPage
                title = "News"
                data_endpoint = "/submissions?type=any&order=new"
            />
        );
    }
}

export default News;