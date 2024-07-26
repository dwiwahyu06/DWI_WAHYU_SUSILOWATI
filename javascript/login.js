// Menambahkan event listener untuk memastikan bahwa script dijalankan setelah DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function () {
    // Mengambil elemen form login dan registrasi dari DOM
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Mengambil elemen tautan untuk berpindah antara form login dan registrasi
    const showLoginLink = document.getElementById('show-login');
    const showRegisterLink = document.getElementById('show-register');

    // Menambahkan event listener untuk tautan "Daftar"
    showRegisterLink.addEventListener('click', function (event) {
        event.preventDefault(); // Mencegah aksi default dari tautan
        loginForm.classList.remove('active'); // Menyembunyikan form login
        registerForm.classList.add('active'); // Menampilkan form registrasi
    });

    // Menambahkan event listener untuk tautan "Login"
    showLoginLink.addEventListener('click', function (event) {
        event.preventDefault(); // Mencegah aksi default dari tautan
        registerForm.classList.remove('active'); // Menyembunyikan form registrasi
        loginForm.classList.add('active'); // Menampilkan form login
    });

    // Secara default, menampilkan form login saat halaman dimuat
    loginForm.classList.add('active');

    // Menambahkan event listener untuk form login
    loginForm.addEventListener('submit', function (e) {
        login(e); // Memanggil fungsi login saat form login disubmit
    });

    // Menambahkan event listener untuk form registrasi
    registerForm.addEventListener('submit', function (e) {
        register(e); // Memanggil fungsi register saat form registrasi disubmit
    });
});

// Fungsi untuk menangani proses login
function login(e) {
    e.preventDefault(); // Mencegah aksi default dari form submit
    const password = document.getElementById('login-password').value; // Mengambil nilai password dari form login
    const username = document.getElementById('login-username').value; // Mengambil nilai username dari form login
    const users = JSON.parse(localStorage.getItem('users')) || {}; // Mengambil data pengguna dari localStorage, jika ada

    // Memeriksa apakah pengguna ada dan password sesuai
    if (users[username] && users[username].password === password) {
        alert('yuhuuu login berhasil nihhh'); // Menampilkan alert jika login berhasil
        window.location.href = "/html/home.html"; // Mengarahkan ke halaman home setelah login berhasil
    } else {
        alert('yahhh sepertinya username atau password nya salah'); // Menampilkan alert jika login gagal
        document.getElementById('login-password').value = ''; // Mengosongkan field password
        document.getElementById('login-username').value = ''; // Mengosongkan field username
    }
}

// Fungsi untuk menangani proses registrasi
function register(e) {
    e.preventDefault(); // Mencegah aksi default dari form submit
    const username = document.getElementById('register-username').value; // Mengambil nilai username dari form registrasi
    const password = document.getElementById('register-password').value; // Mengambil nilai password dari form registrasi
    const email = document.getElementById('register-email').value; // Mengambil nilai email dari form registrasi

    const users = JSON.parse(localStorage.getItem('users')) || {}; // Mengambil data pengguna dari localStorage, jika ada

    // Memeriksa apakah username sudah ada
    if (users[username]) {
        alert('ow ow sepertinya username ini sudah ada'); // Menampilkan alert jika username sudah ada
    } else {
        // Menyimpan data pengguna baru ke localStorage
        users[username] = { password, email };
        localStorage.setItem('users', JSON.stringify(users)); // Menyimpan data pengguna yang diperbarui ke localStorage
        alert('yuhuuu sudah terdaftar '); // Menampilkan alert jika registrasi berhasil
        document.getElementById('register-form').classList.remove('active'); // Menyembunyikan form registrasi
        document.getElementById('login-form').classList.add('active'); // Menampilkan form login
    }
}
