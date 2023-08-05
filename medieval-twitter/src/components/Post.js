import React from 'react';


export const Picture = () => {
    return (
        <>
        <div className="overflow-hidden rounded-lg w-16">
            <img src={require("../images/profile-picture.jpg")} alt={"Your profile pic"} className="rounded-full w-full h-16 object-cover"  />
        </div>
        </>
    );
}

export const NameUsername = () => {
    return (
        <div >
        <h1 className="font-bold w-full ml-5">Lord Faarquard</h1>
        <h3 className="block ml-5">@lordoftheland</h3>
        </div>
    );
}

export const TextBody = () => {
    return (
        <p>This is some placeholder text. May the King live for a long time and have lots of good things. Our Father in Heaven, Hallowed be thy name. thy
            Kingdom come, thy will be done in Earth as it is in Heaven. Give us today our daily bread
        </p>
    )
}

export const Post = () => {
    return (
        <div className="m-auto p-10 shadow-md w-1/2 h-1/4">
            <div className="flex ">
                <div className="mb-5">
                <Picture />
                </div>
                <NameUsername />
            </div>
        
        <TextBody />
        </div>

    );
}
