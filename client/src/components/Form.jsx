import { useState, useRef } from "react";
import Loading from "./loader/Loading";
import SideImg from "../assets/side-image.png";

function Form() {
	const [email, setEmail] = useState("");
	const [tag, setTag] = useState("");
	const [pattern, setPattern] = useState("");
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);

	const tagRef = useRef();
	const questionRef = useRef();
	const responseRef = useRef();

	const sendEntry = async (url = "", data = {}) => {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return res.json();
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(!loading);
		const data = {
			email,
			tag,
			pattern,
			response,
		};
		console.log(data);
		sendEntry("/submit", data)
			.then((res) => {
				setLoading(false);
				console.log(res);
				alert(res.message);
				tagRef.current.value = "";
				questionRef.current.value = "";
				responseRef.current.value = "";
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};
	return (
		<div className='container mx-auto'>
			<div className='flex justify-center px-6 my-12'>
				<div className='w-full xl:w-3/4 lg:w-11/12 flex'>
					<img
						src={SideImg}
						alt='robot pic'
						className='w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg'
					/>
					<div className='w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none shadow-md'>
						<h3 className='pt-4 text-2xl text-center'>ABU Chatbot!</h3>
						<form
							className='px-8 pt-6 pb-8 mb-4 bg-white rounded'
							onSubmit={handleSubmit}
						>
							<div className='mb-4 md:flex md:justify-between'>
								<div className='mb-4 md:mr-2 md:mb-0'>
									<label
										className='block mb-2 text-sm font-bold text-gray-700'
										htmlFor='Email'
									>
										Email
									</label>
									<input
										className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
										id='email'
										type='email'
										required
										placeholder='example@yourmail.com'
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className='mb-4 md:mr-2 md:mb-0'>
									<label
										className='block mb-2 text-sm font-bold text-gray-700'
										htmlFor='tag'
									>
										Tag
									</label>
									<input
										className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
										id='tag'
										type='tag'
										required
										ref={tagRef}
										placeholder='Cutoff Mark'
										onChange={(e) => setTag(e.target.value)}
									/>
								</div>
							</div>
							<div className='mb-4'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='pattern'
								>
									Question Pattern
								</label>
								<textarea
									name='pattern'
									id='pattern'
									placeholder='#What is the cutoff mark? #ABU cutoff mark? #Cutoff mark for Engineering'
									required
									ref={questionRef}
									className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									onChange={(e) => setPattern(e.target.value)}
								></textarea>
							</div>
							<div className='mb-4'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='response'
								>
									Responses
								</label>
								<textarea
									name='response'
									id='response'
									placeholder='#180 for mast Dept. #180 is the general cutoff mark...'
									required
									ref={responseRef}
									className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									onChange={(e) => setResponse(e.target.value)}
								></textarea>
							</div>
							<div className='mb-2 text-center'>
								{loading ? (
									<Loading />
								) : (
									<button
										className='w-full px-4 py-2 font-bold text-white bg-gray-500 rounded-full hover:bg-gray-700 focus:outline-none focus:shadow-outline'
										type='submit'
									>
										Submit
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Form;
