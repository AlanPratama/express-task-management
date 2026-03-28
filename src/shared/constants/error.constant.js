export const ERROR_CONSTANT = {
    DEFAULT_MSG: {
        // --- Server Errors (5xx) ---
        INTERNAL_SERVER: "Terjadi kesalahan internal pada server. Silakan coba beberapa saat lagi.",
        SERVICE_UNAVAILABLE: "Layanan saat ini tidak tersedia atau sedang dalam pemeliharaan.",

        // --- Client / Request Errors (4xx) ---
        BAD_REQUEST: "Permintaan tidak valid. Silakan periksa kembali format data yang Anda kirim.",
        VALIDATION_ERROR: "Terdapat kesalahan validasi. Pastikan semua kolom diisi dengan benar.",
        DATA_NOT_FOUND: "Data atau sumber daya yang diminta tidak ditemukan.",
        CONFLICT: "Terjadi konflik data. Data yang Anda masukkan mungkin sudah terdaftar di sistem.",
        TOO_MANY_REQUESTS: "Terlalu banyak permintaan. Silakan tunggu beberapa saat sebelum mencoba lagi.",
        REQUEST_TIMEOUT: "Waktu permintaan habis. Silakan periksa koneksi Anda dan coba lagi.",

        // --- Authentication & Authorization (401 & 403) ---
        UNAUTHORIZED: "Sesi Anda tidak valid atau telah berakhir. Silakan masuk (login) kembali.",
        FORBIDDEN: "Akses ditolak. Anda tidak memiliki izin untuk melakukan tindakan ini.",

        // --- File Upload Errors (Terkait Multer sebelumnya) ---
        FILE_TOO_LARGE: "Ukuran file terlalu besar. Silakan unggah file yang sesuai dengan batas maksimal.",
        UNSUPPORTED_MEDIA_TYPE: "Format file tidak didukung. Silakan unggah ekstensi file yang diizinkan."
    }
};