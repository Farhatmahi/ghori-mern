import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TopNewsCard from './TopNewsCard';


const TopNews = () => {

    const {data : news = []} = useQuery({
        queryKey : ['news'],
        queryFn : async() => {
            const res = await fetch('http://localhost:2000/news')
            const data = await res.json()
            return data
        }
    })

    return (
        <div>
            <h1 className="text-5xl mb-8">Top News</h1>
            <div className="grid grid-cols-3">
                {news.map(n => <TopNewsCard key={n._id} n={n} />)}
            </div>
        </div>
    );
};

export default TopNews;