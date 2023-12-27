import React from 'react';

const Loading = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <span className="loading loading-infinity h-16 w-16 text-warning"></span>
        </div>
    );
};

export default Loading;