// Fungsi utama untuk mengambil berita kecantikan dan menampilkannya di halaman
const get = async () => {
    try {
        // Mengambil data berita kecantikan dari API
        const response = await fetch("https://api-berita-indonesia.vercel.app/tempo/cantik/");
        
        // Memeriksa apakah respons dari server adalah OK
        if (!response.ok) {
            // Jika tidak OK, lemparkan error dengan status respons
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Mengonversi respons dari format JSON menjadi objek JavaScript
        const result = await response.json();
        
        // Menampilkan data berita di konsol (untuk debugging)
        console.log(result.data.posts);
        
        // Mengambil elemen dengan ID 'news-content' dari DOM
        const newsContainer = document.getElementById('news-content');
        
        // Mengambil hanya 21 berita pertama dari data
        result.data.posts.slice(0, 21).map((article) => {
            // Membuat elemen div untuk setiap berita
            const box = document.createElement("div");
            box.classList.add("box"); // Menambahkan class 'box' untuk styling
            
            // Membuat elemen gambar dan menambahkan thumbnail berita
            const image = document.createElement("img");
            image.src = article.thumbnail;
            image.classList.add("images"); // Menambahkan class 'mages' untuk styling
            
            // Membuat elemen div untuk konten berita
            const content = document.createElement("div");
            content.classList.add("content"); // Menambahkan class 'content' untuk styling
            
            // Membuat elemen h2 untuk judul berita
            const title = document.createElement("h2");
            title.textContent = article.title;
            
            // Membuat elemen paragraf untuk deskripsi berita
            const deskripsi = document.createElement("p");
            deskripsi.textContent = article.deskripsi;
            
            // Membuat elemen tautan untuk link berita
            const link = document.createElement("a");
            link.href = article.link;
            link.textContent = "lihat selengkapnya"; // Teks tautan
            
            // Menyusun elemen berita
            box.appendChild(image); // Menambahkan gambar
            box.appendChild(title); // Menambahkan judul
            box.appendChild(deskripsi); // Menambahkan deskripsi
            box.appendChild(link); // Menambahkan link
            
            // Menambahkan elemen box berita ke dalam kontainer berita
            newsContainer.appendChild(box);
        });

    } catch (error) {
        // Menangani kesalahan jika terjadi error saat fetch atau memproses data
        console.error('Error fetching news:', error);
        
        // Mengambil elemen dengan ID 'news-content' dari DOM
        const newsContainer = document.getElementById('news-content');
        
        // Membuat elemen paragraf untuk pesan kesalahan
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Gagal memuat berita. Silakan coba lagi nanti.";
        errorMessage.style.color = "red"; // Memberi warna merah pada pesan kesalahan
        
        // Menambahkan elemen pesan kesalahan ke dalam kontainer berita
        newsContainer.appendChild(errorMessage);
    }
}

// Memanggil fungsi get untuk mengambil berita kecantikan dan menampilkannya saat halaman dimuat
get();
