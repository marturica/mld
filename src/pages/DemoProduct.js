import React, { useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import axios from 'axios';
import Notiflix from 'notiflix';

const DemoProduct = (props) => {
    useDocTitle('MLD | Molad e Konsult - Solicitar una cotización');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [demoProducts, setDemoProducts] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        errors.products = [];
        if (checked) {
            setDemoProducts([...demoProducts, value]);
        } else {
            setDemoProducts(demoProducts.filter((e) => e !== value));
        }
    };

    const clearErrors = () => {
        setErrors([]);
    };

    const clearInput = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
    };

    function sendEmail(e) {
        e.preventDefault();
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('submitBtn').innerHTML = 'Cargando...';
        let fData = new FormData();
        fData.append('first_name', firstName);
        fData.append('last_name', lastName);
        fData.append('email', email);
        fData.append('phone_number', phone);
        fData.append('message', message);
        fData.append('products', demoProducts);

        axios({
            method: "post",
            url: process.env.REACT_APP_DEMO_REQUEST_API,
            data: fData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('submitBtn').innerHTML = 'Enviar mensaje';
                clearInput();
                Notiflix.Report.success(
                    'Éxito',
                    response.data.message,
                    'Aceptar',
                );
            })
            .catch(function (error) {
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('submitBtn').innerHTML = 'Enviar mensaje';
                const { response } = error;
                if (response.status === 500) {
                    Notiflix.Report.failure(
                        'Ocurrió un error',
                        response.data.message,
                        'Aceptar',
                    );
                }
                if (response.data.errors !== null) {
                    setErrors(response.data.errors);
                }
            });
    }

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div id='demo' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
                    <form onSubmit={sendEmail} id="demoProductForm">
                        <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                            <div className="flex">
                                <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">Solicitar una cotización</h1>
                            </div>
                            <div className="flex items-center my-4">
                                <input
                                    id="checkbox-1"
                                    type="checkbox"
                                    className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                                    value="mudanza_particular_local" onChange={handleChange}
                                />
                                <label htmlFor="checkbox-1" className="ml-3 text-lg font-medium text-gray-900">Mudanza Particular Local</label>
                            </div>
                            <div className="flex items-center my-4">
                                <input
                                    id="checkbox-2"
                                    type="checkbox"
                                    className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                                    value="mudanza_nacional" onChange={handleChange}
                                />
                                <label htmlFor="checkbox-2" className="ml-3 text-lg font-medium text-gray-900">Mudanza Nacional</label>
                            </div>
                            <div className="flex items-center my-4">
                                <input
                                    id="checkbox-3"
                                    type="checkbox"
                                    className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                                    value="mudanza_empresa" onChange={handleChange}
                                />
                                <label htmlFor="checkbox-3" className="ml-3 text-lg font-medium text-gray-900">Mudanza Empresa</label>
                            </div>
                            <div className="flex items-center my-4">
                                <input
                                    id="checkbox-4"
                                    type="checkbox"
                                    className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                                    value="materiales_embalaje" onChange={handleChange}
                                />
                                <label htmlFor="checkbox-4" className="ml-3 text-lg font-medium text-gray-900">Materiales de Embalaje</label>
                            </div>
                            {errors &&
                                <p className="text-red-500 text-sm">{errors.products}</p>
                            }
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                                <div>
                                    <input
                                        name="first_name"
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="Nombre*"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors &&
                                        <p className="text-red-500 text-sm">{errors.first_name}</p>
                                    }
                                </div>
                                <div>
                                    <input
                                        name="last_name"
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="Apellido*"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors &&
                                        <p className="text-red-500 text-sm">{errors.last_name}</p>
                                    }
                                </div>
                                <div>
                                    <input
                                        name="email"
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="email"
                                        placeholder="Email*"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors &&
                                        <p className="text-red-500 text-sm">{errors.email}</p>
                                    }
                                </div>
                                <div>
                                    <input
                                        name="phone_number"
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="number"
                                        placeholder="Teléfono*"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors &&
                                        <p className="text-red-500 text-sm">{errors.phone_number}</p>
                                    }
                                </div>
                            </div>
                            <div className="my-4">
                                <textarea
                                    name="message"
                                    placeholder="Mensaje*"
                                    className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyUp={clearErrors}
                                ></textarea>
                                {errors &&
                                    <p className="text-red-500 text-sm">{errors.message}</p>
                                }
                            </div>
                            <div className="my-2 w-1/2 lg:w-2/4">
                                <button type="submit" id="submitBtn" className="uppercase text-sm font-bold tracking-wide bg-gray-500 hover:bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                                    focus:outline-none focus:shadow-outline">
                                    Enviar Mensaje
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-6 ml-auto bg-blue-900 rounded-2xl">
                        <div className="flex flex-col text-white">
                            <h2 className="text-xl font-bold">Información de Contacto</h2>
                            <p>Teléfono: +56 988984202</p>
                            <p>Email: transportes@norembal.cl</p>
                            <p>Dirección: Bombero Nuñez 467, Providencia, Santiago de Chile</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DemoProduct;
