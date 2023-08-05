import React from 'react';


const Picture = () => {
    return (
        <>
        <div className="overflow-hidden rounded-lg w-16">
            <img src={require("../images/profile-picture.jpg")} alt={"Your profile pic"} className="rounded-full w-full h-16 object-cover"  />
        </div>
        </>
    );
}

const NameUsername = () => {
    return (
        <div >
        <h1 className="font-bold w-full ml-5">Lord Faarquard</h1>
        <h3 className="block ml-5">@lordoftheland</h3>
        </div>
    );
}

const Text = () => {
    return (
        <p>This is some placeholder text.</p>
    )
}

const Post = () => {
    return (
        <div className="m-auto p-10 shadow-md w-1/2 h-1/4">
            <div className="flex ">
                <Picture />
                <NameUsername />
            </div>
        
        <Text />
        </div>

    );
}

export default Post