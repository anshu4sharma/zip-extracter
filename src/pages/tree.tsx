import React from 'react';
    type Data = {
        children: Item[];
    }

    type Item = {
        name: string;
        children?: Item[];
    };

    type Props = {
        item: Item;
    };

const data: Data = {
    children: [
        {
            name: 'Components',
            children: [
                {
                    name: 'Navbar.tsx',
                },
                {
                    name: 'Header.tsx',
                },
            ],
        },
        {
            name: 'Utils',
            children: [
                {
                    name: 'Api',
                    children: [
                        {
                            name: 'Axios',
                            children: [
                                {
                                    name: "AxiosConfig.tsx"
                                }
                            ]
                        },
                        {
                            name: 'Fetch', children: [
                                {
                                    name: "FetchConfig.tsx"
                                }
                            ]
                        },
                    ],
                },
            ],
        },
        {
            name: 'Assets',
            children: [
                {
                    name: 'Images',
                    children: [
                        {
                            name: 'Svg',
                            children: [
                                {
                                    name: "logo.png"
                                },
                                {
                                    name: "sign.png"
                                }
                            ]
                        },
                    ],
                },
            ],
        },
    ],
};


const Node = ({ item }: Props) => {
    if (item.children) {
        return (
            <details className='ml-8 my-2'>
                <summary>{item.name}</summary>
                {item.children.map((child, index) => (
                    <Node key={index} item={child} />
                ))}
            </details>
        );
    } else {
        return <div className='ml-8 my-2'>{item.name}</div>;
    }
};

const Tree = () => {
    return (
        <div className="tex-center m-4">
            {data.children.map((item, index) => (
                <Node key={index} item={item} />
            ))}
        </div>
    );
};

export default Tree;
