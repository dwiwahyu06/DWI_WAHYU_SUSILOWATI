// Fungsi asinkron untuk mengambil berita dan menampilkannya di halaman
const get = async () => {
    try {
        // Mengambil data berita dari API untuk kategori "travel"
        const response = await fetch("https://api-berita-indonesia.vercel.app/tempo/travel");
        
        // Memeriksa apakah respons dari API tidak berhasil (status bukan 2xx)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Mengonversi respons API ke format JSON
        const result = await response.json();
        
        // Menampilkan data yang diterima di konsol (untuk debugging)
        console.log(result.data.posts);
        
        // Mengambil elemen container berita dari DOM
        const newsContainer = document.getElementById('news-content');
        
        // Mengiterasi daftar berita dan menampilkan setiap berita
        result.data.posts.slice(0, 21).map((article) => {
            // Membuat elemen div untuk kotak berita
            const box = document.createElement("div");
            box.classList.add("box");

            // Membuat elemen gambar dan mengatur sumber gambar
            const image = document.createElement("img");
            image.src = article.thumbnail;
            image.classList.add("images");

            // Membuat elemen div untuk konten berita
            const content = document.createElement("div");
            content.classList.add("content");

            // Membuat elemen judul berita
            const title = document.createElement("h2");
            title.textContent = article.title;

            // Membuat elemen deskripsi berita
            const deskripsi = document.createElement("p");
            deskripsi.textContent = article.deskripsi;

            // Membuat elemen tautan untuk berita selengkapnya
            const link = document.createElement("a");
            link.href = article.link;
            link.textContent = "lihat selengkapnya";

            // Menambahkan elemen gambar, judul, deskripsi, dan tautan ke dalam kotak berita
            box.appendChild(image);
            box.appendChild(title);
            box.appendChild(link);
            box.appendChild(deskripsi);
            box.appendChild(content);

            // Menambahkan kotak berita ke container berita di halaman
            newsContainer.appendChild(box);
        });
    } catch (error) {
        // Menangani kesalahan saat pengambilan data
        console.error('Error fetching news:', error);
        
        // Membuat elemen untuk menampilkan pesan kesalahan
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to load news. Please try again later.';
        
        // Mengambil elemen container berita dan menambahkan pesan kesalahan
        const newsContainer = document.getElementById('news-content');
        newsContainer.appendChild(errorMessage);
    }
}

// Memanggil fungsi untuk mengambil data berita saat halaman dimuat
get();
