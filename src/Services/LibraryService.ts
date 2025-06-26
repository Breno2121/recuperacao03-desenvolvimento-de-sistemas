import { randomUUID } from "crypto";
import { prisma } from "../prisma/client";
import { Library } from "@prisma/client";

class LibraryService {
    public async create(book: CreateBookType) {
        const bookExist = await prisma.library.findUnique({ where: { isbn: book.isbn } })

        if (bookExist !== null) {
            throw Error("Ja existe um Livro com esse ISBN.")
        }

        const library = {
            id: randomUUID(),
            isbn: book.isbn,
            title: book.title,
            authors: book.authors,
            publication_year: book.publication_year,
            page_count: book.page_count,
            created_at: new Date(),
            updated_at: new Date()
        } as Library;

        await prisma.library.create({ data: library })
    }

    public async getAll() {
        const books = await prisma.library.findMany({})
        return books
    }

    public async getById(id: string) {
        const book = await prisma.library.findUnique({ where: { id: id } })
        return book
    }
    
    public async getByIsbn(isbn: string) {
        const book = await prisma.library.findUnique({ where: { isbn: isbn } })
        return book
    }

    public async deleteById(id: string) {
        await prisma.library.delete({
            where: { id: id }
        })
    }

    public async updateTitle(id: string, title: string) {
        await prisma.library.update({
            where: { id: id },
            data: {
                title: title,
                updated_at: new Date()
            }
        })
    }
}

export const libraryService = new LibraryService();