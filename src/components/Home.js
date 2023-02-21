import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Home = (props) => {

    const [enteredName, setEnteredName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPhone, setEnteredPhone] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log("change");
            setFormIsValid(
                enteredName.trim().length > 0 && enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredPhone.trim().length === 10
            );
        }, 200);
        return (() => {
            console.log("cleanup");
            clearTimeout(identifier);
        })
    }, [enteredName, enteredEmail, enteredPassword, enteredPhone]);

    const handleName = (event) => {
        setEnteredName(event.target.value);
    }

    const handleEmail = (event) => {
        setEnteredEmail(event.target.value);
    };

    const handlePhone = (event) => {
        setEnteredPhone(event.target.value);
    }

    const handlePassword = (event) => {
        setEnteredPassword(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            name: enteredName,
            email: enteredEmail,
            phone: enteredPhone
        }
        props.onSignUp(userData);
        history.push("/navigation")
    }

    return (
        <div className="antialiased text-gray-900 px-6">
            <div className="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
                <div className="py-12">
                    <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                    <div className="mt-8 my-0 mx-auto max-w-md">
                        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                            <label className="block text-left">
                                <span className="text-gray-700 ml-2">Full name</span>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                    value={enteredName}
                                    onChange={handleName}
                                    placeholder="Your Name"
                                />
                            </label>
                            <label className="block text-left">
                                <span className="text-gray-700 ml-2">Email address</span>
                                <input
                                    type="email"
                                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
                                    value={enteredEmail}
                                    onChange={handleEmail}
                                    placeholder="abc@example.com"
                                />
                            </label>
                            <label className="block text-left">
                                <span className="text-gray-700 ml-2">Phone</span>
                                <input
                                    type="number"
                                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 "
                                    value={enteredPhone}
                                    onChange={handlePhone}
                                    placeholder="Enter your 10 digit phone number"
                                />
                            </label>
                            <label className="block text-left">
                                <span className="text-gray-700 ml-2">Password</span>
                                <input
                                    type="password"
                                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                    value={enteredPassword}
                                    onChange={handlePassword}
                                    placeholder="Atleast six characters long"
                                />
                            </label>
                            <button className="text-white border-solid rounded border-blue-400 bg-blue-500 outline outline-offset-2 outline-2 w-24 disabled:text-blue-300 disabled:bg-blue-100 disabled:outline-none" disabled={!formIsValid}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;