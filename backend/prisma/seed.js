const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const diseases = [
  {
    name: "Anthracnose",
    description:
      "Penyakit jamur yang menyebabkan bintik-bintik gelap pada daun dan buah pisang",
    category: "Jamur",
    severity: "Sedang",
    symptoms: [
      "Bintik bulat gelap pada daun",
      "Lingkaran kuning di sekitar bintik",
      "Daun menguning dan rontok",
      "Buah membusuk",
    ],
    prevention: [
      "Gunakan bibit sehat",
      "Bersihkan alat pertanian",
      "Perbaiki drainase",
      "Potong daun terinfeksi",
    ],
    treatment: ["Fungisida tembaga", "Mancozeb", "Benomil", "Tebuconazole"],
    imageUrl: null,
    isActive: true,
  },
  {
    name: "Bacterial Wilt",
    description:
      "Penyakit bakteri serius yang menyebabkan layu mendadak pada tanaman pisang",
    category: "Bakteri",
    severity: "Berat",
    symptoms: [
      "Tanaman layu tiba-tiba",
      "Daun menguning",
      "Buah tidak berkembang",
      "Pseudostem berwarna kecoklatan",
    ],
    prevention: [
      "Gunakan bibit sehat dari sumber terpercaya",
      "Sterilisasi alat",
      "Keselamatan kebun",
      "Jangan menanam di lahan terinfeksi",
    ],
    treatment: [
      "Antibiotik (Streptomycin)",
      "Kuprum oksida",
      "Nutrisi seimbang",
      "Perbaikan drainase",
    ],
    imageUrl: null,
    isActive: true,
  },
  {
    name: "Black Leaf Streak",
    description:
      "Penyakit jamur yang menyebabkan garis-garis hitam pada daun pisang (Sigatoka Hitam)",
    category: "Jamur",
    severity: "Berat",
    symptoms: [
      "Garis-garis hitam pada daun",
      "Daun mati dan rontok",
      "Pengurangan hasil panen",
      "Tanaman terlihat gundul",
    ],
    prevention: [
      "Gunakan varietas tahan",
      "Keselamatan kebun",
      "Penghapusan daun terinfeksi",
      "Karantina tanaman",
    ],
    treatment: [
      "Fungisida sistem (Propikonazol)",
      "Mancozeb",
      "Klorotalonil",
      "Sulfur",
    ],
    imageUrl: null,
    isActive: true,
  },
  {
    name: "Panama Disease",
    description:
      "Penyakit jamur yang menyebabkan layu vaskular pada pisang (Fusarium)",
    category: "Jamur",
    severity: "Berat",
    symptoms: [
      "Daun tertua layu pertama kali",
      "Pelepah berwarna kuning/ungu",
      "Layu progresif",
      "Tanaman mati",
    ],
    prevention: [
      "Gunakan bibit sehat",
      "Rotasi tanaman",
      "Jangan tanam di lahan bekas",
      "Perbaikan drainase",
    ],
    treatment: [
      "Tidak ada obat (pencegahan utama)",
      "Penghancuran tanaman terinfeksi",
      "Karantina lahan",
    ],
    imageUrl: null,
    isActive: true,
  },
  {
    name: "Healthy",
    description: "Daun pisang yang sehat tanpa penyakit",
    category: "Sehat",
    severity: "Ringan",
    symptoms: ["Tidak ada gejala penyakit"],
    prevention: ["Pemeliharaan rutin", "Manajemen air yang baik"],
    treatment: ["Tidak diperlukan"],
    imageUrl: null,
    isActive: true,
  },
];

async function main() {
  console.log("🌱 Starting disease seeding...");

  try {
    // Delete existing diseases
    await prisma.disease.deleteMany({});
    console.log("✅ Cleared existing diseases");

    // Create new diseases
    for (const disease of diseases) {
      await prisma.disease.create({
        data: disease,
      });
      console.log(`✅ Created disease: ${disease.name}`);
    }

    console.log("✅ Disease seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
