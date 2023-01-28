import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

  let genre = await prisma.movieGenre.findMany();
  if (genre.length === 0) {
    await prisma.movieGenre.createMany({
      data: [
        { id: 1, name: "Aventura" },
        { id: 2, name: "Ação" },
        { id: 3, name: "Drama" },
        { id: 4, name: "Ficção ciêntifica" },
        { id: 5, name: "Terror" },
        { id: 6, name: "Policial" },
        { id: 7, name: "Humor" },
        { id: 8, name: "Romance" },
      ]
    });
  }
  genre = await prisma.movieGenre.findMany();
  console.log({ genre });




  let movie = await prisma.movie.findMany();
  if (movie.length === 0) {
    await prisma.movie.createMany({
      data: [
        { title: "Avatar", director: "James Cameron", genreId: 2, releaseAt: "2009" },
        { title: "O Poderoso Chefão", director: "Francis Ford Coppola", genreId: 3, releaseAt: "1972" },
        { title: "Matrix", director: "irmãs Wachowski", genreId: 4, releaseAt: "1999" },
        { title: "A Origem", director: "Christopher Nolan", genreId: 4, releaseAt: "2010" },
        { title: "Parasita", director: "Bong Joon-ho", genreId: 3, releaseAt: "2019" },
        { title: "Blade Runner", director: "Ridley Scott", genreId: 4, releaseAt: "1982" },
        { title: "Jurassic Park", director: "Steven Spielberg", genreId: 1, releaseAt: "1993" },
        { title: "O Poderoso Chefão – Parte 2", director: "Francis Ford Coppola", genreId: 3, releaseAt: "1974" },
        { title: "De Volta para o Futuro", director: "Robert Zemeckis", genreId: 4, releaseAt: "1985" },
        { title: "Mad Max: Estrada da Fúria", director: "George Miller", genreId: 2, releaseAt: "2015" },
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