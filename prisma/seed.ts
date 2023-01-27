import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  let movie = await prisma.movie.findMany();
  if (movie.length === 0) {
    await prisma.movie.createMany({
      data: [
        { title: "Avatar", director: "James Cameron", genre: "Ação", releaseAt: "2009" },
        { title: "O Poderoso Chefão", director: "Francis Ford Coppola", genre: "Drama", releaseAt: "1972" },
        { title: "Matrix", director: "irmãs Wachowski", genre: "Ficção ciêntifica", releaseAt: "1999" },
        { title: "A Origem", director: "Christopher Nolan", genre: "Ficção ciêntifica", releaseAt: "2010" },
        { title: "Parasita", director: "Bong Joon-ho", genre: "Drama", releaseAt: "2019" },
        { title: "Blade Runner", director: "Ridley Scott", genre: "Ficção ciêntific", releaseAt: "1982" },
        { title: "Jurassic Park", director: "Steven Spielberg", genre: "Aventura", releaseAt: "1993" },
        { title: "O Poderoso Chefão – Parte 2", director: "Francis Ford Coppola", genre: "Drama", releaseAt: "1974" },
        { title: "De Volta para o Futuro", director: "Robert Zemeckis", genre: "Ficção ciêntifica", releaseAt: "1985" },
        { title: "Mad Max: Estrada da Fúria", director: "George Miller", genre: "Ação", releaseAt: "2015" },
      ]
    });
  }
  movie = await prisma.movie.findMany();
  console.log({ movie });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });