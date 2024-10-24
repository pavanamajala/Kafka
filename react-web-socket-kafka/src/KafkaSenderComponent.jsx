import { useState } from 'react';
import axios from 'axios';

function KafkaSenderComponent() {

    const [message, setMessages] = useState('');

    const handleOnClick = () => {
        axios.put('http://localhost:1999/location/send', message, {
            headers: {
                'Content-Type': 'text/plain',  // Ensure Content-Type is plain text
            }
        })
            .then(response => {
                console.log('Message sent successfully:', response.data);
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    return (
        <div>
            <h1>Send Cab Locations</h1>
            <div className='form-container'>
                <input type='text' className='custom-input' onChange={(e) => { setMessages(e.target.value) }}></input>
                <button type='submit' className="custom-button" onClick={() => { handleOnClick() }}>SUBMIT</button>
            </div>
        </div>
    );
}

export default KafkaSenderComponent;
