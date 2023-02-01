import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';

export default function Email() {
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_cz8q4wm', 'template_8bpygt7', form.current, 'ANqumrED55m1tRkLV')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <form ref={form} onSubmit={sendEmail} className='flex flex-col justify-center items-center'>
            <input type="text" placeholder='Full Name' name="name" className='border-2 my-2' />
            <input type="text" placeholder='Email' name="email" className='border-2 my-2' />
            <input type="text" placeholder='Subject' name="subject" className='border-2 my-2' />
            <textarea type="text" className='border-2 my-2' name="message" />
            <button type="submit" className='border-2 my-2'>Send</button>
        </form >
    )
}
