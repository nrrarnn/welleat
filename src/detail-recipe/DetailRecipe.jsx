

export const DetailRecipe = () => {
	return (
		<div className="p-12">
			<div className="bg-white rounded-md shadow-md">
				<div className="grid grid-cols-2">
					<div className="p-4">
						<img
							src="https://via.placeholder.com/1024"
							alt="Recipe Image"
							className="rounded-md"
						/>
					</div>
					<div className="p-4 flex flex-col">
						<h1 className="text-3xl font-bold mb-4">Nama Resep</h1>
						<div className="text-start">
							<h2 className="text-xl font-semibold mb-2">Bahan</h2>
							<ul>
								<li>1. Lorem ipsum</li>
								<li>2. Lorem ipsum</li>
								<li>3. Lorem ipsum</li>
								<li>4. Lorem ipsum</li>
								<li>5. Lorem ipsum</li>
							</ul>
							<h2 className="text-xl font-semibold mt-6 mb-2">Step</h2>
							<ol className="list-decimal list-inside">
								<li>
									Lorem ipsum dolor sit amet consectetur. Nec donec sed viverra
									et sed lacus.
								</li>
								<li>
									Lorem ipsum dolor sit amet consectetur. Auctor id nulla magna
									amet phasellus. Bibendum gravida ipsum turpis eget orci
									malesuada malesuada.
								</li>
							</ol>
						</div>
					</div>
				</div>
			</div>

			{/* Section Komentar */}
			<div className="bg-white rounded-md shadow-md mt-8 p-4">
				<h2 className="text-2xl font-semibold mb-4 text-start">Komentar</h2>

				{/* Form Komentar */}
				<form className="mb-4">
					<div className="w-96">
						<div className="relative w-full min-w-[200px]">
							<textarea
								className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
								placeholder=" "
								defaultValue={""}
							/>
							<label className="before:content-[' '] after:content-[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
								Message
							</label>
						</div>
					</div>

					<div className="mt-2 flex justify-start">
						<button className="bg-blue-500 text-white py-2 px-32 rounded-md hover:bg-blue-600">
							Tambah Komentar
						</button>
					</div>
				</form>

				{/* Daftar Komentar */}
				<div className="space-y-4 mt-8">
					<div className="flex items-start space-x-4">
						<img
							src="https://via.placeholder.com/40"
							alt="User Avatar"
							className="w-10 h-10 rounded-full"
						/>
						<div className="text-start">
							<p className="font-semibold text-gray-700">
								Antonius R Kopong Notan
							</p>
							<div className="bg-gray-100 rounded-r-xl rounded-bl-xl p-3 mt-1 max-w-xs shadow-sm">
								<p className="text-gray-800">Masakannya enakkk!!!!</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
