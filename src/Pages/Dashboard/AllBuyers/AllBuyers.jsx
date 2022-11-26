import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';

const AllBuyers = () => {

    const {user} = useContext(AuthContext)

    const {} = useQuery({
        queryKey : ['all-buyers'],
        queryFn : async() => {
            const res = await fetch(`http://localhost:2000/users?role=buyer`)
        }
    })

    return (
        <div>
            <h1 className="text-3xl">All Buyers</h1>
        </div>
    );
};

export default AllBuyers;