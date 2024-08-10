import { useState } from "react";

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null); 

    const faqs = [
        {
            question: "Apa itu Welleat?",
            answer: "Welleat adalah platform yang menyediakan berbagai resep masakan yang mudah diakses dan diikuti. Pengguna dapat menemukan resep berdasarkan kategori, memberikan komentar, dan menyimpan resep favorit mereka."
        },
        {
            question: "Bagaimana cara mendaftar di Welleat?",
            answer: "Anda dapat mendaftar dengan mengklik tombol 'Daftar' di halaman utama dan mengisi formulir pendaftaran dengan informasi yang diperlukan, seperti nama, email, dan kata sandi."
        },
        {
            question: "Apakah saya perlu membayar untuk menggunakan Welleat?",
            answer: "Welleat adalah platform gratis. Anda dapat mengakses semua resep dan fitur tanpa biaya."
        },
        {
            question: "Bagaimana cara menambahkan resep ke favorit saya?",
            answer: "Setelah Anda menemukan resep yang Anda suka, klik tombol 'Tambahkan ke Favorit' di halaman resep. Resep tersebut akan disimpan di halaman favorit Anda untuk akses mudah di masa mendatang."
        },
        {
            question: "Bagaimana cara memberikan komentar pada resep?",
            answer: "Untuk memberikan komentar, buka halaman resep yang ingin Anda komentari, gulir ke bagian komentar, masukkan komentar Anda di kolom yang disediakan, dan klik 'Kirim'."
        },
        {
            question: "Bagaimana cara menghapus akun saya?",
            answer: "Jika Anda ingin menghapus akun Anda, silakan hubungi tim dukungan pelanggan kami melalui halaman kontak, dan kami akan membantu Anda dengan proses penghapusan akun."
        },
        {
            question: "Apakah data saya aman di Welleat?",
            answer: "Kami menghargai privasi Anda dan mengambil langkah-langkah untuk melindungi data pribadi Anda. Informasi Anda disimpan dengan aman dan tidak akan dibagikan kepada pihak ketiga tanpa izin Anda."
        },
        {
            question: "Apakah ada aplikasi mobile untuk Welleat?",
            answer: "Saat ini, Welleat hanya tersedia sebagai website. Namun, kami sedang mempertimbangkan untuk mengembangkan aplikasi mobile di masa depan."
        }
       
    ];

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index); 
    };

    return (
        <section className="py-10 bg-gray-50 sm:py-16 lg:py-24 font-poppins">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-xl font-bold leading-tight text-slate-800 sm:text-4xl lg:text-5xl">
                        Frequently Asked Questions
                    </h2>
                    <h3 className="text-slate-700 mt-3 font-medium">Beberapa pertanyaan yang dapat membantu kamu</h3>
                </div>
                <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16 ">
                    {faqs.map((faq, index) => (
                        <div key={index} className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 rounded-md">
                            <button
                                type="button"
                                onClick={() => toggleAnswer(index)}
                                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                            >
                                <span className="flex text-md font-semibold text-slate-800">{faq.question}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-6 h-6 text-gray-400"
                                    style={{ transform: openIndex === index ? 'rotate(0deg)' : 'rotate(-180deg)', transition: 'transform 0.2s' }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {openIndex === index && (
                                <div className="px-4 pb-5 sm:px-6 sm:pb-6 text-slate-700">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <p className="text-center text-gray-600 text-base mt-9">
                    Masih ada pertanyaan ?
                    <span className="cursor-pointer font-medium text-tertiary transition-all duration-200 hover:text-tertiary focus:text-tertiary hover-underline">Hubungi Kami</span>
                </p>
            </div>
        </section>
    );
};

export default FAQSection;