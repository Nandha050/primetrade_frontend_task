import React from 'react';

const Skeleton = ({ height, width, count = 1, className = '', style = {} }) => {
    const skeletons = Array(count).fill(0);

    return (
        <>
            {skeletons.map((_, index) => (
                <div
                    key={index}
                    className={`skeleton rounded-md ${className}`}
                    style={{
                        height: height || '100%',
                        width: width || '100%',
                        marginBottom: count > 1 ? '8px' : '0',
                        ...style
                    }}
                />
            ))}
        </>
    );
};

export default Skeleton;
