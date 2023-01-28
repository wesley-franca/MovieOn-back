var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var genre, movie;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.movieGenre.findMany()];
                case 1:
                    genre = _a.sent();
                    if (!(genre.length === 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, prisma.movieGenre.createMany({
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
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, prisma.movieGenre.findMany()];
                case 4:
                    genre = _a.sent();
                    console.log({ genre: genre });
                    return [4 /*yield*/, prisma.movie.findMany()];
                case 5:
                    movie = _a.sent();
                    if (!(movie.length === 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, prisma.movie.createMany({
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
                        })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [4 /*yield*/, prisma.movie.findMany()];
                case 8:
                    movie = _a.sent();
                    console.log({ movie: movie });
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (e) {
    console.error(e);
    process.exit(1);
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
